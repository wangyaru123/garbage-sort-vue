/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 设备
const noticeRouter = {
  path: '/noticeModule',
  component: Layout,
  meta: {
    title: '消息通知',
    icon: 'notice',
    auths: ['maintain_message_page']
  },
  children: [
    {
      path: 'noticeInfo',
      name: 'NoticeInfo',
      component: () => import('@/views/noticeModule/noticeInfo'),
      meta: {
        title: '消息通知',
        icon: 'notice',
        auths: ['maintain_message_page']
      }
    }
  ]
}

export default noticeRouter
