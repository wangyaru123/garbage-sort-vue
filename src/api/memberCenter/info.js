import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 会员信息相关的接口

/**
 * 多条件查询会员信息
 *
 * @export getMemberByPage
 * @param {*} params
 * @returns
 */
export function getMemberByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/members/info/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
