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
    icon: 'device',
    auths: ['make_machine', 'find_machine_record']
  },
  children: [
    {
      path: 'info',
      name: 'DeviceCenter.Info',
      component: () => import('@/views/deviceCenter/info'),
      meta: {
        title: '设备管理',
        auths: ['make_machine']
      }
    },
    {
      path: 'detile',
      name: 'DeviceCenter.Detile',
      hidden: true,
      component: () => import('@/views/deviceCenter/detile'),
      meta: {
        title: '设备详情',
        auths: ['make_machine']
      }
    },
    {
      path: 'record',
      name: 'DeviceCenter.Record',
      component: () => import('@/views/deviceCenter/record'),
      meta: {
        title: '设备记录',
        auths: ['find_machine_record']
      }
    }
  ]
}

export default deviceRouter
