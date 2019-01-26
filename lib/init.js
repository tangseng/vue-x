import { setSourceInstance } from './source'
import { setStoreInstance } from './store'

export default (options = {}) => {
  const { source, store } = options
  setSourceInstance(source)
  setStoreInstance(store)
}
