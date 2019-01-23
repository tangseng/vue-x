import { getSourceInstance } from './instance'
import { getCache, setCache } from './ext/cache'
import rest from './ext/rest'

const Methods = ['put', 'post', 'patch']

export default (api, params = {}, cache = false) => {
  let url, method
  if (typeof api === 'string') {
    url = api
    method = 'get'
    api = {}
  } else if (Array.isArray(api)) {
    [ url, method ] = api
    api = {}
  } else {
    url = api.url
    method = api.method || 'get'
  }
  let cacheOption
  if (cache) {
    cacheOption = {
      method,
      params
    }
    const { has, data } = getCache(url, cacheOption)
    if (has) {
      return Promise.resolve(data)
    }
  }
  ({ url, params } = rest(url, params))
  const request = getSourceInstance()({
    ...api,
    url,
    method,
    ...(Methods.includes(method) ? { data: params } : { params })
  })
  if (cache) {
    return request.then(response => {
      setCache(url, cacheOption, response)
      return response
    })
  }
  return request
}
