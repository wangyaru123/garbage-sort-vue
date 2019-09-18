<template>
  <div class="total-layout">
    <div class="title">“1+X”工业机器人应用编程</div>
    <div class="content">
      <el-col :lg="6" :md="6" :sm="6" class="content-layout">
        <div class="item selfShowder">
          <el-col :lg="12" :md="12" :sm="24" style="height: 100%">
            <gauge-chart></gauge-chart>
          </el-col>
          <el-col :lg="12" :md="12" :sm="24" style="height: 100%">
            <gauge-speed-chart></gauge-speed-chart>
          </el-col>
        </div>
        <div class="item pt-10">
          <device-profile></device-profile>
        </div>
        <div class="item pt-10">
          <device-alarm-stat></device-alarm-stat>
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" class="content-layout">
        <!--<device-map></device-map>-->
        <div class="item itemH-2">
          <device-online></device-online>
        </div>
        <div class="item itemH-4 pt-10">
          <robotStateChartArea ref="angleChart"></robotStateChartArea>
        </div>
        <div class="item itemH-2 pt-10">
          <device-online></device-online>
        </div>
      </el-col>
      <el-col :lg="6" :md="6" :sm="6" class="content-layout">
        <div class="item">
          <device-online></device-online>
        </div>
        <div class="item pt-10">
          <device-pie-failure-rate></device-pie-failure-rate>
        </div>
        <div class="item pt-10">
          <device-bar-failure-rate></device-bar-failure-rate>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
// import deviceMap from './component/deviceMap'
import deviceOnline from './component/deviceOnline' // 设备在线
import deviceProfile from './component/deviceProfile'// 利用率饼形图
import deviceAlarmStat from './component/deviceAlarmStat'// 利用率柱形图
// import deviceAlarmDetail from './component/deviceAlarmDetail'// 浙江大学
import devicePieFailureRate from './component/devicePieFailureRate'// 故障率
import deviceBarFailureRate from './component/deviceBarFailureRate'// 故障率
import gaugeChart from './component/gaugeChart'// 故障率
import gaugeSpeedChart from './component/gaugeSpeedChart'// 故障率
import robotStateChartArea from './component/robotStateChart'

export default {
  // 父组件传入的属性值
  props: {
    robotData: null
  },
  mounted: function () {
    this.getRateByDay('rateBarChart', 'ratePieChart', { date: this.getLocalTime(new Date(), 3), ioType: 'I', byteIndex: 0, bitIndex: 0 })
  },
  components: {
    // deviceMap,
    deviceOnline,
    deviceAlarmStat,
    deviceProfile,
    // deviceAlarmDetail,
    devicePieFailureRate,
    deviceBarFailureRate,
    gaugeChart,
    gaugeSpeedChart,
    robotStateChartArea
  },
  data() {
    return {
      legendDatas: [
        ['1', '2', '3', '4', '5', '6'],
        ['X', 'Y', 'Z', 'A', 'B', 'C'],
        ['1', '2', '3', '4', '5', '6'],
        ['1', '2', '3', '4', '5', '6']
      ],
      // 图表标题名
      titleNames: [
        '机器人关节角度',
        '机器人坐标位置',
        '机器人关节速度',
        '机器人关节电流'
      ],
      // 图表的Id
      chartIds: [
        'realtimeMonitorRobotAnglesChart',
        'realtimeMonitorRobotPositionsChart',
        'realtimeMonitorRobotVelocitiesChart',
        'realtimeMonitorRobotCurrentsChart'
      ],
      //  设备单元号
      deviceUnitNumber: 1,
      // stomp客户端
      stompClient: null,
      // 订阅返回的对象
      subscription: null
    }
  },
  methods: {
    // 更新图表数据
    updateData(data, time) {
      this.$refs.angleChart.updateDataChart(data, time)
    },
    // 清除图表数据
    clearChartData() {
      this.$refs.angleChart.clearChartData()
    }
  }
}
</script>

<style lang="scss" scoped>
.total-layout {
  background: linear-gradient(to bottom, #0a2973 , #1f4eb7);
  height: 100vh;
  width: 100vw;
  color: white;
}
.title {
  height: 60px;
  width: 40%;
  border-top: 30px solid #103ca0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  text-align: center;
  line-height: 2px;
  font-size: 24px;
  color: #fff;
  margin: 0 auto;
  //border-bottom: 1px solid #009fff;
}
.content {
  height: calc(100vh - 60px);
  color: white;
  .content-layout {
    height: 100%;
    padding: 10px;
    .selfShowder{
      box-shadow: inset 0 0 4px 0 #00ffff;
    }
  }
}
.item {
  height: 33%;
}
  .itemH-2{
    height: 30%;
  }
.itemH-4{
  height: 39%;
}
</style>
