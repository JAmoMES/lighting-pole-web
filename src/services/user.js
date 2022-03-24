import { fetch } from '.'

export function login(body) {
  return fetch('POST', 'login', body, 'application/x-www-form-urlencoded')
}

export function getUserData() {
  return fetch('GET', `user/me}`)
}
