import { get, post } from '@apis/main'
import { apiBaseUrl } from '@config/env'

export function fetchShipmentQueue(params, headers, config){
  return get(`${apiBaseUrl}/shipment/queue.json`, params, headers, config)
}

export function createPackages(body, headers, config){
  return post(`${apiBaseUrl}/shipment/createOk.json`, body, headers, config)
}

export function printLabels(body, headers, config){
  return post(`${apiBaseUrl}/shipment/printOk.json`, body, headers, config)
}

export function fetchShipmentRecords(params, headers, config){
  return get(`${apiBaseUrl}/shipment/records.json`, params, headers, config)
}