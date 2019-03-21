import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/article/news/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/article/news/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/article/news/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/article/news/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/article/news/remove',
    method: 'post',
    data
  })
}
