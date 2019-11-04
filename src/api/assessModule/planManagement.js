import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 学校计划接口

/**
 * 查询学校计划信息
 *
 * @export getSchoolPlan
 * @param {*} params { schoolId: '1', monthTime: '2019-11' }
 * @returns
 */
export function getSchoolPlan(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/school-plans/month`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 添加学校计划信息
 *
 * @export addSchoolPlan
 * @param {*} params
 * @returns
 */
export function addSchoolPlan(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/school-plans`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 修改学校计划信息
 *
 * @export updateSchoolPlan
 * @param {*} params
 * @returns
 */
export function updateSchoolPlan(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/school-plans/${id}`,
      method: 'put',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 获取时段信息
 *
 * @export getPeriodNameList
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getPeriodNameList() {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/periods`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
