import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchSiteLanguageList(params, headers, config){
  return get(`${apiBaseUrl}/i18n/site/list.json`, params, headers, config)
}

export function createSiteLanguage(body, headers, config){
  return post(`${apiBaseUrl}/i18n/site/ok.json`, body, headers, config)
}

export function updateSiteLanguage(id, body, headers, config){
  return post(`${apiBaseUrl}/i18n/site/ok.json`, { id, ...body }, headers, config)
}

export function deleteSiteLanguage(id, headers, config){
  return post(`${apiBaseUrl}/i18n/site/ok.json`, { id }, headers, config)
}