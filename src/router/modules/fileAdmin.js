/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 设备
const fileAdminRouter = {
  path: '/fileAdminModule',
  component: Layout,
  redirect: '/fileAdminModule/sys',
  meta: {
    title: '文件管理',
    icon: 'form',
    auths: ['file_admin_page']
  },
  children: [
    {
      path: 'sys',
      name: 'Sys',
      component: () => import('@/views/fileModule/admin'),
      meta: {
        title: '文件管理',
        auths: ['file_admin_page']
      }
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/fileModule/user'),
      meta: {
        title: '文件查看',
        auths: ['file_user_page']
      }
    }
  ]
}

export default fileAdminRouter
