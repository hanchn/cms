import { apiBaseUrl } from '../config/env'

export async function request(path, options = {}) {
  const url = `${apiBaseUrl}${path}`
  const resp = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return resp.json()
}