import { setSourceInstance } from './lib/source'
import { setStoreInstance } from './lib/store'

export default (options = {}) => {
  const { axios: sourceInstance, vuex: storeInstance } = options
  setSourceInstance(sourceInstance)
  setStoreInstance(storeInstance)
}