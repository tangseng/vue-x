import { createNamespacedHelpers } from 'vuex'

const filters = ['state', 'action', 'mutation', 'getter']
const uppers = filters.reduce((result, each) => {
  result[each] = each.substr(0, 1).toUpperCase() + each.substr(1)
  return result
}, {})

export default (namespace, maps = {}) => {
  const storeMaps = {}
  Object.keys(maps).forEach(key => {
    if (filters.includes(key)) {
      const val = maps[key]
      storeMaps[key] = {
        ...(storeMaps[key] || {}),
        [val === true ? `${namespace}${uppers[key]}` : val]: key === 'action' ? key : '__default__'
      }
      return
    }
    let map = maps[key]
    if (map === true) {
      map = {
        state: key
      }
    } else if (typeof map === 'string') {
      map = {
        state: map
      }
    }
    Object.keys(map).filter(k => filters.includes(k) && k !== 'action').forEach(k => {
      const v = map[k]
      v && (storeMaps[k] = {
        ...(storeMaps[k] || {}),
        [v === true ? `${key}${uppers[k]}` : v]: key
      })
    })
  })
  const { state, mutation, action, getter } = storeMaps
  const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers(namespace)
  return {
    computed: {
      ...mapState(state || {}),
      ...mapGetters(getter || {})
    },

    methods: {
      ...mapMutations(mutation || {}),
      ...mapActions(action || {})
    }
  }
}
