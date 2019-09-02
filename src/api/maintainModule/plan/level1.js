import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块保养父计划相关的接口

/**
 * 分页多条件查询没有完成的父计划
 *
 * @export getPlanDataByPage
 * @param {*}
 * @returns
 */
export function getPlanDataByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/parent-plans/only-undone/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 周期添加设备保养父计划
 *
 * @export addPlanData
 * @param {*}
 * @returns
 */
export function addPlanData(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/parent-plans`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 定计划的人修改计划的时间
 *
 * @export getPlanTime
 * @param {*}
 * @returns
 */
export function getPlanTime(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/parent-plans/${id}/time`,
      method: 'put',
      data: params
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
      url: `${maintainUrl}/maintain/parent-plans/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion

// #region 保养模块保养子计划相关的接口
/**
 * 查询设备子计划和子记录
 *
 * @export getChildPlanDataByPage
 * @param {*}
 * @returns
 */
export function getChildPlanDataByPage(page, size, id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/child-plans-records/${page}/${size}/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 一键添加子计划
 *
 * @export addAllCheckItems
 * @param {*}
 * @returns
 */
export function addAllCheckItems(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/one-click-add-plan/${id}`,
      method: 'post'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加设备保养子计划
 *
 * @export addChildPlan
 * @param{
  "checkId": 1,
  "checkItemName": "点检项目名称",
  "equipmentId": 1,
  "equipmentName": "设备名称",
  "maintainLevel": "1",
  "planTime": "09:08:08"
}
 * @returns
 */
export function addChildPlan(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/child-plans/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除设备保养子计划
 *
 * @export deleteChildPlan
 * @param {*}
 * @returns
 */
export function deleteChildPlan(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/child-plans/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
