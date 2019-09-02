import request from '@/utils/request'

const noticeUrl = process.env.VUE_APP_HTTP_REPAIR

/**
 * 获取通知信息
 *
 * @export getNoticeInfo
 * @param {*} params { id: '1'}
 * @returns
 */
export function getNoticeInfo(page, size, state) {
  return new Promise((resolve, reject) => {
    request({
      url: `${noticeUrl}/repair/message-list/${page}/${size}?state=${state}`,
      method: 'get'
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}
/**
 * 更新已读状态
 *
 * @export updataState
 * @param {*} params { id: '1'}
 * @returns
 */
export function updataState(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `${noticeUrl}/repair/message-list/${id}`,
      method: 'put',
      data: { id: id }
    }).then(result => resolve(result))
      .catch(error => reject(error))
  })
}

