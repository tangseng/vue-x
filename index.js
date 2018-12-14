import register from './lib/register'
import connect from './lib/connect'
import { connectCache } from './lib/cache'
import { initVuex, getModule } from './lib/vuex'
import { initAxios } from './lib/axios'

export default {
  $$register(options) {
    const { vuex, axios, modules } = options
    initVuex(vuex)
    initAxios(axios)
    this.registerModule(modules)
  },

  registerModule(modules) {
    register(modules)
  },

  install(Vue, options) {
    this.$$register(options)

    Vue.mixin({
      beforeCreate() {
        const { $options } = this
        const { ts } = $options
        if (typeof ts !== 'undefined') {
          let computedCollect = {}
          let methodsCollect = {}
          ts.forEach(each => {
            let module
            if (Object.prototype.toString.call(each) === '[object Object]') {
              module = each.module
            } else {
              module = each
              each = {}
            }
            const { state } = getModule(module)
            if (typeof state !== 'undefined') {
              const { computed = {}, methods = {} } = connect(module, each)
              computedCollect = {
                ...computedCollect,
                ...computed
              }
              methodsCollect = {
                ...methodsCollect,
                ...methods
              }
            } else {
              methodsCollect = {
                ...methodsCollect,
                ...connectCache(module, each)
              }
            }
          })
          const { computed, methods } = $options
          $options.computed = {
            ...(computed ? computed : {}),
            ...computedCollect
          }
          $options.methods = {
            ...(methods ? methods : {}),
            ...methodsCollect
          }
        }
      }
    })
  }
}