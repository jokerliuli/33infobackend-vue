import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/picture/honor/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/picture/honor/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/picture/honor/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/picture/honor/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/picture/honor/remove',
    method: 'post',
    data
  })
}
