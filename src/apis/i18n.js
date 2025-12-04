import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchI18nList(params, headers, config){
  return get(`${apiBaseUrl}/i18n/list.json`, params, headers, config)
}

export function createI18n(body, headers, config){
  return post(`${apiBaseUrl}/i18n/createOk.json`, body, headers, config)
}

export function deleteI18n(id, headers, config){
  return post(`${apiBaseUrl}/i18n/deleteOk.json`, { id }, headers, config)
}