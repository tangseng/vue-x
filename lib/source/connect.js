import mapCache from './map'

export const (key, maps = {}) => {
  const { action } = maps
  return {
    [action === true ? `${key}Action` : action]: mapCache.get(key)
  }
}