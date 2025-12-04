import { get, upload } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchImageList(params, headers, config){
  return get(`${apiBaseUrl}/material/image/list.json`, params, headers, config)
}

export function uploadImage(file, params, headers, config){
  return upload(`${apiBaseUrl}/material/image/uploadOk.json`, file, params, headers, config)
}