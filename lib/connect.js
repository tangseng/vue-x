import { sourceConnect } from './source'
import { storeConnect } from './store'

export default (Vue, modules = {}) => {
  Vue.mixin({
    beforeCreate () {
      const { $options } = this
      const { ts } = $options
      if (typeof ts !== 'undefined') {
        let computedCollect = {}
        let methodsCollect = {}
        ts.forEach(each => {
          let maps
          if (Array.isArray(each)) {
            maps = {
              ...(each[1] || {})
            }
            each = each[0]
          } else {
            maps = {
              action: true
            }
          }
          if (!modules[each]) {
            return
          }
          const { store } = modules[each]
          if (store) {
            const { computed = {}, methods = {} } = storeConnect(each, maps)
            computedCollect = {
              ...computedCollect,
              ...computed
            }
            methodsCollect = {
              ...methodsCollect,
              ...methods
            }
          } else {
            maps.action = maps.action || true
            methodsCollect = {
              ...methodsCollect,
              ...sourceConnect(each, maps)
            }
          }
          const { computed = {}, methods = {} } = $options
          $options.computed = {
            ...computed,
            ...computedCollect
          }
          $options.methods = {
            ...methods,
            ...methodsCollect
          }
        })
      }
    }
  })
}
