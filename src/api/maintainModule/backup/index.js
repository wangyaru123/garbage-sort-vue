import request from '@/utils/request'

const maintainUrl = process.env.VUE_APP_HTTP_MAINTAIN

// #region 保养模块设备相关的接口

/**
 * 分页查询设备保养情况总览
 *
 * @export getMaimtainOverview
 * @param {*}
 * @returns
 */

export function getMaimtainOverview(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${maintainUrl}/equipment/equipment-PM-situation-overview/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
