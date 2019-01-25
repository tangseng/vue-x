// const context = require.context('./modules', true, /\.js$/)

export default (context, needParentPath = false) => {
  return context.keys().reduce((modules, key) => {
    let name = key.replace(/^\.\/[_-]*|[_-]*\.js$/g, '')
    if (needParentPath) {
      name = name.replace(/[/_-]+/g, '_')
    } else {
      name = name.split('/')
      name = name[name.length - 1]
      name = name.replace(/[_-]+/g, '_').replace(/^_|_$/, '')
    }
    name = name.replace(/[_-]([a-zA-Z0-9])/g, (_, $1) => {
      return ($1 + '').toUpperCase()
    })
    const module = context(key).default
    modules[name] = module
    return modules
  }, {})
}
