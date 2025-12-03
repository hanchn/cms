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
        server.middlewares.use('/mock', (req, res, next) => {
          const reqPath = req.url || '/'
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
  server: { port: 5173, open: false }
})