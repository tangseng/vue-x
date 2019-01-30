# @tangseng/vue-x

> 如果我们项目中用到vuex和axios库，vue-x将能帮助项目减少大量的模板代码，即：保持vuex原本的单向数据流的方式的同时简化代码的书写。

``` sh
npm install @tangseng/vue-x
```

新版本进行了概念上的重新设计，以及简化了使用方式和扩展了常用功能，文档正在制作中...

**一、定义模块**

``` javascript
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
  /* store的直接赋值、state的直接赋值，本质是为要进行共享的数据设置一个初始值，值支持空{}、空[]、true/false、字符串、数字 */
  /* store直接赋初始值(包括{state: {}}这种设置)，代表整个source的返回值整体作为一个共享数据放入vuex中管理 */
  /* 否则就是将source的返回值分解成多个小的共享数据去管理，如“store: {list: [],total: 0}”，每个都需要赋初始值 */
  // store: [], 
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
```

**二、在组件中使用**

``` javascript
export default {
  data () {
    return {}
  }, 

  // ts: [
  //   'common'
  // ],
  // ts: [
  //   ['common', {
  //     action: true /* 'commonAction' */
  //   }]
  // ],
  // ts: [
  //   ['common', {
  //     action: 'fetch'
  //   }]
  // ],
  // ts: [
  //   ['common', {
  //     list: true /* 'listState' */
  //   }]
  // ],
  // ts: [
  //   ['common', {
  //     list: 'allList'
  //   }]
  // ],
  // ts: [
  //   ['common', {
  //     list: {
  //       state: true, /* 'listState' */
  //       mutation: true, /* 'listMutation' */
  //       getter: true /* 'listGetter' */
  //     }
  //   }]
  // ],
  // ts: [
  //   ['common', {
  //     list: {
  //       state: 'allList',
  //       mutation: 'listZhiMutation',
  //       getter: 'listOfGetter'
  //     }
  //   }]
  // ],
  ts: [
    [
      'common', 
      {
        action: true,
        list: true,
        total: true
      }
    ]
  ],

  async created () {
    await this.commonAction({
      id: 1
    })
  }
}
```

具体使用方式，可以先看下example中的例子。