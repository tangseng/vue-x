let vuexInstance = null

export const initVuex = (_vuexInstance) => {
  vuexInstance = _vuexInstance
}

const Modules = new Map()

export const registerModule = (key, module) => {
  Modules.set(key, module)
  vuexInstance.registerModule(key, module)
}

export const getModule = (key) => {
  return Modules.get(key) || {}
}