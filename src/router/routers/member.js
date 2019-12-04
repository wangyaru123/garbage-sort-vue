/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 会员中心
const memberRouter = {
  path: '/member',
  component: Layout,
  redirect: '/memberCenter/UserInfo',
  name: 'memberCenter',
  alwaysShow: true,
  meta: {
    title: '会员管理',
    icon: 'user',
    auths: ['find_member_list', 'find_ic_list', 'find_member_points_page', 'find_points_detail_page']
  },
  children: [
    {
      path: 'info',
      name: 'MemberCenter.Info',
      component: () => import('@/views/memberCenter/info'),
      meta: {
        title: '会员信息',
        auths: ['find_member_list']
      }
    },
    {
      path: 'card',
      name: 'MemberCenter.Card',
      component: () => import('@/views/memberCenter/card'),
      meta: {
        title: '卡号管理',
        auths: ['find_ic_list']
      }
    },
    {
      path: 'points',
      name: 'MemberCenter.Points',
      component: () => import('@/views/memberCenter/points'),
      meta: {
        title: '积分管理',
        auths: ['find_member_points_page']
      }
    },
    {
      path: 'pointsDetails',
      name: 'MemberCenter.PointsDetails',
      component: () => import('@/views/memberCenter/pointsDetails'),
      meta: {
        title: '积分详细',
        auths: ['find_points_detail_page']
      }
    }
  ]
}

export default memberRouter
