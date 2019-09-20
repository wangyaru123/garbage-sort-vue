import request from '@/utils/request'

const deviceUrl = process.env.VUE_APP_HTTP_BOX_DATA

// #onlineData 设备状态相关的接口

/**
 * 获取设备下的model
 *
 * @export getMachine
 * @returns
 */
export function getModel() {
  return new Promise((resolve, reject) => {
    request({
      url: `${deviceUrl}/config-module/list-configmodules`,
      method: 'get'
      // params: area
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
