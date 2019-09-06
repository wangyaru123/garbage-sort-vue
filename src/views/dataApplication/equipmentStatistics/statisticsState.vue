<template>
  <div class="mt-5">
    <el-row :gutter="5">
      <!--利用率1开始-->
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <div>
              日期：<el-date-picker v-model="valueData" type="date" placeholder="选择日期" size="small"></el-date-picker>
              <span style="margin-left: 10px">选择时间段：</span><el-time-picker v-model="startTime" size="small" is-range range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间"></el-time-picker>
              <el-button type="primary" size="small" @click="searchData">查询</el-button>
            </div>
          </div>
        <el-col :span="12">
          <utilizationRateChart chartId="utilizationRateChart" titleName="设备利用率"></utilizationRateChart>
        </el-col>
        <el-col :span="12">
          <circle-chart chartId="circleChart" titleName="设备利用率" :chartData="chartData"></circle-chart>
        </el-col>
        </el-card>
      </el-col>
      <!--故障率2开始-->
      <el-col :span="24">
        <el-card class="mt-5">
          <div slot="header">
              日期：<el-date-picker v-model="valueData1" type="date" placeholder="选择日期" size="small"></el-date-picker>
              <span style="margin-left: 10px">选择时间段：</span><el-time-picker v-model="startTime1" size="small" is-range range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间"></el-time-picker>
              <el-button type="primary" size="small" @click="searchData">查询</el-button>
          </div>
          <el-col :span="12">
            <failureRateChart chartId="failureRateChart" titleName="故障率"></failureRateChart>
          </el-col>
          <el-col :span="12">
            <circle-chart-two chartId="circleChartTwo" titleName="故障率" :chartDataTwo="chartDataTwo"></circle-chart-two>
          </el-col>
        </el-card>
      </el-col>
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
import utilizationRateChart from './component/utilizationRateChart'
import CircleChart from './component/circleChart'
import failureRateChart from './component/failureRateChart'
import circleChartTwo from './component/circleChartTwo'

export default {
  components: {
    statisticsStateChart,
    statisticsStateChartByYear,
    utilizationRateChart,
    CircleChart,
    failureRateChart,
    circleChartTwo
  },
  data() {
    return {
      valueData: '',
      valueData1: '',
      startTime: [new Date(2019, 9, 10, 8, 30), new Date(2019, 9, 10, 17, 30)],
      startTime1: [new Date(2019, 9, 10, 8, 30), new Date(2019, 9, 10, 17, 30)],
      chartData: [{ name: 'a', value: 10 }, { name: 'b', value: 90 }],
      chartDataTwo: [{ name: '利用率', value: 40 }, { name: '故障率', value: 60 }]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

