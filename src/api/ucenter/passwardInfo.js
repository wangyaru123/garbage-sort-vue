import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 修改密码相关的接口

/**
 * 校验密码的正确性
 *
 * @export checkPassword
 * @param {*}
 * @returns
 */
export function checkPassword(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/password-correctness/${id}`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 校验密码的正确性
 *
 * @export editPassword
 * @param {*}
 * @returns
 */
export function editPassword(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/admins/${id}/password`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
