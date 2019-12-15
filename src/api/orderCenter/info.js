import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 订单相关的接口

/**
 * 分页查询订单
 *
 * @export getOrderByPage
 * @param {*} params
 * @returns
 */
export function getOrderByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/Order/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据ID查询订单
 *
 * @export getOrderById
 * @param {*} params
 * @returns
 */
export function getOrderById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/Order/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加订单
 *
 * @export addOrder
 * @param {*} params
 * @returns
 */
export function addOrder(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/Order`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改订单
 *
 * @export editOrder
 * @param {*} params
 * @returns
 */
export function editOrder(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/Order/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除订单
 *
 * @export deleteOrder
 * @param {*} params
 * @returns
 */
export function deleteOrder(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/Order/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
