import fs from 'node:fs'
import path from 'node:path'

const viewsDir = path.resolve(process.cwd(), 'src', 'views')
const outFile = path.resolve(process.cwd(), 'src', 'router', 'routes.gen.json')

function isPageDir(dir){
  const idx = path.resolve(dir, 'Index.vue')
  const main = path.resolve(dir, 'Main.vue')
  return fs.existsSync(idx) || fs.existsSync(main)
}

function collect(){
  const entries = fs.readdirSync(viewsDir, { withFileTypes: true })
  const pages = []
  for(const ent of entries){
    if(ent.isDirectory()){
      const dir = path.resolve(viewsDir, ent.name)
      if(isPageDir(dir)){
        const file = fs.existsSync(path.resolve(dir, 'Index.vue')) ? 'Index.vue' : 'Main.vue'
        pages.push({ name: ent.name, path: `/${ent.name.toLowerCase()}`, file })
      }
    }
  }
  pages.sort((a,b)=>a.path.localeCompare(b.path))
  return pages
}

const pages = collect()
fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, JSON.stringify(pages, null, 2))
console.log(`Generated ${pages.length} routes -> ${outFile}`)