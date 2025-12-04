import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchStockTaskList(params, headers, config){
  return get(`${apiBaseUrl}/inventory/stocktaking/list.json`, params, headers, config)
}

export function createStockTask(body, headers, config){
  return post(`${apiBaseUrl}/inventory/stocktaking/ok.json`, body, headers, config)
}