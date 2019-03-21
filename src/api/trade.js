import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/article/trade/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/article/trade/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/article/trade/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/article/trade/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/article/trade/remove',
    method: 'post',
    data
  })
}
