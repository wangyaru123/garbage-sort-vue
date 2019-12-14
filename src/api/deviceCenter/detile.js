import request from '@/utils/request'

const memberUrl = process.env.VUE_APP_HTTP_MEMBER

// #region 设备详情相关的接口

/**
 * 分页查询设备详情
 *
 * @export getMachineRecordByPage
 * @param {*} params
 * @returns
 */
export function getMachineRecordByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machineRecord/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 下发参数
 *
 * @export setParam
 * @param {*} params
 * @returns
 */
export function setParam(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/platform/setting-param`,
      method: 'put',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 重启
 *
 * @export setRestart
 * @param {*} params
 * @returns
 */
export function setRestart(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/platform/setting-restart`,
      method: 'put',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
