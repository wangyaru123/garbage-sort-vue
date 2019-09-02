import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块保养项目相关的接口

/**
 * 查询今天对应的保养计划对应的页码
 *
 * @export getCheckItemsByPage
 * @param {*}
 * @returns
 */
export function getCheckItemsByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页查看设备保养计划时间轴
 *
 * @export getCheckItemsById
 * @param {*}
 * @returns
 */
export function getCheckItemsById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据条件按页查询点检项目
 *
 * @export getCheckItemsByPageAndLevel
 * @param {*}
 * @returns
 */
export function getCheckItemsByPageAndLevel(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加单条保养计划的信息
 *
 * @export addCheckItems
 * @param {*}
 * @returns
 */
export function addCheckItems(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 更新单条保养计划的信息
 *
 * @export updeteCheckItems
 * @param {*}
 * @returns
 */
export function updeteCheckItems(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据保养计划id删除单条保养计划
 *
 * @export deleteCheckItems
 * @param {*}
 * @returns
 */
export function deleteCheckItems(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/maintain/checks/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
