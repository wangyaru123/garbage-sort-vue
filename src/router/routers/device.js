/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 商品中心
const deviceRouter = {
  path: '/device',
  component: Layout,
  redirect: '/deviceCenter/info',
  name: 'deviceCenter',
  alwaysShow: true,
  meta: {
    title: '设备管理',
    icon: 'device'
  },
  children: [
    {
      path: 'info',
      name: 'DeviceCenter.Info',
      component: () => import('@/views/deviceCenter/info'),
      meta: {
        title: '设备管理'
      }
    }
  ]
}

export default deviceRouter
