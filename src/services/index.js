import axios from 'axios'

export const fetch = (
  method = 'get',
  endpoint = '/',
  body = {},
  contentType = 'application/json',
  headers = {},
  apiUrl = 'http://lighting-hole.herokuapp.com/',
  options = {}
) => {
  const url = `${apiUrl}/${endpoint}`
  const data = body
  const queryName = method === 'GET' ? 'params' : 'data'

  const api = axios.create({
    baseURL: url,
  })

  api.interceptors.request.use((config) => {
    // GET TOKEN
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })

  const res = api.request({
    method,
    url,
    [queryName]: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      ...headers,
    },
    ...options,
  })

  res.catch((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized
      }
    }
  })

  return Promise.resolve(res)
}
