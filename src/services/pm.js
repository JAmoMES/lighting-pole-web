import { fetch } from '.'

export function getPmStatus(poldId) {
  return fetch('GET', `pm/${poldId}`)
}
