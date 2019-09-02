<template>
  <div class="mt-5">
    <el-card>
      <div slot="header" class="flexbox">
        <div class="font-25">机器人</div>
        <el-tag class="text-r" type="primary" disable-transitions>网络正常</el-tag>
        <el-tag class="text-r" style="margin-left:10px;" type="primary" disable-transitions>无报警</el-tag>
      </div>
      <el-row>
        <el-col :span="24">
          <!-- 如果是移动端，使用table -->
          <table class="mt-5 table table-bordered" cellspacing="0" width="100%" v-if="isMobile">
            <tbody>
              <tr>
                <td>报警状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ErrorStatus?'true-color':'false-color'"></span>
                </td>
                <td>急停状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.HstopStatus?'true-color':'false-color'"></span>
                </td>
              </tr>
              <tr>
                <td>权限状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.AuthorityStatus?'true-color':'false-color'"></span>
                </td>
                <td>伺服状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ServoStatus?'true-color':'false-color'"></span>
                </td>
              </tr>
              <tr>
                <td>轴运动状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.AxisMoveStatus?'true-color':'false-color'"></span>
                </td>
                <td>程序运行状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgMoveStatus?'true-color':'false-color'"></span>
                </td>
              </tr>
              <tr>
                <td>程序加载状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgLoadStatus?'true-color':'false-color'"></span>
                </td>
                <td>程序暂停状态</td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgHoldStatus?'true-color':'false-color'"></span>
                </td>
              </tr>
              <tr>
                <td>模式状态</td>
                <td colspan="3">
                  <span>{{robotData.ModeStatus===1?'手动':robotData.ModeStatus===2?'自动':'远程'}}</span>
                </td>
              </tr>
              <tr>
                <td>速度状态</td>
                <td colspan="3">{{robotData.SpeedStatus}}</td>
              </tr>
              <tr>
                <td>加载工程名</td>
                <td colspan="3">{{robotData.ProjectName}}</td>
              </tr>
              <tr>
                <td>加载程序名</td>
                <td colspan="3">{{robotData.ProgramName}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 如果是pc端，使用el-row -->
          <table class="mt-5 table table-bordered text-c" cellspacing="0" width="100%" v-else>
            <tbody>
              <tr>
                <td>报警状态</td>
                <td>急停状态</td>
                <td>权限状态</td>
                <td>伺服状态</td>
                <td>轴运动状态</td>
                <td>程序运行状态</td>
                <td>程序加载状态</td>
                <td>程序暂停状态</td>
                <td>程序加载状态</td>
                <td>程序暂停状态</td>
              </tr>
              <tr>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ErrorStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.HstopStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.AuthorityStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ServoStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.AxisMoveStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgMoveStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgLoadStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgHoldStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgLoadStatus?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgHoldStatus?'true-color':'false-color'"></span>
                </td>
              </tr>
            </tbody>
          </table>
          <el-row v-if="!isMobile">
            <el-col :span="6" class="mt-5 no-shadow">
              <el-card class="box-card m-5" style="margin-left:0;">
                <div class="icon-div">
                  <span class="iconfont icon-mode"></span>
                </div>
                <div class="right-div">
                  <p class="text-gray">模式状态</p>
                  <p class="font-25">{{robotData.ModeStatus===1?'手动':robotData.ModeStatus===2?'自动':'远程'}}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" class="mt-5 no-shadow">
              <el-card class="box-card m-5">
                <div class="icon-div">
                  <span class="iconfont icon-speed"></span>
                </div>
                <div class="right-div">
                  <p class="text-gray">速度状态</p>
                  <p class="font-25">{{robotData.SpeedStatus}}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" class="mt-5 no-shadow">
              <el-card class="box-card m-5">
                <div class="icon-div">
                  <span class="iconfont icon-project"></span>
                </div>
                <div class="right-div">
                  <p class="text-gray">加载工程名</p>
                  <p>{{robotData.ProjectName}}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" class="mt-5 no-shadow">
              <el-card class="box-card m-5" style="margin-right:0;">
                <div class="icon-div">
                  <span class="iconfont icon-code"></span>
                </div>
                <div class="right-div">
                  <p class="text-gray">加载程序名</p>
                  <p>{{robotData.ProgramName}}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <!-- 机器人角度 -->
        <el-col :lg="12" :md="24" :sm="24" class="mt-5">
          <robotStateChartArea :chartId="chartIds[0]" :titleName="titleNames[0]" :legendData="legendDatas[0]" ref="angleChart"></robotStateChartArea>
        </el-col>
        <!-- 机器人位置 -->
        <el-col :lg="12" :md="24" :sm="24" class="mt-5">
          <robotStateChartArea :chartId="chartIds[1]" :titleName="titleNames[1]" :legendData="legendDatas[1]" ref="positionChart"></robotStateChartArea>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import robotStateChartArea from './component/robotStateChart'
export default {
  // 父组件传入的属性值
  props: {
    robotData: null
  },
  components: {
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
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
    // 更新图表数据
    updateData(data, time) {
      this.$refs.angleChart.updateDataChart(data.DbAxisPos, time)
      this.$refs.positionChart.updateDataChart(data.DbCartPos, time)
    },
    // 清除图表数据
    clearChartData() {
      this.$refs.angleChart.clearChartData()
      this.$refs.positionChart.clearChartData()
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 0;
}
.select-middle {
  height: 85px;
  line-height: 85px;
  vertical-align: middle;
}
.icon-div {
  width: 46px;
}
.right-div {
  flex: 1;
  text-align: right;
}
.flexbox {
  display: flex;
}
.flexbox div {
  flex: 1;
}
.no-shadow /deep/ .is-always-shadow {
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
}
.box-card /deep/ .el-card__body {
  display: flex;
}
</style>
