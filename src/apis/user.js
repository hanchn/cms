import { request } from './http'

export function getUsers() {
  return request('/users.json')
}

export function getUser(id) {
  return request(`/users/${id}.json`)
}