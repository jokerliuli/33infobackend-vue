import request from '../utils/request'

export function getpage(query) {
  return request({
    url: '/admin/information/page',
    method: 'post',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/admin/information/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/information/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/admin/information/remove',
    method: 'post',
    data
  })
}
