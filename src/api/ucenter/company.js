import request from '@/utils/request'

const ucenterUrl = process.env.VUE_APP_HTTP_UCENTER

// #region 公司信息相关的接口

/**
 * 分页查询公司信息
 *
 * @export getCompanyByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getCompanyByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/companys/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询单条公司信息
 *
 * @export getCompanyById
 * @param {*} id
 * @returns
 */
export function getCompanyById(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/companys/${id}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加公司信息
 *
 * @export addCompany
 * @param {*} params
 * @returns
 */
export function addCompany(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/companys`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 更新公司信息
 *
 * @export updateCompany
 * @param {*} id
 * @returns
 */
export function updateCompany(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/companys/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 删除公司信息
 *
 * @export deleteCompany
 * @param {*} id
 * @returns
 */
export function deleteCompany(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/companys/${id}`,
      method: 'delete'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 获取公司列表
 *
 * @export getCompanyList
 * @param {*}
 * @returns
 */
export function getCompanyList() {
  return new Promise((resolve, reject) => {
    request({
      url: `${ucenterUrl}/ucenter/companys/name`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
