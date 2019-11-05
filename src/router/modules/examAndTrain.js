/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 盒子信息
const examAndTrainRouter = {
  path: '/examAndTrainModule',
  component: Layout,
  alwaysShow: true,
  redirect: '/examAndTrainModule/assessManagement',
  meta: { title: '考核培训管理', icon: 'box' },
  children: [
    {
      path: 'assessManagement',
      name: 'ExamAndTrainModule.AssessManagement',
      component: () => import('@/views/examAndTrainModule/stationManagement/index'),
      meta: { title: '考核培训点管理' }
    },
    {
      path: 'planManagement',
      name: 'ExamAndTrainModule.PlanManagement',
      component: () => import('@/views/examAndTrainModule/planManagement/index'),
      meta: { title: '计划管理' }
    },
    {
      path: 'planQuery',
      name: 'ExamAndTrainModule.planQuery',
      component: () => import('@/views/examAndTrainModule/planQuery/index'),
      meta: { title: '计划查询' }
    },
    {
      path: 'appointTrain',
      name: 'ExamAndTrainModule.AppointTrain',
      component: () => import('@/views/examAndTrainModule/bookTrain/index'),
      meta: { title: '预约培训' }
    },
    {
      path: 'Book',
      name: 'ExamAndTrainModule.AppointTrain.Book',
      hidden: true,
      component: () => import('@/views/examAndTrainModule/bookTrain/book'),
      meta: { title: '预约培训' }
    },
    {
      path: 'appointExam',
      name: 'ExamAndTrainModule.AppointExam',
      component: () => import('@/views/examAndTrainModule/bookExam/index'),
      meta: { title: '预约考核' }
    },
    {
      path: 'appointQuery',
      name: 'ExamAndTrainModule.AppointQuery',
      component: () => import('@/views/examAndTrainModule/bookQuery/index'),
      meta: { title: '预约查询' }
    },
    {
      path: 'realtimeAssess',
      name: 'ExamAndTrainModule.RealtimeAssess',
      component: () => import('@/views/examAndTrainModule/realtimeAssess/index'),
      meta: { title: '实时考核预约情况' }
    },
    {
      path: 'viewTrainResults',
      name: 'ExamAndTrainModule.ViewTrainResults',
      component: () => import('@/views/examAndTrainModule/viewTrainResults/index'),
      meta: { title: '查看培训结果' }
    },
    {
      path: 'scoreQuery',
      name: 'ExamAndTrainModule.ScoreQuery',
      component: () => import('@/views/examAndTrainModule/scoreQuery/index'),
      meta: { title: '成绩查询' }
    }
  ]
}

export default examAndTrainRouter
