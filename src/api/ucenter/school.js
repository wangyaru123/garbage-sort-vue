import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 学校信息相关的接口

/**
 * 分页查询学校信息
 *
 * @export getSchoolByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getSchoolByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/schools/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询单条学校信息
 *
 * @export getSchoolById
 * @param {*} id
 * @returns
 */
export function getSchoolById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/schools/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加学校信息
 *
 * @export addSchool
 * @param {*} params
 * @returns
 */
export function addSchool(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/schools`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 更新学校信息
 *
 * @export updateSchool
 * @param {*} id
 * @returns
 */
export function updateSchool(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/schools/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除学校信息
 *
 * @export deleteSchool
 * @param {*} id
 * @returns
 */
export function deleteSchool(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/schools/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 获取学校列表
 *
 * @export getSchoolList
 * @param {*}
 * @returns
 */
export function getSchoolList() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/schools/name`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
