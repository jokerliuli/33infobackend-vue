import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/article/success/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/article/success/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/article/success/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/article/success/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/article/success/remove',
    method: 'post',
    data
  })
}
