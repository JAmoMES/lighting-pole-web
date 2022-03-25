import { fetch } from '.'

export function getAllPoldData() {
  return fetch('GET', 'light')
}
export function getPoldDataById(poldId) {
  return fetch('GET', `light/${poldId}`)
}

export function createPole(body) {
  return fetch('POST', 'light', body)
}

export function updatePoldById(poldId, body) {
  return fetch('PATCH', `light/pole/${poldId}`, body)
}

export function deletePole(poldId) {
  return fetch('DELETE', `light/pole/${poldId}`)
}

export function updateLightStatusByAdmin(poldId) {
  return fetch('PATCH', `light/toggle/${poldId}`)
}
