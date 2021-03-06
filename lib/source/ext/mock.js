export default (mockOption = {}, params = {}) => {
  return new Promise(resolve => {
    const { data, time = 1000 } = mockOption
    setTimeout(() => {
      if (typeof data === 'function') {
        resolve(data(params))
        return
      }
      resolve(data)
    }, time)
  })
}
