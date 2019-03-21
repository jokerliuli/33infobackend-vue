import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/picture/carousel/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/picture/carousel/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/picture/carousel/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/picture/carousel/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/picture/carousel/remove',
    method: 'post',
    data
  })
}
