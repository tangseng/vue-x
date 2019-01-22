export default (store = {}, source = () => {}) => {
  const {action: check} = store
  let state = {}, mutations = {}, actions = {}, getters = {}
  if (check) {
    const {state, action, getter} = store
    state = {
      state 
    }
    mutations = {
      mutation(state, payload) {
        state.state = payload
      }
    }
    actions = {
      async action({commit}, params) {
        const data = await source(params)
        commit('mutation', action(data))
        return data
      }
    }
    if (getter) {
      getters = {
        getter({state}) {
          return getter(state)
        }
      }
    }
  } else {
    const actionCollect = []
    Object.keys(store).forEach(each => {
      const {state, action, getter} = store[each]
      state[each] = state
      mutations[each] = (state, payload) => {
        state[each] = payload
      }
      getters[each] = (state) => {
        return getter(state[each], state)
      }
      actionCollect.push((commit, data) => {
        commit(each, action(data))
      })
    })
    actions = {
      async action({commit}, params) {
        const data = await source(params)
        actionCollect.forEach(action => action(commit, data))
        return data
      }
    }
  }
  return {
    state,
    mutations,
    actions,
    getters
  }
}