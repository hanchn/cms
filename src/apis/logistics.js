import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchLogisticsList(params, headers, config){
  return get(`${apiBaseUrl}/logistics/list.json`, params, headers, config)
}

export function fetchTrack(id, headers, config){
  return get(`${apiBaseUrl}/logistics/track/${id}.json`, null, headers, config)
}

export function fixAddress(id, body, headers, config){
  return post(`${apiBaseUrl}/logistics/fixOk.json`, { id, ...body }, headers, config)
}