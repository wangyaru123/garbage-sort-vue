import request from '@/utils/request'

const memberUrl = process.env.VUE_APP_HTTP_MEMBER

// #region 积分信息相关的接口

/**
 * 分页查询会员积分
 *
 * @export getMemberPointsByPage
 * @param {*} params
 * @returns
 */
export function getMemberPointsByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${memberUrl}/memberPoints/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
