import { get } from './main'
import { apiBaseUrl } from '../config/env'

export function getUsers(params) {
  return get(`${apiBaseUrl}/users.json`, params)
}

export function getUser(params) {
  return get(`${apiBaseUrl}/users/${params.id}.json`, params)
}