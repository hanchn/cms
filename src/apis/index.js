export { get, post, put, patch, del, upload } from '@/utils/http'
export { configureHttp, readHttpConfig } from '@/config/http'
const ve = import.meta.env || {}
configureHttp({
  timeout: Number(ve.VITE_HTTP_TIMEOUT || 10000),
  retry: Number(ve.VITE_HTTP_RETRY || 0),
  retryDelay: Number(ve.VITE_HTTP_RETRY_DELAY || 300),
  pollTimes: Number(ve.VITE_HTTP_POLL_TIMES || 0),
  pollInterval: Number(ve.VITE_HTTP_POLL_INTERVAL || 0)
})