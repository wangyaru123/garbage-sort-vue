/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 商品中心
const goodsRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goodsCenter/info',
  name: 'goodsCenter',
  alwaysShow: true,
  meta: {
    title: '商城管理',
    icon: 'goods'
  },
  children: [
    {
      path: 'info',
      name: 'GoodsCenter.Info',
      component: () => import('@/views/goodsCenter/info'),
      meta: {
        title: '商品管理'
      }
    }
  ]
}

export default goodsRouter
