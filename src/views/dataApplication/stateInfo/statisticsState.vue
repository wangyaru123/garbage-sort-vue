<template>
  <div class="mt-5">
    <el-card>
      <div slot="header" class="flexbox">
        <div class="font-25">统计分析</div>
      </div>
      <statisticsStateChart chartId="mobilityChart" titleName="每日稼动率"></statisticsStateChart>
      <statisticsStateChart chartId="outputChart" titleName="每日产量"></statisticsStateChart>
    </el-card>
  </div>
</template>

<script>
import statisticsStateChart from './component/statisticsStateChart'

export default {
  components: {
    statisticsStateChart
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>

