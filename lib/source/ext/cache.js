const cache = {}

const stringify = (params) => {
  return params ? JSON.stringify(params) : 'default'
}

export const getCache = (url, params) => {
  const key = stringify(params)
  if (typeof cache[url] === 'undefined' || (cache[url] && typeof cache[url][key] === 'undefined')) {
    return {
      has: false
    }
  }
  return {
    has: true,
    data: cache[url][key]
  }
}

export const setCache = (url, params, data) => {
  cache[url] = cache[url] || {}
  cache[url][stringify(params)] = data
}
