/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 商品中心
const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/orderCenter/info',
  name: 'orderCenter',
  alwaysShow: true,
  meta: {
    title: '订单管理',
    icon: 'form'
  },
  children: [
    {
      path: 'info',
      name: 'OrderCenter.Info',
      component: () => import('@/views/orderCenter/info'),
      meta: {
        title: '订单管理'
      }
    }
  ]
}

export default orderRouter
