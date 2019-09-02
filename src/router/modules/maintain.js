/** When your routing table is too long, you can split it into small modules**/
// 路由规则
import Layout from '@/layout'

// 保养模块
const maintainRouter = {
  path: '/maintainModule',
  component: Layout,
  redirect: '/maintainModule/maintainRules/index',
  meta: {
    title: '保养模块',
    icon: 'maintain',
    auths: ['parent_check_item_page', 'parent_rules_page', 'parent_adduser_page', 'parent_checker_page', 'parent_confirmor_page', 'parent_knowledge_page']
  },
  children: [
    {
      path: 'maintainItems',
      name: 'MaintainModule.MaintainItems',
      component: () => import('@/views/maintainModule/maintainItems/index'),
      meta: {
        title: '保养项目',
        auths: ['parent_check_item_page']
      }
    },
    {
      path: 'maintainRules',
      name: 'MaintainModule.MaintainRules',
      component: () => import('@/views/maintainModule/maintainRules/index'),
      meta: {
        title: '保养规则',
        auths: ['parent_rules_page']
      },
      children: [
        {
          path: 'level1',
          name: 'MaintainModule.MaintainRules.Level1',
          component: () => import('@/views/maintainModule/maintainRules/level1/index'),
          meta: { title: '一级' }
        },
        {
          path: 'level2',
          name: 'MaintainModule.MaintainRules.Level2',
          component: () => import('@/views/maintainModule/maintainRules/level2/index'),
          meta: { title: '二级' }
        }
      ]
    },
    {
      path: 'maintainPlan',
      name: 'MaintainModule.MaintainPlan',
      component: () => import('@/views/maintainModule/maintainPlan/index'),
      meta: {
        title: '保养计划',
        auths: ['parent_adduser_page']
      },
      children: [
        {
          path: 'level1',
          name: 'MaintainModule.MaintainPlan.Level1',
          component: () => import('@/views/maintainModule/maintainPlan/level1/index'),
          meta: { title: '一级' }
        },
        {
          path: 'level2',
          name: 'MaintainModule.MaintainPlan.Level2',
          component: () => import('@/views/maintainModule/maintainPlan/level2/index'),
          meta: { title: '二级' }
        }
      ]
    },
    {
      path: 'childPlan',
      name: 'MaintainModule.MaintainPlan.ChildPlan',
      hidden: true,
      component: () => import('@/views/maintainModule/maintainPlan/childPlan'),
      meta: { title: '保养子计划' }
    },
    {
      path: 'maintainRecord',
      name: 'MaintainModule.MaintainRecord',
      component: () => import('@/views/maintainModule/maintainRecord/index'),
      meta: {
        title: '保养记录',
        auths: ['parent_adduser_page', 'parent_checker_page', 'parent_confirmor_page']
      },
      children: [
        {
          path: 'level1',
          name: 'MaintainModule.MaintainRecord.Level1',
          component: () => import('@/views/maintainModule/maintainRecord/level1/index'),
          meta: { title: '一级' }
        },
        {
          path: 'level2',
          name: 'MaintainModule.MaintainRecord.Level2',
          component: () => import('@/views/maintainModule/maintainRecord/level2/index'),
          meta: { title: '二级' }
        }
      ]
    },
    {
      path: 'childRecord',
      name: 'MaintainModule.MaintainRecord.ChildRecord',
      hidden: true,
      component: () => import('@/views/maintainModule/maintainRecord/childRecord'),
      meta: { title: '保养子记录' }
    },
    {
      path: 'deviceMaintainLibrary',
      name: 'MaintainModule.DeviceMaintainLibrary',
      component: () => import('@/views/maintainModule/deviceMaintainLibrary/index'),
      meta: {
        title: '保养知识库',
        auths: ['parent_knowledge_page']
      }
    }
  ]
}

export default maintainRouter
