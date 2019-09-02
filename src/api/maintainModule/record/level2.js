import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

const userUrl = process.env.VUE_APP_HTTP_USER

// #region 保养模块保养父计划相关的接口

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
 * 分页查询二级保养记录
 *
 * @export getRecordDataByPage
 * @param {*}
 * @returns
 */
export function getRecordDataByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页多条件查询所有的父计划在点检人的角度
 * @param {*} page 页面索引
 * @param {*} size 页面大小
 * @param {*} checkerId 点检人Id
 * @param {*} params {
  "equipmentId": 1,
  "level": 1,
  "result": 1,
  "time": "2019-10-09 00:00:00",
  "verify": 0
}
 */
export function getRecordDataByCheckerId(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/checker/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页多条件查询所有的父计划在确认人的角度
 * @param {*} page 页面索引
 * @param {*} size 页面大小
 * @param {*} confirmId 确认人Id
 * @param {*} params {
  "equipmentId": 1,
  "level": 1,
  "result": 1,
  "time": "2019-10-09 00:00:00",
  "verify": 0
}
 */
export function getRecordDataByConfirmId(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/confirmor/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页多条件查询所有的父计划在确认人的角度
 * @param {*} page 页面索引
 * @param {*} size 页面大小
 * @param {*} confirmId 确认人Id
 * @param {*} params {
  "equipmentId": 1,
  "level": 1,
  "result": 1,
  "time": "2019-10-09 00:00:00",
  "verify": 0
}
 */
export function getRecordDataByAdduser(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/records-level-two/adduser/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 周期添加二级保养
 *
 * @export addPlanData
 * @param {*}
 * @returns
 */
export function addPlanData(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/plan/add`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function getRecordDataById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/plan/record/find/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 定计划的人修改2级保养计划的时间
 *
 * @export updatePlanTimeById
 * @param {*}
 * @returns
 */
export function updateRecordDataById(id, data) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/record/update/${id}`,
      method: 'put',
      data: data
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据保养计划id删除单条保养计划
 *
 * @export deletePlanData
 * @param {*}
 * @returns
 */
export function deletePlanData(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/delete/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 点检人填写保养结果
 *
 * @export editResult
 * @param {*}
 * @returns
 */
export function editResult(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/result/checker/${id}`,
      method: 'put',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 确认人确认结果
 *
 * @export confirmRecord
 * @param {*}
 * @returns
 */
export function confirmRecord(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/result/confirm/${id}`,
      method: 'put'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据设备类别和等级确定保养详细规则
 *
 * @export getRuleDataByCategory
 * @param {*}
 * @returns
 */
export function getRuleDataByCategory(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/item-rules-level-two/condition`,
      method: 'post',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #region 用户模块内容
/**
 * 根据角色名字查找所有对应的用户
 *
 * @export getUserByRoleName
 * @param {*} roleName 角色名
 * @returns
 */
export function getUserByRoleName(roleName) {
  return new Promise((resolve, reject) => {
    request({
      url: `${userUrl}/admin/find-user-roleName/${roleName}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
