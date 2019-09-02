import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块保养父记录相关的接口

/**
 * 分页多条件查询所有的父计划在确认人的角色
 *
 * @export getRecordDataByConfirmor
 * @param {*}
 * @returns
 */
export function getRecordDataByConfirmor(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/parent-plans-records/confirmor/${page}/${size}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页多条件查询所有的父计划在点检人的角色
 *
 * @export getRecordDataByChecker
 * @param {*}
 * @returns
 */
export function getRecordDataByChecker(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/parent-plans-records/checker/${page}/${size}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页多条件查询所有的父计划在添加计划人的角度
 *
 * @export getRecordDataByAdduser
 * @param {*}
 * @returns
 */
export function getRecordDataByAdduser(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/parent-plans-records/adduser/${page}/${size}`,
      method: 'post',
      data: params
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
      url: `${maintainUrl}/maintain/parent-plans/${id}/result`,
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
      url: `${maintainUrl}/maintain/parent-plans/${id}/verify`,
      method: 'put'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion

// #region 保养模块保养子记录相关的接口

/**
 * 查找单条设备保养子记录
 *
 * @export getChildRecordDataByPage
 * @param {*}
 * @returns
 */
export function getChildRecordDataByPage(page, size, id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/child-plans-records/${page}/${size}/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查找单条设备保养子记录
 *
 * @export getResultDataById
 * @param {*}
 * @returns
 */
export function getResultDataById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/child-records/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加设备保养子记录
 *
 * @export addResultData
 * @param {*}
 * @returns
 */
export function addResultData(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/child-records/${id}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改设备保养子记录
 *
 * @export updateResultData
 * @param {*}
 * @returns
 */
export function updateResultData(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/child-records/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
