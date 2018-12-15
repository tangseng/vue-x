let vuexInstance = null

export const initVuex = (_vuexInstance) => {
  vuexInstance = _vuexInstance
}

const Modules = new Map()

export const registerModule = (key, module, rawModule) => {
  Modules.set(key, rawModule)
  vuexInstance.registerModule(key, module)
}

export const getModule = (key) => {
  return Modules.get(key) || {}
}