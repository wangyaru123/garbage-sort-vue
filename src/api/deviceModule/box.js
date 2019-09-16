import request from '@/utils/request'

const deviceUrl = process.env.VUE_APP_HTTP_DEVICE

// #region 设备信息相关的接口

/**
 * 分页条件查询设备列表
 *
 * @export getBoxesInfoByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getBoxesInfoByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/boxes/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 根据设备id查询设备信息
 *
 * @export getBoxesInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function getBoxesInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/boxes/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 修改设备信息
 *
 * @export editBoxesInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function editBoxesInfoById(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/boxes/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 添加设备信息
 *
 * @export addBoxesInfo
 * @param {*} params { id: '1'}
 * @returns
 */
export function addBoxesInfo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/boxes`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 删除设备信息
 *
 * @export deleteBoxesInfoById
 * @param {*} params { id: '1'}
 * @returns
 */
export function deleteBoxesInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/boxes/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询设备名称信息
 *
 * @export getBoxesNameList
 * @param {*} params { id: '1'}
 * @returns
 */
export function getBoxesNameList() {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/equipment/boxes-name`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
