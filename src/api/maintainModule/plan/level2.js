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
 * 分页查询二级保养
 *
 * @export getPlanDataByPage
 * @param {*}
 * @returns
 */
export function getPlanDataByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/only-undone/${page}/${size}`,
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

/**
 * 定计划的人修改2级保养计划的时间
 *
 * @export updatePlanTimeById
 * @param {*}
 * @returns
 */
export function updatePlanTimeById(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/level-two/plan/update/${id}/time`,
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
      url: `${maintainUrl}/maintain/level-two/delete/${id}`,
      method: 'delete'
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
      url: `${maintainUrl}/maintain/item-rules/two/condition`,
      method: 'get',
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
