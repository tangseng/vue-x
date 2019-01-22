import mockSource from './mock'
import axios from './axios'

export default (key, module = {}) => {
  const {source, before, after, mock, cache} = module
  return (params) => {
    before && typeof before === 'function' && (params = before(params))
    let promiseResult
    if (mock && (mock.enabled || typeof mock.enabled === 'undefined')) {
      promiseResult = mockSource(mock, params)
    } else {
      if (typeof source === 'function') {
        promiseResult = source(params)
      } else {
        promiseResult = axios(source, params, cache)
      }
    }
    if (after && typeof after === 'function') {
      return promiseResult.then(result => after(result))
    }
    return promiseResult
  }
}