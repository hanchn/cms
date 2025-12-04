import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchPermissionList(params, headers, config){
  return get(`${apiBaseUrl}/system/permission/list.json`, params, headers, config)
}

export function createPermission(body, headers, config){
  return post(`${apiBaseUrl}/system/permission/ok.json`, body, headers, config)
}

export function updatePermission(id, body, headers, config){
  return post(`${apiBaseUrl}/system/permission/ok.json`, { id, ...body }, headers, config)
}

export function deletePermission(id, headers, config){
  return post(`${apiBaseUrl}/system/permission/ok.json`, { id }, headers, config)
}