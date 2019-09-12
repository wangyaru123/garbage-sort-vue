import request from '@/utils/request'

const deviceUrl = process.env.VUE_APP_HTTP_DEVICE

// #region 设备信息相关的接口

/**
 * 分页条件查询设备列表
 *
 * @export getDeviceInfoByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getDeviceInfoByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/devices/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据设备id查询设备信息
 *
 * @export getDeviceInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function getDeviceInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/devices/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 修改设备信息
 *
 * @export editDeviceInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function editDeviceInfoById(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/devices/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 添加设备信息
 *
 * @export addDeviceInfo
 * @param {*} params { id: '1'}
 * @returns
 */
export function addDeviceInfo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/devices`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 删除设备信息
 *
 * @export deleteDeviceInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function deleteDeviceInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/devices/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询设备名称信息
 *
 * @export getDeviceNameList
 * @param {*} params { id: '1'}
 * @returns
 */
export function getDeviceNameList() {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/devices-name`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
