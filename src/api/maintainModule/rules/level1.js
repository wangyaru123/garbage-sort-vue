import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块保养项目相关的接口

/**
 * 查询所有的类别
 *
 * @export getCategoryList
 * @param {*}
 * @returns
 */
export function getCategoryList() {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/categorys`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询所有的点检项目
 *
 * @export getCheckItemList
 * @param {*}
 * @returns
 */
export function getCheckItemList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks-name`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询单条点检项目
 *
 * @export getCheckInfo
 * @param {*}
 * @returns
 */
export function getCheckInfo(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据设备类别和等级确定保养详细规则
 *
 * @export getCycleData
 * @param {*}
 * @returns
 */
export function getCycleData(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/equipment-rules/condition`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据设备类别和等级确定项目保养详细规则
 *
 * @export getCheckData
 * @param {*}
 * @returns
 */
export function getCheckData(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules/condition`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加设备保养周期
 *
 * @export saveMaintainCycle
 * @param {*}{
  "category": "设备类别",
  "maintainLevel": "1",
  "timeInterval": 10,
  "timeSpan": "月"
}
 * @returns
 */
export function saveMaintainCycle(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/equipment-rules`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加项目详细规则
 *
 * @export addCheckItem
 * @param
 * {
  "category": "设备类别",
  "checkId": 1,
  "checkItemName": "点检项目名称",
  "content": "点检内容",
  "inspectionStandard": "点检标准",
  "maintainLevel": "1",
  "purpose": "点检目的",
  "ruleName": "保养规则名称"
}
 * @returns
 */
export function addCheckItem(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 保存班次
 *
 * @export saveDutyData
 * @param {*}
 * @returns
 */
export function saveDutyData(id, parmas) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules/${id}`,
      method: 'put',
      data: parmas
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除单条项目规则详情
 *
 * @export deleteCheckData
 * @param {*}
 * @returns
 */
export function deleteCheckData(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
