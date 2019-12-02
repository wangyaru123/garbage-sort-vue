import request from '@/utils/request'

const memberUrl = process.env.VUE_APP_HTTP_MEMBER

// #region 设备信息相关的接口

/**
 * 分页查询设备
 *
 * @export getMachineByPage
 * @param {*} params
 * @returns
 */
export function getMachineByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machine/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据ID查询设备
 *
 * @export getMachineById
 * @param {*} params
 * @returns
 */
export function getMachineById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machine/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加设备
 *
 * @export addMachine
 * @param {*} params
 * @returns
 */
export function addMachine(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machine`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改设备
 *
 * @export editMachine
 * @param {*} params
 * @returns
 */
export function editMachine(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machine/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除设备
 *
 * @export deleteMachine
 * @param {*} params
 * @returns
 */
export function deleteMachine(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/machine/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
