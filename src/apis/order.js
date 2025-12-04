import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchOrderList(params, headers, config){
  return get(`${apiBaseUrl}/order/list.json`, params, headers, config)
}

export function fetchOrderDetail(id, headers, config){
  return get(`${apiBaseUrl}/order/detail/${id}.json`, null, headers, config)
}

export function exportOrders(body, headers, config){
  return post(`${apiBaseUrl}/order/exportOk.json`, body, headers, config)
}

export function batchOperate(body, headers, config){
  return post(`${apiBaseUrl}/order/batchOk.json`, body, headers, config)
}