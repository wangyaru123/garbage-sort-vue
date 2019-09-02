import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

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
 * 根据设备类别查询二级项目保养详细规则
 * @param {*} params {
  "category": "设备类别"
}
 */
export function getRuleData(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules/two/condition`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据规则ID查询相应的二级保养规则
 * @param {*} id 主键id
 */
export function getRuleDataById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules-level-two/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加二级保养项目详细规则
 * @param {*} params {
  "category": "设备类别",
  "checkId": 1,
  "checkItemName": "点检项目名称",
  "content": "点检内容",
  "inspectionStandard": "点检标准",
  "maintainLevel": 2,
  "purpose": "点检目的",
  "timeInterval": 1,
  "timeSpan": "月"
}
 */
export function addRuleData(data) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules/two`,
      method: 'post',
      data: data
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除单条二级保养项目规则详情
 * @param {*} level2RuleId 规则Id
 */
export function deleteRuleData(level2RuleId) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules-level-two/${level2RuleId}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据二级保养规则id修改保养时间类别和时间间隔
 * @param {*} id 主键Id
 * @param {*} data {
 * timeInterval：1,
 * timeSpan: 月
 * }
 */
export function updateRuleData(id, data) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules-level-two/update/${id}`,
      method: 'put',
      params: data
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据等级查询所有的点检项目
 *
 * @export getCheckItemList
 * @param {*}
 * @returns
 */
export function getCheckItemList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
