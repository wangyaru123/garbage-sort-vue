import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 卡号信息相关的接口

/**
 * 多条件查询会员卡号
 *
 * @export getMemberCardByPage
 * @param {*} params
 * @returns
 */
export function getMemberCardByPage(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/members/idcard/${page}/${size}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 给会员发卡
 *
 * @export editMemberCard
 * @param {*} params
 * @returns
 */
export function editMemberCard(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/members/idcard/${id}`,
      method: 'put',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
