const throwError = (which) => {
  throw new Error(`store中${which || ''}缺少state定义`)
}

export default (store = {}, source = () => {}) => {
  const { state: check } = store
  let state = {}
  let mutations = {}
  let actions = {}
  let getters = {}
  if (check) {
    const { state: storeState, getter } = store
    !storeState && throwError()
    state = {
      state: storeState()
    }
    mutations = {
      mutation (state, payload) {
        state.state = payload
      }
    }
    actions = {
      async action (context, params) {
        const data = await source(params)
        const { commit } = context
        commit('mutation', storeState(data, context))
        return data
      }
    }
    if (getter) {
      getters = {
        getter ({ state }, getters) {
          return getter(state, getters)
        }
      }
    }
  } else {
    const actionCollect = []
    Object.keys(store).forEach(each => {
      const { state: storeState, getter } = store[each]
      !storeState && throwError(each)
      state[each] = storeState()
      mutations[each] = (state, payload) => {
        state[each] = payload
      }
      getters[each] = (state, getters) => {
        return getter(state[each], state, getters)
      }
      actionCollect.push((context, data) => {
        const { commit } = context
        commit(each, storeState(data, context))
      })
    })
    actions = {
      async action (context, params) {
        const data = await source(params)
        actionCollect.forEach(action => action(context, data))
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
