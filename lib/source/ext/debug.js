/* eslint-disable */
const Messages = {
  before: '参数值',
  after: '返回数据值',
  mock: '模拟数据值',
  source: '非请求资源',
  axios: '请求资源',
  all: '整个source'
}

export default (func, name, all = false) => {
  name = all ? `${name}的source` : (name || func.name)
  const message = Messages[name] || Messages['all']
  const start = () => console.group(name)
  const log = (type, result) => {
    type = type === 'before' ? '前' : '后'
    console.log(`${message}（处理${type}）：`, result)
  }
  const end = () => console.groupEnd(name)
  return (...params) => {
    start()
    log('before', ...params)
    const result = func(...params)
    if (result.then) {
      result.then(res => {
        log('after', res)
        end()
      })
    } else {
      log('after', result)
      end()
    }
    return result
  }
}
