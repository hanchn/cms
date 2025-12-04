import { get } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchPaymentList(params, headers, config){
  return get(`${apiBaseUrl}/payment/list.json`, params, headers, config)
}