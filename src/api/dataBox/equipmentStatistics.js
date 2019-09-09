import request from '@/utils/request'

const deviceUrl = process.env.VUE_APP_HTTP_BOX_DATA

// #equipmentStatistics 盒子信息相关的接口

/**
 * 查询展示年利用率
 *
 * @export getRateByYear
 * @param {*} param
 * @returns
 */
export function getRateByYear(param) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/data-io/io-rate-year`,
      method: 'get',
      params: param
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询展示月利用率
 *
 * @export getRateByMouth
 * @param {*} param
 * @returns
 */
export function getRateByMouth(param) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/data-io/io-rate-mouth`,
      method: 'get',
      params: param
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询展示日利用率
 *
 * @export getRateByDay
 * @param {*} param
 * @returns
 */
export function getRateByDay(param) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/data-io/io-rate-day`,
      method: 'get',
      params: param
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询展示时利用率
 *
 * @export getRateByTime
 * @param {*} param
 * @returns
 */
export function getRateByTime(param) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/data-io/io-rate-time`,
      method: 'get',
      params: param
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
