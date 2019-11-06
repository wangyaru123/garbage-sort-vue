import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 预约考核接口

/**
 * 查询某月某学校考核计划
 *
 * @export getExamPlan
 * @param {*} params{ schoolId: '1', monthTime: '2019-11' }
 * @returns
 */
export function getExamPlan(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/examines-plan`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询某学校某天某时间段考核预约情况
 *
 * @export getExamDetails
 * @param {*} params{ schoolId: '1', period: '上午', day: '2019-11-3' }
 * @returns
 */
export function getExamDetails(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/examines-situation`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 学员预约考核
 *
 * @export toBook
 * @param {*} params{ examinesId:'',schoolId: '1', day: '2019-11-3' }
 * @returns
 */
export function toBook(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/examines/book`,
      method: 'put',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
