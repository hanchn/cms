import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchTemplateList(){
  return get(`${apiBaseUrl}/material/template/list.json`)
}

export function fetchTemplate(id){
  return get(`${apiBaseUrl}/material/template/${id}.json`)
}

export function saveTemplate(body){
  return post(`${apiBaseUrl}/material/template/saveOk.json`, body)
}

export function deleteTemplate(id){
  return post(`${apiBaseUrl}/material/template/deleteOk.json`, { id })
}