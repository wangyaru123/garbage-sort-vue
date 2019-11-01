/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 盒子信息
const assessRouter = {
  path: '/assessModule',
  component: Layout,
  alwaysShow: true,
  redirect: '/assessModule/assessManagement',
  meta: { title: '考核培训管理', icon: 'box' },
  children: [
    {
      path: 'assessManagement',
      name: 'AssessModule.AssessManagement',
      component: () => import('@/views/assessModule/assessManagement/index'),
      meta: { title: '考核培训点管理' }
    },
    {
      path: 'planManagement',
      name: 'AssessModule.PlanManagement',
      component: () => import('@/views/assessModule/planManagement/index'),
      meta: { title: '计划管理' }
    },
    {
      path: 'planQuery',
      name: 'AssessModule.planQuery',
      component: () => import('@/views/assessModule/planQuery/index'),
      meta: { title: '计划查询' }
    },
    {
      path: 'appointTrain',
      name: 'AssessModule.AppointTrain',
      component: () => import('@/views/assessModule/bookTrain/index'),
      meta: { title: '预约培训' }
    },
    {
      path: 'Book',
      name: 'AssessModule.AppointTrain.Book',
      hidden: true,
      component: () => import('@/views/assessModule/bookTrain/book'),
      meta: { title: '预约培训' }
    },
    {
      path: 'appointExam',
      name: 'AssessModule.AppointExam',
      component: () => import('@/views/assessModule/bookExam/index'),
      meta: { title: '预约考核' }
    },
    {
      path: 'appointQuery',
      name: 'AssessModule.AppointQuery',
      component: () => import('@/views/assessModule/bookQuery/index'),
      meta: { title: '预约查询' }
    },
    {
      path: 'realtimeAssess',
      name: 'AssessModule.RealtimeAssess',
      component: () => import('@/views/assessModule/realtimeAssess/index'),
      meta: { title: '实时考核预约情况' }
    },
    {
      path: 'viewTrainResults',
      name: 'AssessModule.ViewTrainResults',
      component: () => import('@/views/assessModule/viewTrainResults/index'),
      meta: { title: '查看培训结果' }
    },
    {
      path: 'scoreQuery',
      name: 'AssessModule.ScoreQuery',
      component: () => import('@/views/assessModule/scoreQuery/index'),
      meta: { title: '成绩查询' }
    }
  ]
}

export default assessRouter
