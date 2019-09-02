/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 报警
const alarmRouter = {
  path: '/alarmModule',
  component: Layout,
  redirect: '/alarmModule/alarmInfo',
  meta: { title: '报警模块', icon: 'alarm', auths: ['alarm_info_page'] },
  children: [
    {
      path: 'alarmInfo',
      name: 'alarmModule.AlarmInfo',
      component: () => import('@/views/alarmModule/alarmInfo'),
      meta: {
        title: '报警模块',
        auths: ['alarm_info_page']
      }
    }
  ]
}

export default alarmRouter
