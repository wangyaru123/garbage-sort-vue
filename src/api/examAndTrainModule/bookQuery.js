import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 查询预约接口

/**
 * 学员查询自己预约的培训及结果
 *
 * @export getTrainBookList
 * @param {*} params{ page: 1, size: 10}
 * @returns
 */
export function getTrainBookList(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/trains/${page}/${size}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

/**
 * 学员查询自己预约的考核及结果
 *
 * @export getExamBookList
 * @param {*} params{ page: 1, size: 10}
 * @returns
 */
export function getExamBookList(page, size, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/examines/${page}/${size}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
