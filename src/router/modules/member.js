/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 用户中心
const memberRouter = {
  path: '/member',
  component: Layout,
  redirect: '/memberCenter/UserInfo',
  name: 'memberCenter',
  alwaysShow: true,
  meta: {
    title: '会员管理',
    icon: 'user'
    // auths: ['memberCenter_admin_sensitive_page', 'memberCenter_admin_nonsentive_page']
  },
  children: [
    {
      path: 'info',
      name: 'MemberCenter.Info',
      component: () => import('@/views/memberCenter/info'),
      meta: {
        title: '会员信息'
      }
    },
    {
      path: 'card',
      name: 'MemberCenter.Card',
      component: () => import('@/views/memberCenter/card'),
      meta: {
        title: '卡号管理'
      }
    },
    {
      path: 'points',
      name: 'MemberCenter.Points',
      component: () => import('@/views/memberCenter/points'),
      meta: {
        title: '积分管理'
      }
    },
    {
      path: 'pointsDetails',
      name: 'MemberCenter.PointsDetails',
      component: () => import('@/views/memberCenter/pointsDetails'),
      meta: {
        title: '积分详细'
      }
    }
  ]
}

export default memberRouter
