import { registerCache } from './cache'
import { registerModule } from './vuex'
import { request } from './axios'

export default (modules = {}) => {
  Object.keys(modules).forEach(key => {
    const rawModule = modules[key]
    let { state, api, action, mutation, getter, mock, cache } = rawModule
    if (typeof state !== 'undefined') {
      const part = {
        state: mutation ? {
          ...state
        } : {
          state
        },

        mutations: {
          mutation: mutation ? (state, {type, payload} = {}) => {
            state[type] = mutation(type, payload)
          } : (state, val) => {
            state.state = val
          }
        },

        ...(getter ? {
          getters: {
            getter({ state }) {
              return getter(state)
            }
          }
        } : {})
      }

      const module = {
        namespaced: true,
        ...part
      }
      if (api) {
        if (!action && action === true) {
          action = (response, mutation) => {
            mutation(response)
            return response
          } 
        }
        module.actions = {
          async action(context, params) {
            const { commit } = context
            const response = await request(api, params, {mock, cache})
            return action(response, val => commit('mutation', val), context)
          }
        }
      }
      registerModule(key, module, rawModule)
    } else {
      if (!action || action === true) {
        action = (response) => response
      }
      registerCache(key, async (params) => {
        const response = await request(api, params, {mock, cache})
        return action(response)
      })
    }
  })
}