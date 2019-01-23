const throwError = (error) => {
  throw new Error(`缺少rest参数${error}`)
}

export default (url, params = {}) => {
  const restParams = []
  url = url.replace(/:(\w*)/g, (_, $1) => {
    if (typeof params[$1] === 'undefined') {
      throwError($1)
    }
    restParams.push($1)
    return params[$1]
  })
  restParams.forEach(each => {
    delete params[each]
  })
  return {
    url,
    params: {
      ...params
    }
  }
}
