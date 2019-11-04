import request from '@/utils/request'

const studyUrl = process.env.VUE_APP_HTTP_STUDY

// #region 查询计划接口

/**
 * 多条件查询所有学校计划
 *
 * @export getAllSchoolPlan
 * @param {*} params
 * @returns
 */
export function getAllSchoolPlan(params, page, size) {
  return new Promise((resolve, reject) => {
    request({
      url: `${studyUrl}/study/school-plans/condition/${page}/${size}`,
      method: 'post',
      data: params
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

// #endregion
