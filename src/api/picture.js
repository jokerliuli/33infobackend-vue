import request from '../utils/request'

export function getPage(query) {
  return request({
    url: '/admin/pictureManage/page',
    method: 'post',
    params: query
  })
}

export function getOne(query) {
  return request({
    url: '/admin/pictureManage/getOne',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/admin/pictureManage/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/pictureManage/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/admin/pictureManage/remove',
    method: 'post',
    data
  })
}
