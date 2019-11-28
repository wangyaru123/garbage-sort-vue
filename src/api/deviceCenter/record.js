import request from '@/utils/request'

const memberUrl = process.env.VUE_APP_HTTP_MEMBER

// #region 设备信息相关的接口

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
 * 添加设备详情
 *
 * @export addMachineRecord
 * @param {*} params
 * @returns
 */
export function addMachineRecord(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machineRecord/`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
