import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchInboundList(params, headers, config){
  return get(`${apiBaseUrl}/inventory/inbound/list.json`, params, headers, config)
}

export function createInbound(body, headers, config){
  return post(`${apiBaseUrl}/inventory/inbound/ok.json`, body, headers, config)
}