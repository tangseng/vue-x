import { setSourceInstance } from './source'
import { setStoreInstance } from './store'

export default (options = {}) => {
  const { axios: sourceInstance, vuex: storeInstance } = options
  setSourceInstance(sourceInstance)
  setStoreInstance(storeInstance)
}
