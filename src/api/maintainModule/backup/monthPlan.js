import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块设备相关的接口

/**
 * 一个月的保养计划
 *
 * @export getMonthPlan
 * @param {*}
 * @returns
 */
export function getMonthPlan(time) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/PM-plans/month`,
      method: 'get',
      params: time
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
