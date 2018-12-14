const $$symbol = Symbol('vue-x')
const Cache = {
  [$$symbol]: new Map(),

  set(key, action) {
    this[$$symbol].set(key, action)
  },

  get(key) {
    if (this[$$symbol].has(key)) {
      return this[$$symbol].get(key)
    }
    return () => {}
  }
}

export default Cache

export const connectCache = (key, maps = {}) => {
  const { action } = maps
  return {
    [action ? action : `${key}Action`]: Cache.get(key)
  }
}

export const registerCache = (key, action) => {
  Cache.set(key, action)
}