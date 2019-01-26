/* eslint-disable */
const Messages = {
  before: '参数值',
  after: '返回数据值',
  mock: '模拟数据值',
  source: '非请求资源',
  axios: '请求资源',
  all: '整个source',
  allTime: '的总执行时间'
}

const options = (func, name, all) => {
  name = all ? `${name}的source` : (name || func.name)
  const message = Messages[name] || Messages['all']
  const start = () => {
    console.group(name)
    all && console.time(name + Messages['allTime'])
  }
  const log = (type, result) => {
    type = type === 'before' ? '前' : '后'
    console.log(`${message}（处理${type}）：`, result)
  }
  const end = () => {
    all && console.timeEnd(name + Messages['allTime'])
    console.groupEnd(name)
  }
  return {
    start,
    log,
    end
  }
}

const proxy = (func, name, all) => {
  const { start, log, end } = options(func, name, all)
  return new Proxy(func, {
    apply (target, thisArg, args) {
      start()
      log('before', ...args)
      const result = target.apply(thisArg, args)
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
  })
}

const hack = (func, name, all) => {
  const { start, log, end } = options(func, name, all)
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

export default (func, name, all = false) => {
  return (typeof Proxy !== 'undefined' ? proxy : hack)(func, name, all)
}
