import mockSource from './ext/mock'
import debugSource from './ext/debug'
import axios from './axios'

export default (key, module = {}) => {
  let { source, before, after, mock, cache, debug } = module
  let mockSourceDebug, axiosDebug
  // eslint-disable-next-line
  if (process.env.NODE_ENV !== 'production' && debug) {
    before && (before = debugSource(before))
    after && (after = debugSource(after))
    if (mock && (mock.enabled || typeof mock.enabled === 'undefined')) {
      mockSourceDebug = debugSource(mockSource, 'mock')
    } else {
      typeof source === 'function' && (source = debugSource(source, 'source'))
      axiosDebug = debugSource(axios, 'axios')
    }
  }

  const res = (params) => {
    before && (params = before(params))
    // eslint-disable-next-line
    if (process.env.NODE_ENV !== 'production') {
      if (mock && (mock.enabled || typeof mock.enabled === 'undefined')) {
        return (debug ? mockSourceDebug : mockSource)(mock, params).then(result => after ? after(result) : result)
      } else {
        if (debug && typeof source !== 'function') {
          return axiosDebug(source, params, cache).then(result => after ? after(result) : result)
        }
      }
    }
    let promiseResult
    if (typeof source === 'function') {
      promiseResult = Promise.resolve(source(params))
    } else {
      promiseResult = axios(source, params, cache)
    }
    return after ? promiseResult.then(result => after(result)) : promiseResult
  }

  // eslint-disable-next-line
  if (process.env.NODE_ENV !== 'production' && debug) {
    return debugSource(res, `${key}`, true)
  }

  return res
}
