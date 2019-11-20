/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import NoLayout from '@/noLayout'

// 看板中心
const displayRouter = {
  path: '/display',
  component: NoLayout,
  redirect: '/display/index',
  name: 'display',
  alwaysShow: true,
  meta: {
    title: '看板',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      name: 'Display.Index',
      component: () => import('@/views/display/index'),
      meta: {
        title: '数据统计'
      }
    }
  ]
}

export default displayRouter
