let storeInstance = null

export const setStoreInstance = (_storeInstance) => {
  storeInstance = _storeInstance
}

export const getStoreInstance = () => {
  return storeInstance
}
