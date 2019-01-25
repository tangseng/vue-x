export default {
  /* source设置即配置数据源，可以设置url且支持rest参数（这种称为请求类型source），也可以定义为函数进行自定义数据获取（这种称为非请求类型） */
  // source: '/api/xxx',
  // source: '/api/xxx/:id',
  // source: ['/api/xxx', 'post'],
  // source: {
  //   url: '/api/xxx',
  //   method: 'put',
  //   withCredentials: true,
  //   ...
  // },
  source (params = {}) {
    return new Promise(resolve => {
      setTimeout(() => {
        const result = {
          status: 1,
          data: {
            id: params.id,
            list: [1, 2, 3],
            total: 10 + params.extParams
          }
        }
        resolve(result)
      }, 1000)
    })
  },

  /* before做为source处理前的钩子，可选的处理，主要对参数params进行前置处理 */
  before (params = {}) {
    return {
      ...params,
      extParams: 100
    }
  },

  /* after作为source处理后的钩子，可选的处理，主要对返回的数据进行后置处理 */
  after (result) {
    const { data: { list = [], total } = {} } = result
    return {
      list: list.map(item => item * 2),
      total
    }
  },

  /* store设置即使用vuex对数据进行共享，有如下几种设置方式 */
  // store: true,
  // store: {
  //   state: {}
  // },
  // store: {
  //   state (data) {
  //     return data || {}
  //   }
  // },
  // store: {
  //   state (data) {
  //     return data || {}
  //   },
  //   getter (data) {
  //     return {
  //       ...data,
  //       total: data.total + 1
  //     }
  //   }
  // },
  store: {
    list: [],
    total: 0
  },
  // store: {
  //   list: {
  //     state: []
  //   }
  // },
  // store: {
  //   list: {
  //     state (data) {
  //       return (data && data.list) || []
  //     }
  //   }
  // },
  // store: {
  //   list: {
  //     state (data) {
  //       return (data && data.list) || []
  //     },
  //     getter (list) {
  //       return [
  //         ...list
  //       ]
  //     }
  //   }
  // }

  /* mock设置提供数据模拟能力，代替source而又不需要调整source */
  // mock: {
  //   enabled: true,
  //   time: 2000,
  //   data (params) {
  //     return {
  //       data: {
  //         list: ['4', '5', '6'],
  //         total: 20
  //       }
  //     }
  //   }
  // }

  /* debug设置可以打印输出source的执行过程 */
  // debug: true,

  /* cache设置可以对请求类型的source的结果进行缓存，根据业务需求来决定是否使用 */
  // cache: true,
}