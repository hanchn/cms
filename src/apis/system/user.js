import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchUserList(params, headers, config){
  return get(`${apiBaseUrl}/system/user/list.json`, params, headers, config)
}

export function createUser(body, headers, config){
  return post(`${apiBaseUrl}/system/user/ok.json`, body, headers, config)
}

export function updateUser(id, body, headers, config){
  return post(`${apiBaseUrl}/system/user/ok.json`, { id, ...body }, headers, config)
}

export function deleteUser(id, headers, config){
  return post(`${apiBaseUrl}/system/user/ok.json`, { id }, headers, config)
}