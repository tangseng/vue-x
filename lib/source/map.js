const $$symbol = Symbol('vue-x')
export default {
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