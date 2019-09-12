/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 用户中心
const userRouter = {
  path: '/ucenter',
  component: Layout,
  redirect: '/ucenter/UserInfo',
  name: 'Ucenter',
  alwaysShow: true,
  meta: {
    title: '用户中心',
    icon: 'user'
    // auths: ['ucenter_admin_sensitive_page', 'ucenter_admin_nonsentive_page']
  },
  children: [
    {
      path: 'UserInfo',
      name: 'Ucenter.UserInfo',
      component: () => import('@/views/ucenter/userInfo'),
      meta: {
        title: '用户管理',
        auths: ['ucenter_admin_sensitive_page', 'ucenter_admin_nonsentive_page']
      }
    },
    {
      path: 'Company',
      name: 'Ucenter.Company',
      component: () => import('@/views/ucenter/company'),
      meta: {
        title: '公司管理',
        auths: ['ucenter_company_page']
      }
    },
    {
      path: 'RolesInfo',
      name: 'Ucenter.RolesInfo',
      component: () => import('@/views/ucenter/rolesInfo'),
      meta: {
        title: '权限管理',
        auths: ['ucenter_admin_sensitive_page']
      }
    },
    {
      path: 'loginUserInfo',
      name: 'Ucenter.loginUserInfo',
      component: () => import('@/views/ucenter/loginUserInfo'),
      meta: {
        title: '个人中心'
      }
    }
  ]
}

export default userRouter
