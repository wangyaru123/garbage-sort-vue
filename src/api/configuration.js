import axios from 'axios'

/**
 * 访问本地时需要添加的路由地址前缀
 */
const prefix = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH : ''
/**
 * 获取单柜io监控数据的配置信息
 */
export function getSingleBoxConfigioMointorData() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${prefix}/configuration/singleBox/ioMonitor.json`)
      .then(result => resolve(result.data))
      .catch(error => reject(error))
  })
}
