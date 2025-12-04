import { get } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchInventoryReport(params, headers, config){
  return get(`${apiBaseUrl}/inventory/report/list.json`, params, headers, config)
}