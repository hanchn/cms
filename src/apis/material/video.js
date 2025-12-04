import { get, upload } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchVideoList(params, headers, config){
  return get(`${apiBaseUrl}/material/video/list.json`, params, headers, config)
}

export function uploadVideo(file, params, headers, config){
  return upload(`${apiBaseUrl}/material/video/uploadOk.json`, file, params, headers, config)
}