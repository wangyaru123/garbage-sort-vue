/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 设备
const fileAdminRouter = {
  path: '/fileAdminModule',
  component: Layout,
  meta: {
    title: '文件管理',
    icon: 'device',
    auths: ['file_admin_page']
  },
  children: [
    {
      path: 'index',
      name: 'fileAdminModule',
      component: () => import('@/views/fileModule/admin'),
      meta: {
        title: '文件管理',
        icon: 'device',
        auths: ['file_admin_page']
      }
    }
  ]
}

export default fileAdminRouter
