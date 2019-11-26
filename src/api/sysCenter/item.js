import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 用户信息相关的接口

/**
 * 获取所有项目
 *
 * @export getAllItem
 * @param {*} params
 * @returns
 */
export function getAllItem() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/item`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页查询项目
 *
 * @export getItemByPage
 * @param {*} params
 * @returns
 */
export function getItemByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/item/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据ID查询项目
 *
 * @export getItemById
 * @param {*} params
 * @returns
 */
export function getItemById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/item/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加项目
 *
 * @export addItem
 * @param {*} params
 * @returns
 */
export function addItem(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/item/`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改项目
 *
 * @export editItem
 * @param {*} params
 * @returns
 */
export function editItem(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/item/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除项目
 *
 * @export deleteItem
 * @param {*} params
 * @returns
 */
export function deleteItem(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/item/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
