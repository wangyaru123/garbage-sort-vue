/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 数据应用
const dataApplicationRouter = {
  path: '/dataApplication',
  component: Layout,
  redirect: '/dataApplication/overview/index',
  meta: { title: '数据应用', icon: 'dataApplication' },
  children: [
    {
      path: 'index',
      name: 'DataApplication.Overview',
      component: () => import('@/views/dataApplication/overview/index'),
      meta: { title: '总览' }
    },
    {
      path: 'stateInfo',
      name: 'DataApplication.StateInfo',
      component: () => import('@/views/dataApplication/stateInfo/index'),
      meta: { title: '状态' }
    },
    {
      path: 'ioMonitor',
      name: 'DataApplication.IoMonitor',
      component: () => import('@/views/dataApplication/ioMonitor/index'),
      meta: { title: 'IO监控' }
    },
    {
      path: 'ioSequential',
      name: 'DataApplication.IoSequential',
      component: () => import('@/views/dataApplication/ioSequence/index'),
      meta: { title: 'IO时序' }
    },
    {
      path: 'dataMonitor',
      name: 'DataApplication.DataMonitor',
      hidden: true,
      component: () => import('@/views/dataApplication/dataMonitor/index'),
      meta: { title: '数据监控' }
    }
  ]
}

export default dataApplicationRouter
