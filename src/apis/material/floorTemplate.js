import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchFloorTemplateList(){
  return get(`${apiBaseUrl}/material/floor/list.json`)
}

export function fetchFloorTemplate(id){
  return get(`${apiBaseUrl}/material/floor/${id}.json`)
}

export function saveFloorTemplate(body){
  return post(`${apiBaseUrl}/material/floor/saveOk.json`, body)
}