import { createNamespacedHelpers } from 'vuex'

export default (namespace, maps = {}) => {
  const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers(namespace)
  const { state, action, mutation, getter } = maps
  return {
    computed: {
      ...(state ? mapState(
        Array.isArray(state) 
          ? [ ...state ] 
          : {
            [state === true ? `${namespace}State` : state]: ({ state }) => state
          }
      ) : {}),


      ...(getter ? mapGetters({
        [getter === true ? `${namespace}Getter` : getter]: 'getter'
      }) : {})
    },

    methods: {
      ...(mutation ? mapMutations({
        [mutation === true ? `${namespace}Mutation` : mutation]: 'mutation'
      }) : {}),

      ...(action ? mapActions({
        [action ===  true ? `${namespace}Action` : action]: 'action'
      }) : {})
    }
  }
}