<template>
  <!-- 添加保养计划 -->
  <div class="p-10">
    <el-row>
      <el-col :span="12">
        <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
        <span>设备名称:{{$route.query.name}}</span>
      </el-col>
      <el-col :span="11" class="text-r">
        <el-button class="m-5" round size="mini" type="primary" @click="toMaintainPlanPage">查看保养计划</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="添加单次保养" name="first">
          <singleMaintainPlan :id="$route.query.id"></singleMaintainPlan>
        </el-tab-pane>
        <el-tab-pane label="添加周期保养" name="second">
          <loopMaintainPlan :id="$route.query.id"></loopMaintainPlan>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import singleMaintainPlan from './components/singleMaintainPlan.vue'
import loopMaintainPlan from './components/loopMaintainPlan.vue'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  components: {
    singleMaintainPlan,
    loopMaintainPlan
  },
  data() {
    return {
      // 默认第一个展开
      activeName: 'first'
    }
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.push({
        path: '/maintainModule/index'
      })
    },
    // 跳转到查看保养页面
    toMaintainPlanPage(row) {
      this.$router.push({
        path: '/maintainModule/maintainPlan',
        query: { id: this.$route.query.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
