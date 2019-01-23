import axios from 'axios'

export default ({
  baseURL = '/',
  headers = {},
  ext = {},
  requestInterceptors = [],
  responseinterceptors = []
} = {}) => {
  const service = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    withCredentials: true,
    ...ext
  })

  service.interceptors.request.use(
    requestInterceptors[0] || (config => {
      return config
    }),
    requestInterceptors[1] || (error => {
      return Promise.reject(error)
    })
  )

  service.interceptors.response.use(
    responseinterceptors[0] || (response => {
      const { data = {} } = response
      return data
    }),
    responseinterceptors[1] || (error => {
      return Promise.reject(error)
    })
  )

  return service
}
