import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchTrackList(params, headers, config){
  return get(`${apiBaseUrl}/track/list.json`, params, headers, config)
}

export function createTrack(body, headers, config){
  return post(`${apiBaseUrl}/track/createOk.json`, body, headers, config)
}

export function deleteTrack(id, headers, config){
  return post(`${apiBaseUrl}/track/deleteOk.json`, { id }, headers, config)
}