/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 盒子信息
const examAndTrainRouter = {
  path: '/examAndTrainModule',
  component: Layout,
  alwaysShow: true,
  redirect: '/examAndTrainModule/stationManagement',
  meta: { title: '考核培训管理', icon: 'box' },
  children: [
    {
      path: 'stationManagement',
      name: 'ExamAndTrainModule.StationManagement',
      component: () => import('@/views/examAndTrainModule/stationManagement/index'),
      meta: { title: '考核培训点管理', auths: ['ucenter_school_page'] }
    },
    {
      path: 'schoolPlanManagement',
      name: 'ExamAndTrainModule.SchoolPlanManagement',
      component: () => import('@/views/examAndTrainModule/schoolPlanManagement/index'),
      meta: { title: '学校计划管理' },
      children: [
        {
          path: 'planManagement',
          name: 'ExamAndTrainModule.SchoolPlanManagement.PlanManagement',
          component: () => import('@/views/examAndTrainModule/schoolPlanManagement/planManagement/index'),
          meta: { title: '计划管理' }
        },
        {
          path: 'planQuery',
          name: 'ExamAndTrainModule.SchoolPlanManagement.PlanQuery',
          component: () => import('@/views/examAndTrainModule/schoolPlanManagement/planQuery/index'),
          meta: { title: '计划查询' }
        }
      ]
    },
    {
      path: 'trainManagement',
      name: 'ExamAndTrainModule.TrainManagement',
      component: () => import('@/views/examAndTrainModule/trainManagement/index'),
      meta: { title: '培训管理' },
      children: [
        {
          path: 'train',
          name: 'ExamAndTrainModule.Train',
          component: () => import('@/views/examAndTrainModule/trainManagement/bookTrain/index'),
          meta: { title: '预约培训' }
        },
        {
          path: 'trainDetails',
          name: 'ExamAndTrainModule.AppointTrain.TrainDetails',
          hidden: true,
          component: () => import('@/views/examAndTrainModule/trainManagement/bookTrain/book'),
          meta: { title: '培训详情' }
        },
        {
          path: 'bookQuery',
          name: 'ExamAndTrainModule.BookQuery',
          component: () => import('@/views/examAndTrainModule/trainManagement/bookQuery/index'),
          meta: { title: '预约查询' }
        },
        {
          path: 'trainResultsQuery',
          name: 'ExamAndTrainModule.TrainResultsQuery',
          component: () => import('@/views/examAndTrainModule/trainManagement/trainResultsQuery/index'),
          meta: { title: '查看培训结果' }
        }
      ]
    },
    {
      path: 'examManagement',
      name: 'ExamAndTrainModule.ExamManagement',
      component: () => import('@/views/examAndTrainModule/examManagement/index'),
      meta: { title: '考核管理' },
      children: [
        {
          path: 'exam',
          name: 'ExamAndTrainModule.Exam',
          component: () => import('@/views/examAndTrainModule/examManagement/bookExam/index'),
          meta: { title: '预约考核' }
        },
        {
          path: 'examDetails',
          name: 'ExamAndTrainModule.AppointTrain.ExamDetails',
          hidden: true,
          component: () => import('@/views/examAndTrainModule/examManagement/bookExam/book'),
          meta: { title: '考核详情' }
        },
        {
          path: 'bookQuery',
          name: 'ExamAndTrainModule.BookQuery',
          component: () => import('@/views/examAndTrainModule/examManagement/bookQuery/index'),
          meta: { title: '预约查询' }
        },
        {
          path: 'scoreQuery',
          name: 'ExamAndTrainModule.ScoreQuery',
          component: () => import('@/views/examAndTrainModule/examManagement/scoreQuery/index'),
          meta: { title: '成绩查询' }
        }
      ]
    },
    {
      path: 'realtimeAssess',
      name: 'ExamAndTrainModule.RealtimeAssess',
      component: () => import('@/views/examAndTrainModule/realtimeAssess/index'),
      meta: { title: '实时考核预约情况' }
    }
  ]
}

export default examAndTrainRouter
