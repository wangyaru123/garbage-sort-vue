import request from '@/utils/request'

const memberUrl = process.env.VUE_APP_HTTP_MEMBER

// #region 商品相关的接口

/**
 * 分页查询商品
 *
 * @export getGoodsByPage
 * @param {*} params
 * @returns
 */
export function getGoodsByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/Goods/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据ID查询商品
 *
 * @export getGoodsById
 * @param {*} params
 * @returns
 */
export function getGoodsById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/Goods/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加商品
 *
 * @export addGoods
 * @param {*} params
 * @returns
 */
export function addGoods(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/Goods`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改商品
 *
 * @export editGoods
 * @param {*} params
 * @returns
 */
export function editGoods(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/Goods/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除商品
 *
 * @export deleteGoods
 * @param {*} params
 * @returns
 */
export function deleteGoods(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/Goods/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
