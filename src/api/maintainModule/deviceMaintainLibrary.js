import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块保养知识库相关的接口

/**
 * 分页查询知识库
 *
 * @export getLibraryByPage
 * @param {*}
 * @returns
 */
export function getLibraryByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/knowledges/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询单个知识库条目
 *
 * @export getLibraryById
 * @param {*}
 * @returns
 */
export function getLibraryById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/knowledges/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加保养知识库
 *
 * @export addLibrary
 * @param {*}
 * @returns
 */
export function addLibrary(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/knowledges`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改保养知识库
 *
 * @export updateLibrary
 * @param {*}
 * @returns
 */
export function updateLibrary(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/knowledges/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除单条知识库条目
 *
 * @export deleteLibrary
 * @param {*}
 * @returns
 */
export function deleteLibrary(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/knowledges/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
