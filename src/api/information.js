import request from '../utils/request'

export function getPage(query) {
  return request({
    url: '/admin/information/page',
    method: 'post',
    params: query
  })
}

export function getOne(query) {
  return request({
    url: '/admin/information/getOne',
    method: 'get',
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

// export function upload(form) {
//   return request({
//     url: '/admin/upload/tengxun',
//     method: 'post',
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     form
//   })
// }

export function qiniuupload(data) {
  return request({
    url: '/admin/upload/qiniu',
    method: 'post',
    data
  })
}
