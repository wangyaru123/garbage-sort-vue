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
        auths: ['equipment_page']
      }
    },
    {
      path: 'box',
      name: 'Box',
      component: () => import('@/views/deviceModule/box'),
      meta: {
        title: '盒子管理',
        auths: ['equipment_page']
      }
    },
    {
      path: 'lookup',
      name: 'Lookup',
      component: () => import('@/views/deviceModule/lookup'),
      meta: {
        title: '设备盒子总览',
        auths: ['equipment_page']
      }
    }
  ]
}

export default deviceRouter
