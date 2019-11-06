import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 预约培训接口

/**
 * 查询某月某学校培训计划
 *
 * @export getTrainsPlan
 * @param {*} params{ schoolId: '1', monthTime: '2019-11' }
 * @returns
 */
export function getTrainsPlan(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/trains-plan`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 查询某学校某天某时间段培训预约情况
 *
 * @export getTrainsDetails
 * @param {*} params{ schoolId: '1', period: '上午', day: '2019-11-3' }
 * @returns
 */
export function getTrainsDetails(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/trains-situation`,
      method: 'get',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 学员预约培训
 *
 * @export toBook
 * @param {*} params{ trainsId:'',schoolId: '1', day: '2019-11-3' }
 * @returns
 */
export function toBook(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/trains/book`,
      method: 'put',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 学员取消预约培训
 *
 * @export cancelBook
 * @param {*} params{ trainsId:'',schoolId: '1', day: '2019-11-3' }
 * @returns
 */
export function cancelBook(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/trains/cancel-book`,
      method: 'put',
      params: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
