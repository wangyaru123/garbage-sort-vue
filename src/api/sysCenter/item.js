import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 用户信息相关的接口

/**
 * 获取所有项目
 *
 * @export getAllItem
 * @param {*} params
 * @returns
 */
export function getAllItem() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/item`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
