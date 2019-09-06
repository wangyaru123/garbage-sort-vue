/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 设备
const fileUserRouter = {
  path: '/fileUserModule',
  component: Layout,
  meta: {
    title: '文件信息',
    icon: 'device',
    auths: ['file_user_page']
  },
  children: [
    {
      path: 'index',
      name: 'fileUserModule',
      component: () => import('@/views/fileModule/user'),
      meta: {
        title: '文件信息',
        icon: 'device',
        auths: ['file_user_page']
      }
    }
  ]
}

export default fileUserRouter
