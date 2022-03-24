import { fetch } from '.'

export function getAllPoldData() {
  return fetch('GET', 'light')
}
export function getPoldDataById(poldId) {
  return fetch('GET', `light/${poldId}`)
}
export function updateLightStatusByAdmin(poldId) {
  return fetch('PATCH', `light/toggle/${poldId}`)
}
