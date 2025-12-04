import { get } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchInventoryAlerts(params, headers, config){
  return get(`${apiBaseUrl}/inventory/alert/list.json`, params, headers, config)
}