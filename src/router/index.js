import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

import billboardRouter from './modules/billboard'
import userRouter from './modules/user'
import boxRouter from './modules/box'
import dataApplicationRouter from './modules/dataApplication'
import alarmRouter from './modules/alarm'
import repairRouter from './modules/repair'
import maintainRouter from './modules/maintain'
import deviceRouter from './modules/device'
import noticeRouter from './modules/notice'
import fileAdminRouter from './modules/fileAdmin'
import examAndTrainRouter from './modules/examAndTrain'
import memberRouter from './modules/member'

Vue.use(Router)

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404错误页
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  memberRouter
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 看板
  billboardRouter,
  // 用户
  userRouter,
  // 盒子信息
  boxRouter,
  // 数据应用
  dataApplicationRouter,
  // 报警模块
  alarmRouter,
  // 维修模块
  repairRouter,
  // 保养模块
  maintainRouter,
  // 设备管理
  deviceRouter,
  // 消息通知
  noticeRouter,
  // 文件管理
  fileAdminRouter,
  // 考核培训模块
  examAndTrainRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
