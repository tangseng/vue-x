import Vuex from 'vuex'

export default (Vue, vuexOptions = {}) => {
  Vue.use(Vuex)
  return new Vuex.Store(vuexOptions)
}