<template>
  <div class="mt-5">
    <el-row :gutter="5">
      <!--按省份统计-->
      <el-col :span="24">
        <el-card class="mt-5">
          <statisticsStateChart chartId="mobilityChart" titleName="按省份统计"></statisticsStateChart>
        </el-card>
      </el-col>
      <!--按年份统计-->
      <el-col :span="24">
        <el-card class="mt-5">
          <statisticsStateChartByYear chartId="outputChart" titleName="按年份统计"></statisticsStateChartByYear>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import statisticsStateChart from './component/statisticsStateChart'
import statisticsStateChartByYear from './component/statisticsStateChartByYear'

export default {
  components: {
    statisticsStateChart,
    statisticsStateChartByYear
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  data: function () {
    return {
    }
  },
  created() {
  },
  mounted: function () {
  },
  beforeDestroy() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
