import {getSourceInstance} from './instance'
import {getCache, setCache} from './cache'

const Methods = ['put', 'post', 'patch']

export default (api, params, cache) => {
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
  const restParams = []
  url = url.replace(/:(\w*)/g, (_, $1) => {
    if (typeof params[$1] === 'undefined') {
      throw new Error(`缺少rest参数${$1}`)
    }
    restParams.push($1)
    return params[$1]
  })
  restParams.forEach(each => {
    delete params[each]
  })
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