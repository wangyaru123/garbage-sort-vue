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

/**
 * 查询设备故障记录
 *
 * @export getFaults
 * @param {*} params
 * @returns
 */
export function getFaults(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machineRecord/faults/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询设备参数
 *
 * @export getDeviceParams
 * @param {*} params
 * @returns
 */
export function getDeviceParams(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machineRecord/params/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询设备运行日志
 *
 * @export getRunlogs
 * @param {*} params
 * @returns
 */
export function getRunlogs(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machineRecord/run-logs/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询设备每个桶的内容量重量情况
 *
 * @export getWeightcount
 * @param {*} params
 * @returns
 */
export function getWeightcount(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machineRecord/weight-count`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询设备预警记录
 *
 * @export getWarns
 * @param {*} params
 * @returns
 */
export function getWarns(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machineRecord/warns/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
