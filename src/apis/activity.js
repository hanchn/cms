import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchActivityList(params, headers, config){
  return get(`${apiBaseUrl}/activity/list.json`, params, headers, config)
}

export function createActivity(body, headers, config){
  return post(`${apiBaseUrl}/activity/createOk.json`, body, headers, config)
}

export function scheduleActivity(body, headers, config){
  return post(`${apiBaseUrl}/activity/scheduleOk.json`, body, headers, config)
}

export function deleteActivity(id, headers, config){
  return post(`${apiBaseUrl}/activity/deleteOk.json`, { id }, headers, config)
}