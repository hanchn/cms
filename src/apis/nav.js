import { request } from './http'

export function getNav() {
  return request('/nav.json')
}