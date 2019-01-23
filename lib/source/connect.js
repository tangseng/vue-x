import mapCache from './map'

export default (key, maps = {}) => {
  const { action } = maps
  return {
    [action === true ? `${key}Action` : action]: mapCache.get(key)
  }
}
