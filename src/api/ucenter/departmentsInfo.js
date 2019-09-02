import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 部门职位相关的接口

/**
 * 获取部门以及职位信息
 *
 * @export getDeptPositionInfo
 * @param {*}
 * @returns
 */
export function getDeptPositionInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/departments`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 获取只有部门列表
 *
 * @export getOnlyDeptInfo
 * @param {*}
 * @returns
 */
export function getOnlyDeptInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/departments-only`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 查询部门其相应职位以及人员的组成的所有的信息
 *
 * @export getDeptPositionAdminInfo
 * @param {*}
 * @returns
 */
export function getDeptPositionAdminInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/departments-positons-admins`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 添加部门信息
 *
 * @export addDeptInfo
 * @param {*} params {
  "name": "示例含义"
}
 * @returns
 */
export function addDeptInfo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/departments`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加职位信息
 *
 * @export addPositionInfo
 * @param {*} params {
  "departmentId": "示例含义",
  "name": "示例含义"
}
 * @returns
 */
export function addPositionInfo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/positions`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 编辑部门信息
 *
 * @export editDeptInfo
 * @param {*} id 部门id
 *params{
  "name": "示例含义"
}
 * @returns
 */
export function editDeptInfo(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/departments/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 编辑职位信息
 *
 * @export editPositionInfo
 * @param {*}id 职位id
 * params{
  "departmentId": "示例含义",
  "name": "示例含义"
}
 * @returns
 */
export function editPositionInfo(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/positions/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 删除部门
 *
 * @export deleteDept
 * @param {*} {id:1} 部门id
 * @returns
 */
export function deleteDept(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/departments/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 删除职位
 *
 * @export deletePosition
 * @param {*}  {id:1} 职位id
 * @returns
 */
export function deletePosition(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/positions/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
