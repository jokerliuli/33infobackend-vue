import request from '@/utils/request'

export function login(query) {
  return request({
    url: '/login',
    method: 'post',
    params: query
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}
export function getMenu(data) {
  return request({
    url: '/admin/menuByRoles',
    method: 'post',
    data
  })
}
// export function getInfo(token) {
//   return request({
//     url: '/admin/info',
//     method: 'get',
//     params: { token }
//   })
// }
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

