import request from '@/utils/request'

const repairUrl = process.env.VUE_APP_HTTP_REPAIR
const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 提交报警表相关的接口

/**
 * 多条件查询提交报警表的信息
 *
 * @export getSubAlarmInfoByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getSubAlarmInfoByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/alarms/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据id查询提交报警表的单条信息
 *
 * @export getSubAlarmInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function getSubAlarmInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/alarms/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 修改提交报警表的信息
 *
 * @export editSubAlarmInfo
 * @param {*} params {
  "alarmDescription": "示例含义",
  "alarmImg": "[http://localhost:8390/box-service-repair/images/6ca8f6d4ad754414838c642952a59566.png]",
  "alarmInfoId": 1,
  "faultRegion": "示例含义",
  "faultTime": "2019-3-1 10:00:00",
  "maintainCost": 10.23
}
 * @returns
 */
export function editSubAlarmInfo(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/alarms/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 删除提交报警表的单条信息
 *
 * @export deleteSubAlarmInfo
 * @param {*} params { id: '1'}
 * @returns
 */
export function deleteSubAlarmInfo(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/alarms/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 删除提交报警表的单条信息
 *
 * @export dispatchTasks
 * @param {*} params { id: '1'}
 * @returns
 */
export function dispatchTasks(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/dispatch-tasks`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion

// #region 维修表相关的接口

/**
 * 多条件查询维修表的信息
 *
 * @export getMaintainInfoByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getMaintainInfoByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/alarms-maintains/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据id查询维修表的单条信息
 *
 * @export getMaintainInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function getMaintainInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/sub-maintains/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据positionId查询维修人信息
 *
 * @export getMaintainPerson
 * @param {*} params { positionId: 5}
 * @returns
 */
export function getMaintainPerson(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/conditions`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改维修表的信息
 *
 * @export editMaintainInfo
 * @param {*} params {
  "alarmDescription": "示例含义",
  "alarmImg": "[http://localhost:8390/box-service-repair/images/6ca8f6d4ad754414838c642952a59566.png]",
  "alarmInfoId": 1,
  "faultRegion": "示例含义",
  "faultTime": "2019-3-1 10:00:00",
  "maintainCost": 10.23
}
 * @returns
 */
export function editMaintainInfo(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/sub-maintains/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除维修表的单条信息
 *
 * @export deleteMaintainInfo
 * @param {*} params { id: '1'}
 * @returns
 */
export function deleteMaintainInfo(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${repairUrl}/repair/sub-maintains/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
