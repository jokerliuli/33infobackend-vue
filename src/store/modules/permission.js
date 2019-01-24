import { constantRouterMap } from '@/router'
import { getMenu } from '@/api/login'
import { validatenull } from '@/utils/validate'

function initMenu(menu) {
  if (menu.length === 0) {
    return
  }
  const menus = formatRoutes(menu)
  // 最后添加
  const unfound = { path: '*', redirect: '/404', hidden: true }
  menus.push(unfound)
  // router.addRoutes(menus)
  // store.commit('ADD_ROUTERS', menus)
  console.log(menus)
  return menus
}

function formatRoutes(aMenu) {
  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      redirect,
      name,
      meta,
      hidden,
      alwaysShow,
      children
    } = oMenu
    if (!validatenull(component)) {
      const oRouter = {
        path: path,
        component(resolve) {
          let componentPath = ''
          if (component === 'Layout') {
            require(['../../views/layout/Layout'], resolve)
            return
          } else {
            componentPath = component
          }
          require([`../../views/${componentPath}.vue`], resolve)
        },
        // component: component === 'Layout' ? Layout : () => import(component),
        name: name,
        redirect: redirect,
        hidden: hidden === 'true',
        alwaysShow: alwaysShow === 'true',
        meta: meta,
        children: validatenull(children) ? [] : formatRoutes(children)
      }
      aRouter.push(oRouter)
    }
  })
  return aRouter
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { roles } = data
        getMenu(roles).then(response => {
          const result = response.data.data
          console.log(result)
          if (result && result.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROUTERS', initMenu(result))
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
        // let accessedRouters
        // if (roles.includes('admin')) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // commit('SET_ROUTERS', accessedRouters)
        // resolve()
      })
    }
  }
}

export default permission
