import request from '@/utils/request'

const alarmUrl = process.env.VUE_APP_HTTP_ALARM
const repairUrl = process.env.VUE_APP_HTTP_REPAIR

/**
 * 获取分页表格数据
 *
 * @export getAlarmInfo
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */

export function getAlarmInfoByPage(page, size, condition) {
  return new Promise((resolve, reject) => {
    request({
      url: `${alarmUrl}/alarm/infos/${page}/${size}`,
      method: 'post',
      data: condition
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据id查询报警信息
 *
 * @export getAlarmInfo
 * @param {*} params { id: '1'}
 * @returns
 */
export function getAlarmInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${alarmUrl}/alarm/infos/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 添加提交报警表的信息
 *
 * @export saveAlarmInfo
 * @param {*} params  {
  "alarmDescription": "示例含义",
  "alarmImg": "[http://localhost:8390/box-service-repair/images/6ca8f6d4ad754414838c642952a59566.png]",
  "alarmInfoId": 1,
  "faultRegion": "示例含义",
  "faultTime": "2019-3-1 10:00:00",
  "maintainCost": 10.23
}
 * @returns
 */
export function saveAlarmInfo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/alarms`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 更改解决时间和是否提交报警表标识
 *
 * @export updateAlarmInfo
 * @param {*} params { id: '1'}
 * @returns
 */
export function updateAlarmInfo(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${alarmUrl}/alarm/infos/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

