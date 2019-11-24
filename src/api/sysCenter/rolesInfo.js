import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 角色权限相关的接口

/**
 * 获取角色信息
 *
 * @export getRolesInfo
 * @param {*}
 * @returns
 */
export function getRolesInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/roles`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 添加角色信息
 *
 * @export addRolesInfo
 * @param {*} params {
  "name": "示例含义",
  "roleCode": "ROLE_USER"
}
 * @returns
 */
export function addRolesInfo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/roles`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据id获取角色信息
 *
 * @export getRolesInfoById
 * @param {*} id 角色id
 * @returns
 */
export function getRolesInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/roles/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据id修改角色信息
 *
 * @export editRolesInfoById
 * @param {*} id 角色id
 * params{
  "name": "示例含义",
  "roleCode": "ROLE_USER"
}
 * @returns
 */
export function editRolesInfoById(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/roles/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 保存角色和权限关系信息
 *
 * @export saveRolesActionsInfo
 * @param {*} id 角色id
 * params{

}
 * @returns
 */
export function saveRolesActionsInfo(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/action-join-roles/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据id删除角色信息
 *
 * @export deleteRolesInfoById
 * @param {*} id 角色id
 * params{
  "name": "示例含义",
  "roleCode": "ROLE_USER"
}
 * @returns
 */
export function deleteRolesInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/roles/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 获取权限列表
 *
 * @export getActionsInfo
 * @param {*} id 角色id
 * params{
  "name": "示例含义",
  "roleCode": "ROLE_USER"
}
 * @returns
 */
export function getActionsInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/actions`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
