/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
// import TS from '@tangseng/vue-x'
// import initModule from '@tangseng/vue-x/util/context'
// import initAxios from '@tangseng/vue-x/util/axios'
import TS from '../index'
import initModule from '../util/context'
import initAxios from '../util/axios'

Vue.use(Vuex)
const store = new Vuex.Store({})

Vue.use(TS, {
  modules: initModule(require.context('./modules', true, /\.js$/)),
  vuex: store,
  axios: initAxios()
})

export { 
  store
}