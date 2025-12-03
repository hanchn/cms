import { get } from './main'
import { apiBaseUrl } from '../config/env'

// params默认是body
// 这里是get请求，params应该是query参数
// headers非必填
// 还要支持超时配置有默认值 非必填 还有重连次数
export function getNav(params, headers, config) {
  return get(`${apiBaseUrl}/nav.json`, params, headers, config)
}