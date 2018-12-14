import { createNamespacedHelpers } from 'vuex'

export default (namespace, maps = {}) => {
  const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers(namespace)
  const { state, action, mutation, getter } = maps
  return {
    computed: {
      ...mapState({
        [state ? state : `${namespace}State`]: ({ state }) => state
      }),

      ...(getter ? mapGetters({
        [getter ? getter : `${namespace}Getter`]: 'getter'
      }) : {})
    },

    methods: {
      ...mapMutations({
        [mutation ? mutation : `${namespace}Mutation`]: 'mutation'
      }),

      ...mapActions({
        [action ? action : `${namespace}Action`]: 'action'
      })
    }
  }
}