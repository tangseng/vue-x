import init from './lib/init'
import connect from './lib/connect'
import register from './lib/register'

export default {
  install (Vue, options = {}) {
    init(options)
    const { modules = {} } = options
    register(modules)
    connect(Vue, modules)
  },

  registerModule (modules = {}) {
    register(modules)
  }
}
