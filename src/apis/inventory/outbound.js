import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchOutboundList(params, headers, config){
  return get(`${apiBaseUrl}/inventory/outbound/list.json`, params, headers, config)
}

export function createOutbound(body, headers, config){
  return post(`${apiBaseUrl}/inventory/outbound/ok.json`, body, headers, config)
}