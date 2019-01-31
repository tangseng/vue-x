const throwError = (which) => {
  throw new Error(`store中${which || ''}缺少state定义`)
}

const isEmptyObject = val => Object.prototype.toString.call(val) === '[object Object]' && !Object.keys(val).length
const isEmptyArray = val => Array.isArray(val) && !val.length
// const isNormal = val => typeof val === 'string' || typeof val === 'number' || val === true || val === false
const isNormal = val => ['string', 'number', 'boolean', 'function'].includes(typeof val)


const checkVal = val => isEmptyObject(val) || isEmptyArray(val) || isNormal(val)

export default (store = {}, source) => {
  if (checkVal(store)) {
    store = {
      state: store
    }
  }
  const { state: check } = store
  if (typeof check !== 'undefined') {
    store = {
      __default__: {
        ...store
      }
    }
  }
  let state = {}
  let mutations = {}
  let actions = {}
  let getters = {}
  const actionCollect = []
  Object.keys(store).forEach(each => {
    let eachStore = store[each]
    if (checkVal(eachStore)) {
      eachStore = {
        state: eachStore
      }
    }
    let { state: storeState, getter } = eachStore
    if (typeof storeState !== 'function') {
      const initState = storeState
      storeState = (data) => {
        if (each !== '__default__') {
          return (data && data[each]) || initState
        }
        return data || initState
      }
    }
    !storeState && throwError(each !== '__default__' ? each : '')
    state[each] = storeState()
    mutations[each] = (state, payload) => {
      state[each] = payload
    }
    getter && (getters[each] = (state, getters) => {
      return getter(state[each], state, getters)
    })
    source && actionCollect.push((context, data) => {
      const { commit } = context
      commit(each, storeState(data, context))
    })
  })
  source && (actions = {
    async action (context, params) {
      const data = await source(params)
      actionCollect.forEach(action => action(context, data))
      return data
    }
  })
  return {
    state,
    mutations,
    actions,
    getters
  }
}
