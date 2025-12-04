import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchEmailTemplateList(){
  return get(`${apiBaseUrl}/material/email/list.json`)
}

export function fetchEmailTemplate(id){
  return get(`${apiBaseUrl}/material/email/${id}.json`)
}

export function saveEmailTemplate(body){
  return post(`${apiBaseUrl}/material/email/saveOk.json`, body)
}

export function deleteEmailTemplate(id){
  return post(`${apiBaseUrl}/material/email/deleteOk.json`, { id })
}