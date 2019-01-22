import mapCache from './map'

export const (key, action) => {
  mapCache.set(key, action)
}