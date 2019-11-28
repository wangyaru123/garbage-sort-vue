import request from '@/utils/request'

const memberUrl = process.env.VUE_APP_HTTP_MEMBER

// #region 积分详情相关的接口

/**
 * 添加积分详情
 *
 * @export addMemberPoints
 * @param {*} params
 * @returns
 */
export function addMemberPoints(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/pointDetail/`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页查询
 *
 * @export getPointsDetailsByPage
 * @param {*} params
 * @returns
 */
export function getPointsDetailsByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/pointDetail/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
