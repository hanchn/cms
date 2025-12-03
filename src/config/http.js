import { setHttpConfig, getHttpConfig } from '../utils/http'

export const httpDefaults = { timeout: 10000, retry: 0, retryDelay: 300, pollTimes: 0, pollInterval: 0 }
export function configureHttp(cfg){ setHttpConfig({ ...httpDefaults, ...(cfg||{}) }) }
export function readHttpConfig(){ return getHttpConfig() }