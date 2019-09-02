import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块设备相关的接口

/**
 * 查询今天对应的保养计划对应的页码
 *
 * @export getPage
 * @param {*}
 * @returns
 */
export function getPage(id, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/page/${id}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 分页查看设备保养计划时间轴
 *
 * @export getMaimtainPlanByPage
 * @param {*}
 * @returns
 */
export function getMaimtainPlanByPage(id, page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-plans/${id}/timeline/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 更新单条保养计划的信息
 *
 * @export getMaimtainPlanById
 * @param {*}
 * @returns
 */
export function getMaimtainPlanById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-plans/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 更新单条保养计划的信息
 *
 * @export updateMaimtainInfoById
 * @param {*}
 * @returns
 */
export function updateMaimtainInfoById(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-plans/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据保养计划id删除单条保养计划
 *
 * @export deleteMaimtainInfoById
 * @param {*}
 * @returns
 */
export function deleteMaimtainInfoById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-plans/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
