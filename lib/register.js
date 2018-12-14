import { registerCache } from './cache'
import { registerModule } from './vuex'
import { request } from './axios'

export default (modules = {}) => {
  Object.keys(modules).forEach(key => {
    let { api, action, state, getter } = modules[key]
    if (typeof state !== 'undefined') {
      const part = {
        state: {
          state,
        },
        mutations: {
          mutation(state, val) {
            state.state = val
          }
        }
      }
      if (typeof getter !== 'undefined') {
        part['getters'] = {
          getter({ state }) {
            return getter(state)
          }
        }
      }
      if (!action && action === true) {
        action = (response, mutation) => {
          mutation(response)
          return response
        } 
      }
      const module = {
        namespaced: true,
        ...part,
        actions: {
          async action({ commit }, params) {
            const response = await request(api, params)
            const result = action(response, val => commit('mutation', val))
            return result
          }
        }
      }
      registerModule(key, module)
    } else {
      if (!action || action === true) {
        action = (response) => response
      }
      registerCache(key, async (params) => {
        const response = await request(api, params)
        return action(response)
      })
    }
  })
}