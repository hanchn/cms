function qs(params){
  if(!params) return ''
  const s = Object.entries(params).map(([k,v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
  return s ? `?${s}` : ''
}

function composeURL(url, params){
  if(!params) return url
  const q = qs(params)
  if(!q) return url
  return url.includes('?') ? `${url}&${q.slice(1)}` : `${url}${q}`
}

async function fetchRequest(method, url, options={}, config={}){
  const { params, headers, body } = options
  url = composeURL(url, params)
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
  const timer = controller ? setTimeout(()=>controller.abort(), Number(config.timeout||10000)) : null
  const baseHeaders = (typeof FormData !== 'undefined' && body instanceof FormData) ? {} : { 'Content-Type': 'application/json' }
  const resp = await fetch(url, { method, headers: { ...baseHeaders, ...(headers||{}) }, body: body!=null && !(body instanceof FormData) ? JSON.stringify(body) : body || undefined, signal: controller ? controller.signal : undefined }).catch(err=>{
    if(timer) clearTimeout(timer)
    throw err
  })
  if(timer) clearTimeout(timer)
  if(!resp.ok){ const e = new Error(`HTTP ${resp.status}`); e.status = resp.status; throw e }
  const ct = resp.headers.get('content-type') || ''
  return ct.includes('application/json') ? resp.json() : resp.text()
}

function xhrRequest(method, url, options={}, config={}){
  const { params, headers, body } = options
  url = composeURL(url, params)
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.timeout = Number(config.timeout||10000)
    const hs = { 'Content-Type': 'application/json', ...(headers||{}) }
    const isForm = (typeof FormData !== 'undefined' && body instanceof FormData)
    const finalHeaders = isForm ? { ...(headers||{}) } : hs
    Object.keys(finalHeaders).forEach(k=>xhr.setRequestHeader(k, finalHeaders[k]))
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState === 4){
        if(xhr.status>=200 && xhr.status<300){
          const ct = xhr.getResponseHeader('content-type') || ''
          resolve(ct.includes('application/json') ? JSON.parse(xhr.responseText || 'null') : xhr.responseText)
        } else {
          const e = new Error(`HTTP ${xhr.status}`); e.status = xhr.status; reject(e)
        }
      }
    }
    xhr.onerror = ()=>reject(new Error('Network Error'))
    xhr.ontimeout = ()=>reject(new Error('Timeout'))
    xhr.send(body!=null && !isForm ? JSON.stringify(body) : body || null)
  })
}

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)) }

export async function request(method, url, options={}, config={}){
  const merged = { ...httpConfig, ...(config||{}) }
  const retry = Number(merged.retry||0)
  const delay = Number(merged.retryDelay||300)
  let lastErr
  async function once(){
    for(let i=0;i<=retry;i++){
      try {
        return typeof fetch === 'function' ? await fetchRequest(method, url, options, merged) : await xhrRequest(method, url, options, merged)
      } catch (e) {
        lastErr = e
        const status = e && e.status
        const retriable = e.message==='Network Error' || e.message==='Timeout' || (typeof status==='number' && status>=500)
        if(i<retry && retriable) await sleep(delay)
        else throw e
      }
    }
    throw lastErr
  }
  const times = Number(merged.pollTimes||0)
  const interval = Number(merged.pollInterval||0)
  if(times>0 && interval>0){
    let result
    for(let j=0;j<times;j++){
      result = await once()
      if(j<times-1) await sleep(interval)
    }
    return result
  }
  return once()
}

export function get(url, params, headers, config){
  return request('GET', url, { params, headers }, config)
}

export function post(url, body, headers, config){
  return request('POST', url, { body, headers }, config)
}

export function put(url, body, headers, config){
  return request('PUT', url, { body, headers }, config)
}

export function patch(url, body, headers, config){
  return request('PATCH', url, { body, headers }, config)
}

export function del(url, headers, config){
  return request('DELETE', url, { headers }, config)
}

export function upload(url, form, params, headers, config){
  let body
  if(form instanceof FormData){
    body = form
  } else if(typeof Blob !== 'undefined' && form instanceof Blob){
    const fd = new FormData()
    const name = (typeof File !== 'undefined' && form instanceof File && form.name) ? form.name : 'upload.bin'
    fd.append('file', form, name)
    body = fd
  } else if(form != null && typeof form === 'object'){
    const fd = new FormData()
    Object.entries(form).forEach(([k,v])=>fd.append(k, v))
    body = fd
  } else {
    const fd = new FormData()
    if(form!=null) fd.append('file', form)
    body = fd
  }
  return request('POST', url, { params, headers, body }, config)
}
let httpConfig = { timeout: 10000, retry: 0, retryDelay: 300, pollTimes: 0, pollInterval: 0 }
export function setHttpConfig(cfg){ httpConfig = { ...httpConfig, ...(cfg||{}) } }
export function getHttpConfig(){ return { ...httpConfig } }