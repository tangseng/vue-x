let axiosInstance = null

export const initAxios = (_axiosInstance) => {
  axiosInstance = _axiosInstance
}

const Methods = ['put', 'post', 'patch']

export const request = (api, params) => {
  let url, method
  if (typeof api === 'string') {
    url = api
    method = 'get'
    api = {}
  } else if (Array.isArray(api)) {
    [ url, method ] = api
    api = {}
  } else {
    url = api.url || ''
    method = api.method || 'get'
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
  return axiosInstance({
    ...api,
    url,
    method,
    ...(Methods.includes(method) ? { data: params } : { params })
  })
}