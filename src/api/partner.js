import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/picture/partner/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/picture/partner/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/picture/partner/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/picture/partner/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/picture/partner/remove',
    method: 'post',
    data
  })
}
