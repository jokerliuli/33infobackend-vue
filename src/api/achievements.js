import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/picture/achievements/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/picture/achievements/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/picture/achievements/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/picture/achievements/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/picture/achievements/remove',
    method: 'post',
    data
  })
}
