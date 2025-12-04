import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchTransferList(params, headers, config){
  return get(`${apiBaseUrl}/inventory/transfer/list.json`, params, headers, config)
}

export function createTransfer(body, headers, config){
  return post(`${apiBaseUrl}/inventory/transfer/ok.json`, body, headers, config)
}

export function approveTransfer(id, headers, config){
  return post(`${apiBaseUrl}/inventory/transfer/ok.json`, { id, action: 'approve' }, headers, config)
}