// const context = require.context('./modules', true, /\.js$/)

export default (context) => {
  return context.keys().reduce((modules, key) => {
    let name = key.replace(/^\.\/[_-]*|[_-]*\.js$/g, '').replace(/[_-]([a-zA-Z0-9])/g, (_, $1) => {
      return ($1 + '').toUpperCase()
    })
    const module = context(key).default
    modules[name] = module
    return modules
  }, {})
}
