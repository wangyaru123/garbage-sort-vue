/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 盒子信息
const boxRouter = {
  path: '/boxInfoModule',
  component: Layout,
  redirect: '/boxInfoModule/boxInfo',
  meta: { title: '盒子信息', icon: 'box', auths: ['box_page'] },
  children: [
    {
      path: 'boxInfo',
      name: 'BoxInfoModule.BoxInfo',
      component: () => import('@/views/boxInfoModule/boxInfo'),
      meta: { title: '盒子信息' }
    },
    {
      path: 'boxDetailInfo',
      name: 'BoxInfoModule.boxDetailInfo',
      hidden: true,
      component: () => import('@/views/boxInfoModule/boxDetailInfo'),
      meta: { title: '盒子任务' }
    },
    {
      path: 'perBoxDetailInfo',
      name: 'BoxInfoModule.perBoxDetailInfo',
      hidden: true,
      component: () => import('@/views/boxInfoModule/perBoxDetailInfo'),
      meta: { title: '每个盒子任务详情' }
    }
  ]
}

export default boxRouter
