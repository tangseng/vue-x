import {sourceCreate, sourceRegister} from './source'
import {storeCreate, storeRegister} from './store'

export default (modules = {}) => {
  Object.keys(modules).forEach(key => {
    const module = modules[key]
    const source = sourceCreate(key, module)
    sourceRegister(key, source)
    const {store} = module
    if (store) {
      storeRegister(key, storeCreate(store, source))
    }
  })
}