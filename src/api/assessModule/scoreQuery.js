import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 成绩查询相关的接口

/**
 * 分页查询学校信息
 *
 * @export getScoreByPage
 * @param {*} params { page: '1', size: '10' }
 * @returns
 */
export function getScoreByPage(page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/scores/${page}/${size}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
// #endregion
