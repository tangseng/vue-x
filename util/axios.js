import axios from 'axios'

export default (baseURL = '/') => {
  const service = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })

  service.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    const { data = {} } = response
    return data
  }, error => {
    return Promise.reject(error)
  })

  return service
} 