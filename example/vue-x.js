/* eslint-disable */
import Vue from 'vue'
// import TS from '@tangseng/vue-x'
// import initModule from '@tangseng/vue-x/util/context'
// import initAxios from '@tangseng/vue-x/util/axios'
// import initVuex from '@tangseng/vue-x/util/vuex'
import TS from '../index'
import initModule from '../util/context'
import initAxios from '../util/axios'
import initVuex from '../util/vuex'

const store = initVuex(Vue)

Vue.mixin({
  beforeCreate () {
    this.$store = store
  }
})

Vue.use(TS, {
  modules: initModule(require.context('./modules', true, /\.js$/)),
  source: initAxios(),
  store
})