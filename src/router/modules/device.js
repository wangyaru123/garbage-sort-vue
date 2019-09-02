/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 设备
const deviceRouter = {
  path: '/deviceModule',
  component: Layout,
  meta: {
    title: '设备管理',
    icon: 'device',
    auths: ['equipment_page']
  },
  children: [
    {
      path: 'index',
      name: 'Device',
      component: () => import('@/views/deviceModule/index'),
      meta: {
        title: '设备管理',
        icon: 'device',
        auths: ['equipment_page']
      }
    }
  ]
}

export default deviceRouter
