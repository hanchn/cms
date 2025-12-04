import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchRefundList(params, headers, config){
  return get(`${apiBaseUrl}/refund/list.json`, params, headers, config)
}

export function fetchRefundDetail(id, headers, config){
  return get(`${apiBaseUrl}/refund/detail/${id}.json`, null, headers, config)
}

export function approveRefund(id, headers, config){
  return post(`${apiBaseUrl}/refund/ok.json`, { id, action: 'approve' }, headers, config)
}

export function rejectRefund(id, headers, config){
  return post(`${apiBaseUrl}/refund/ok.json`, { id, action: 'reject' }, headers, config)
}