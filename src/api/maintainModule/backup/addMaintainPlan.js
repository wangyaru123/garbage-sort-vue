import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块设备相关的接口

/**
 * 根据当前时间添加保养计划
 *
 * @export addSingleMaintainPlan
 * @param {*}
 * @returns
 */
export function addSingleMaintainPlan(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-plans/current-time?equipmentId=${id}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 根据当前时间循环添加保养计划
 *
 * @export addLoopMaintainPlan
 * @param {*}
 * @returns
 */
export function addLoopMaintainPlan(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-plans/current-time/loop?equipmentId=${id}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
