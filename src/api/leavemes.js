import request from '../utils/request'

export function getPage(query) {
  return request({
    url: '/admin/leavemes/page',
    method: 'post',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/admin/leavemes/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/leavemes/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/admin/leavemes/remove',
    method: 'post',
    data
  })
}
