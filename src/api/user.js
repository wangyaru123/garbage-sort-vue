import request from '@/utils/request'

const url = process.env.VUE_APP_HTTP_AUTH

/**
 * 登录
 *
 * @export login
 * @param {*} params { username: 'string', password: 'string' }
 * @returns
 */
export function login(params) {
  // return request.post(url + '/userlogin', params)
  return request({
    url: url + '/userlogin',
    method: 'post',
    data: params
  })
}

/**
 * 获取登录用户的JWT信息
 *
 * @export getUserJWT
 * @returns
 */
export function getUserJWT() {
  // return request.get(url + '/userjwt')
  return request({
    url: url + '/userjwt',
    method: 'get'
  })
}

/**
 * 登出
 *
 * @export logout
 * @returns
 */
export function logout() {
  return request.post(url + '/userlogout')
}

export function getInfo() {
  return request({
    url: url + '/userjwt',
    method: 'get'
  })
}
