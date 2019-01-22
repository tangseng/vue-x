export default (Vue, modules = {}) => {
  Vue.mixin({
    beforeCreate() {
      const {$options} = this
      const {ts} = $options
      if (typeof ts !== 'undefined') {
        let computedCollect = {}
        let methodsCollect = {}
        ts.forEach(each => {
        //   const isObject = Object.prototype.toString.call(each) === '[object Object]'
        //   const module = isObject ? each.module : each
        //   const { state, getter, api } = getModule(module)
        //   let maps
        //   if (typeof state !== 'undefined') {          
        //     if (isObject) {
        //       maps = {
        //         ...each
        //       }
        //     } else {
        //       maps = {
        //         state: true,
        //         getter,
        //         action: !!api
        //       }
        //     }
        //     const { computed = {}, methods = {} } = connect(module, maps)
        //     computedCollect = {
        //       ...computedCollect,
        //       ...computed
        //     }
        //     methodsCollect = {
        //       ...methodsCollect,
        //       ...methods
        //     }
        //   } else {
        //     maps = {
        //       action: isObject ? each.action : true
        //     }
        //     methodsCollect = {
        //       ...methodsCollect,
        //       ...connectCache(module, maps)
        //     }
        //   }
        // })
        // const { computed, methods } = $options
        // $options.computed = {
        //   ...(computed ? computed : {}),
        //   ...computedCollect
        // }
        // $options.methods = {
        //   ...(methods ? methods : {}),
        //   ...methodsCollect
        // }
      }
    }
  })
}