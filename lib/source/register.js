import mapCache from './map'

export default (key, action) => {
  mapCache.set(key, action)
}
