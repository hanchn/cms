import { get } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchInventoryQuery(params, headers, config){
  return get(`${apiBaseUrl}/inventory/query/list.json`, params, headers, config)
}