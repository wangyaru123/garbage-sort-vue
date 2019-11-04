import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 学校计划接口

/**
 * 多条件查询所有学校计划
 *
 * @export addSchoolPlan
 * @param {*} params
 * @returns
 */
export function getAllSchoolPlan(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/school-plans/condition`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
