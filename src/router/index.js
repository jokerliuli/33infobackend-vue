import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'form', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = []
// export const constantRouterMap = [
//   // {
//   //   path: '/information',
//   //   component: Layout,
//   //   redirect: '/information/information',
//   //   meta: { title: '系统管理', icon: 'form' },
//   //   children: [
//   //     {
//   //       path: 'information',
//   //       name: 'Information',
//   //       component: () => import('@/views/information/index'),
//   //       meta: { title: '用户管理', icon: 'form' }
//   //     },
//   //     {
//   //       path: 'addInformation',
//   //       name: 'AddInformation',
//   //       component: () => import('@/views/information/addInformation'),
//   //       meta: { title: '菜单管理', icon: 'form' }
//   //     }
//   //   ]
//   // },
//   {
//     path: '/information',
//     component: Layout,
//     redirect: '/information/information',
//     meta: { title: '资讯管理', icon: 'form' },
//     children: [
//       {
//         path: 'information',
//         name: 'Information',
//         component: () => import('@/views/information/index'),
//         meta: { title: '资讯管理', icon: 'form' }
//       },
//       {
//         path: 'addInformation',
//         name: 'AddInformation',
//         component: () => import('@/views/information/addInformation'),
//         meta: { title: '新增资讯', icon: 'form' }
//       },
//       {
//         path: 'informationShow',
//         name: 'InformationShow',
//         component: () => import('@/views/information/informationShow'),
//         meta: { title: '资讯展示', icon: 'form' }
//       },
//       {
//         path: 'markdownDemo',
//         name: 'MarkdownDemo',
//         component: () => import('@/views/information/markdownDemo'),
//         meta: { title: 'markdownDemo', icon: 'form' }
//       },
//       {
//         path: 'mavonEditor',
//         name: 'MavonEditor',
//         component: () => import('@/views/information/mavonEditor'),
//         meta: { title: 'mavonEditor', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/leavemes',
//     component: Layout,
//     redirect: '/leavemes/leavemes',
//     meta: { title: '留言管理', icon: 'form' },
//     children: [
//       {
//         path: 'leavemes',
//         name: 'Leavemes',
//         component: () => import('@/views/leavemes/index'),
//         meta: { title: '留言管理', icon: 'form' }
//       },
//       {
//         path: 'addLeavemes',
//         name: 'AddLeavemes',
//         component: () => import('@/views/leavemes/addLeavemes'),
//         meta: { title: '新增留言', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/picture',
//     component: Layout,
//     children: [
//       {
//         path: 'picture',
//         name: 'Picture',
//         component: () => import('@/views/picture/index'),
//         meta: { title: '图片管理', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/nested',
//     component: Layout,
//     redirect: '/nested/menu1',
//     name: 'Nested',
//     meta: {
//       title: 'Nested',
//       icon: 'nested'
//     },
//     children: [
//       {
//         path: 'menu1',
//         component: () => import('@/views/nested/menu1/index'), // Parent router-view
//         name: 'Menu1',
//         meta: { title: 'Menu1' },
//         children: [
//           {
//             path: 'menu1-1',
//             component: () => import('@/views/nested/menu1/menu1-1'),
//             name: 'Menu1-1',
//             meta: { title: 'Menu1dashboard-1' }
//           },
//           {
//             path: 'menu1-2',
//             component: () => import('@/views/nested/menu1/menu1-2'),
//             name: 'Menu1-2',
//             meta: { title: 'Menu1-2' },
//             children: [
//               {
//                 path: 'menu1-2-1',
//                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
//                 name: 'Menu1-2-1',
//                 meta: { title: 'Menu1-2-1' }
//               },
//               {
//                 path: 'menu1-2-2',
//                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
//                 name: 'Menu1-2-2',
//                 meta: { title: 'Menu1-2-2' }
//               }
//             ]
//           },
//           {
//             path: 'menu1-3',
//             component: () => import('@/views/nested/menu1/menu1-3'),
//             name: 'Menu1-3',
//             meta: { title: 'Menu1-3' }
//           }
//         ]
//       },
//       {
//         path: 'menu2',
//         component: () => import('@/views/nested/menu2/index'),
//         meta: { title: 'menu2' }
//       }
//     ]
//   },
//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
//         meta: { title: 'External Link', icon: 'link' }
//       }
//     ]
//   },
//
//   { path: '*', redirect: '/404', hidden: true }
// ]

