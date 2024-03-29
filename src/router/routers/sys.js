/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 系统设置中心
const sysRouter = {
  path: '/sys',
  component: Layout,
  redirect: '/sysCenter/info',
  name: 'sysCenter',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'config',
    auths: ['ucenter_admin', 'make_item']
  },
  children: [
    {
      path: 'users',
      name: 'SysCenter.Users',
      component: () => import('@/views/sysCenter/users'),
      meta: {
        title: '用户管理',
        auths: ['ucenter_admin']
      }
    },
    {
      path: 'roles',
      name: 'SysCenter.Roles',
      component: () => import('@/views/sysCenter/roles'),
      meta: {
        title: '权限管理',
        auths: ['ucenter_admin']
      }
    },
    {
      path: 'items',
      name: 'SysCenter.Items',
      component: () => import('@/views/sysCenter/items'),
      meta: {
        title: '项目管理',
        auths: ['make_item']
      }
    }
  ]
}

export default sysRouter
