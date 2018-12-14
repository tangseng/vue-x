//context: 
//const context = require.context('./modules', true, /\.js$/)
export default (context) => {
  const modules = context.keys().reduce((modules, key) => {
  let name = key.replace(/^\.\/|\.js$/g, '')
    name = name.replace(/[_-]([a-zA-Z0-9])/g, (_, $1) => {
      return ($1 + '').toUpperCase()
    })
    const module = context(key).default
    modules[name] = module
    return modules
  }, {})
  return modules
}