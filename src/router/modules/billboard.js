/** When your routing table is too long, you can split it into small modules**/
// 看板的路由规则
import NoLayout from '@/noLayout'

const billboardRouter = {
  path: '/billboard',
  component: NoLayout,
  redirect: '/billboard/home-page',
  name: 'Billboard',
  alwaysShow: true,
  meta: { title: '看板', icon: 'monitor' },
  children: [
    {
      path: 'overview',
      component: () => import('@/views/billboard/overview/index'),
      name: 'Billboard.Overview',
      meta: { title: '运行总览' }
    },
    {
      path: 'region',
      component: () => import('@/views/billboard/region/index'),
      name: 'Billboard.Region',
      hidden: true,
      meta: { title: '区域概况' }
    },
    {
      path: 'detail',
      component: () => import('@/views/billboard/detail/index'),
      name: 'Billboard.Detail',
      hidden: true,
      meta: { title: '设备详情' }
    },
    {
      path: 'statistics',
      component: () => import('@/views/billboard/statistics/index'),
      name: 'Billboard.Statistics',
      hidden: true,
      meta: { title: '设备统计' }
    }
  ]
}

export default billboardRouter
