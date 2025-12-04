import { get } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchBatchLocationList(params, headers, config){
  return get(`${apiBaseUrl}/inventory/batchlocation/list.json`, params, headers, config)
}