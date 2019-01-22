import {getStoreInstance} from './instance'

export default (key, module = {}) => {
  module.namespaced = true
  getStoreInstance().registerModule(key, module)
}