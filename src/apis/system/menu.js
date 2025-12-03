import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchMenuList(params, headers, config){
  return get(`${apiBaseUrl}/system/menu/list.json`, params, headers, config)
}

export function createMenu(body, headers, config){
  return post(`${apiBaseUrl}/system/menu/ok.json`, body, headers, config)
}

export function updateMenu(id, body, headers, config){
  return post(`${apiBaseUrl}/system/menu/ok.json`, { id, ...body }, headers, config)
}

export function deleteMenu(id, headers, config){
  return post(`${apiBaseUrl}/system/menu/ok.json`, { id }, headers, config)
}