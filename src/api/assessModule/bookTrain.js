import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 学校计划接口

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

// #endregion
