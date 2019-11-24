import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 用户信息相关的接口

/**
 * 分页查询用户非敏感信息
 *
 * @export getUserInfoByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getUserInfoByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询单条用户非敏感信息
 *
 * @export getUserNoSenInfoById
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getUserNoSenInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/non-sensitives/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 查询单条用户敏感信息
 *
 * @export getUserSenInfoById
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getUserSenInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 查询所有部门信息
 *
 * @export getDeptInfo
 * @param {*}
 * @returns
 */
export function getDeptInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/departments`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 查询职位信息
 *
 * @export getPositionsInfo
 * @param {*}
 * @returns
 */
export function getPositionsInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/positions`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 添加用户信息
 *
 * @export addUserInfo
 * @param {*} params {
  "departmentId": 2,
  "email": "18744021947@163.com",
  "isEnable": true,
  "isSys": false,
  "lastLoginTime": "2019-4-1 12:08:10",
  "mobile": "18744021947",
  "name": "张三",
  "positionId": 4,
  "sex": true,
  "telephone": "0571-89935747",
  "username": "string"
}
 * @returns
 */
export function addUserInfo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 系统管理员更新用户信息
 *
 * @export updateUserInfoBySys
 * @param {*} id 用户id
 * params {
  "departmentId": 2,
  "email": "18744021947@163.com",
  "isEnable": true,
  "isSys": false,
  "lastLoginTime": "2019-4-1 12:08:10",
  "mobile": "18744021947",
  "name": "张三",
  "positionId": 4,
  "sex": true,
  "telephone": "0571-89935747",
  "username": "string"
}
 * @returns
 */
export function updateUserInfoBySys(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/sys/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 更新当前用户的信息
 *
 * @export updateUserInfoByUser
 * @param {*} id 用户id
 * params{
  "departmentId": 2,
  "email": "18744021947@163.com",
  "mobile": "18744021947",
  "name": "张三",
  "positionId": 4,
  "sex": true,
  "telephone": "0571-89935747"
}
 * @returns
 */
export function updateUserInfoByUser(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/current-user/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 删除用户的信息
 *
 * @export deleteUserInfoById
 * @param {*} id 用户id
 * @returns
 */
export function deleteUserInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 重置密码
 *
 * @export resetPassword
 * @param {*} id 用户id
 * @returns
 */
export function resetPassword(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/passwords/${id}`,
      method: 'put'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据用户id查询关联的角色信息
 *
 * @export getUserRoles
 * @param {*} id 用户id
 * @returns
 */
export function getUserRoles(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admin-join-roles/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询所有角色信息不包含关联权限信息
 *
 * @export getAllRoles
 * @param {*} id 用户id
 * @returns
 */
export function getAllRoles() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/roles/only-role`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 保存用户与角色的关联关系
 *
 * @export bindingRoles
 * @param {*} id 用户id
 * @returns
 */
export function bindingRoles(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admin-join-roles/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询所有的人的id和姓名
 *
 * @export getAllUserInfo
 * @param
 * @returns
 */
export function getAllUserInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admin-name`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
