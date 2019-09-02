import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块设备相关的接口

/**
 * 添加保养文档记录(可多条保养计划对应一条保养文档记录)
 *
 * @export addMaintainRecord
 * @param {*}
 * @returns
 */
export function addMaintainRecord(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-doc-records?ids=${id}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据保养计划查询文档记录
 *
 * @export getMaintainRecord
 * @param {*}
 * @returns
 */
export function getMaintainRecord(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-doc-records/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据保养计划查询文档记录
 *
 * @export editMaintainRecord
 * @param {*}
 * @returns
 */
export function editMaintainRecord(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-doc-records/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
