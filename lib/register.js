import { sourceCreate, sourceRegister } from './source'
import { storeCreate, storeRegister } from './store'

export default (modules = {}) => {
  Object.keys(modules).forEach(key => {
    const module = modules[key]
    let { source, store } = module
    if (source) {
      source = sourceCreate(key, module)
      sourceRegister(key, source)
    }
    store && storeRegister(key, storeCreate(store, source))
  })
}
