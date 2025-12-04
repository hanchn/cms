import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'mock-server',
      configureServer(server) {
        const failCounters = Object.create(null)
        server.middlewares.use('/mock', (req, res, next) => {
          const url = new URL(req.url || '/', 'http://localhost')
          const reqPath = url.pathname || '/'

          // Mock explicit status code: /mock/_status/<code>
          if (reqPath.startsWith('/_status/')) {
            const codeStr = reqPath.split('/')[2] || '500'
            const code = Number(codeStr) || 500
            res.statusCode = code
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: `Mocked ${code}` }))
            return
          }

          // Fail first N times then return success JSON: /mock/_fail/<times>
          if (reqPath.startsWith('/_fail/')) {
            const timesStr = reqPath.split('/')[2] || '1'
            const times = Math.max(1, Number(timesStr) || 1)
            const key = url.pathname + (url.search || '')
            failCounters[key] = failCounters[key] || 0
            if (failCounters[key] < times) {
              failCounters[key]++
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ message: 'Internal Server Error', attempt: failCounters[key] }))
              return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, attempts: failCounters[key] }))
            return
          }

          const filePath = path.join(process.cwd(), 'mock', reqPath.replace(/^\/?/, ''))
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', 'application/json')
            res.end(fs.readFileSync(filePath))
            return
          }
          next()
        })
      }
    }
  ],
  envDir: 'env',
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@apis': path.resolve(process.cwd(), 'src/apis'),
      '@views': path.resolve(process.cwd(), 'src/views'),
      '@layouts': path.resolve(process.cwd(), 'src/layouts'),
      '@stores': path.resolve(process.cwd(), 'src/stores'),
      '@utils': path.resolve(process.cwd(), 'src/utils'),
      '@config': path.resolve(process.cwd(), 'src/config'),
      '@mock': path.resolve(process.cwd(), 'mock')
    }
  },
  server: { port: 5173, open: false }
})