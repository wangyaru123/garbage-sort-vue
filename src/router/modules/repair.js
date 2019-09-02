/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 维修模块
const repairRouter = {
  path: '/repairModule',
  component: Layout,
  redirect: '/repairModule/submittedAlarm',
  meta: {
    title: '维修模块',
    icon: 'repair',
    auths: ['maintain_alarm_page', 'maintain_alarm_user_page']
  },
  children: [
    {
      path: 'submittedAlarm',
      name: 'RepairModule.SubmittedAlarm',
      component: () => import('@/views/repairModule/submittedAlarm'),
      meta: {
        title: '派发报警',
        auths: ['maintain_alarm_page']
      }
    },
    {
      path: 'repairInfo',
      name: 'RepairModule.RepairInfo',
      component: () => import('@/views/repairModule/repairInfo'),
      meta: {
        title: '维修表',
        auths: ['maintain_alarm_user_page']
      }
    },
    {
      path: 'subAlarmDetailInfo',
      name: 'RepairModule.SubAlarmDetailInfo',
      hidden: true,
      component: () => import('@/views/repairModule/subAlarmDetailInfo'),
      meta: { title: '已提交报警详情' }
    },
    {
      path: 'repairDetailInfo',
      name: 'RepairModule.RepairDetailInfo',
      hidden: true,
      component: () => import('@/views/repairModule/repairDetailInfo'),
      meta: { title: '维修详情' }
    }
  ]
}

export default repairRouter
