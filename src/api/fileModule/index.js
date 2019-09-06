import request from '@/utils/request'

const fileUrl = process.env.VUE_APP_HTTP_FILE

// #region 文件信息相关的接口

/**
 * 分页查询文件信息
 *
 * @export getfileAdminByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getfileAdminByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${fileUrl}/file/files/admin/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页查询文件信息
 *
 * @export getfileUserByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getfileUserByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${fileUrl}/file/files/user/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 上传文件
 *
 * @export uploadFile
 * @param {*} params
 * @returns
 */
export function uploadFile() {
  return new Promise((resolve, reject) => {
    request({
      url: `${fileUrl}/file/_upload`,
      method: 'post'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 发布
 *
 * @export publishFile
 * @param {*} id
 * @returns
 */
export function publishFile(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${fileUrl}/file/files/${id}`,
      method: 'put'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除文件
 *
 * @export deleteFile
 * @param {*} id
 * @returns
 */
export function deleteFile(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${fileUrl}/file/files/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
