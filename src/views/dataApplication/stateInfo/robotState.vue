<template>
  <div :class="isMobile?'m-5':'m-10'">
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
                <td>变位机装配模块气缸电磁阀</td>
                <td>井式供料推头气缸电磁阀</td>
                <td>桌面绿色按钮指示灯</td>
                <td>桌面红色按钮指示灯</td>
                <td>机器人快换手抓气动系统电磁阀1</td>
                <td>机器人快换手抓气动系统电磁阀2</td>
                <td>机器人快换手抓气动系统电磁阀3</td>
                <td>机器人快换手抓气动系统电磁阀4</td>
                <td>机器人快换手抓气动系统电磁阀5</td>
                <!--<td>程序暂停状态</td>-->
              </tr>
              <tr>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[0]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[1]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[2]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[3]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[4]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[5]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[6]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[7]==='1'?'true-color':'false-color'"></span>
                </td>
                <td>
                  <span class="iconfont icon-yuan" :class="robotData.io[8]==='1'?'true-color':'false-color'"></span>
                </td>
                <!--<td>
                  <span class="iconfont icon-yuan" :class="robotData.ProgHoldStatus?'true-color':'false-color'"></span>
                </td>-->
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
                  <p class="font-25">{{robotData.ModeStatus===1?'手动':robotData.ModeStatus===2?'等待自动':'自动'}}</p>
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
        <!-- 仪表盘1 -->
        <el-col :lg="12" :md="24" :sm="24" class="mt-5 no-shadow">
          <el-card class="box-card">
          <gaugeChart chartId="gaugeChart" ref="modeBarChart"></gaugeChart>
          </el-card>
        </el-col>
        <!-- 仪表盘2 -->
        <el-col :lg="12" :md="24" :sm="24" class="mt-5 no-shadow">
          <el-card class="box-card">
          <gaugeChartTwo chartId="gaugeChartTwo" ref="speedBarChart"></gaugeChartTwo>
          </el-card>
        </el-col>
        <!-- 机器人角度 -->
        <el-col :lg="12" :md="24" :sm="24" class="mt-10 no-shadow">
          <el-card class="pb-10">
          <robotStateChartArea :chartId="chartIds[0]" :titleName="titleNames[0]" :legendData="legendDatas[0]" ref="angleChart"></robotStateChartArea>
          </el-card>
        </el-col>
        <!-- 机器人位置 -->
        <!--<el-col :lg="12" :md="24" :sm="24" class="mt-5">
          <robotStateChartArea :chartId="chartIds[1]" :titleName="titleNames[1]" :legendData="legendDatas[1]" ref="positionChart"></robotStateChartArea>
        </el-col>-->
        <el-col :lg="12" :md="24" :sm="24" class="mt-10 no-shadow">
          <!--<robotStateChartArea :chartId="chartIds[1]" :titleName="titleNames[1]" :legendData="legendDatas[1]" ref="positionChart"></robotStateChartArea>-->
          <el-card class="pb-10 tableHeight">
            <el-table :data="robotData.log" border stripe :class="isMobile?'mt-5':''" >
              <el-table-column label="序号" align="center" :width="isMobile?'60':'80'">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="标题" align="center" :width="isMobile?'70':'150'">
                <template slot-scope="scope">
                  <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="详细信息" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.desc }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" :width="isMobile?'60':'100'" align="center">
                <template slot-scope="scope">
                  <span>{{(scope.row.tstamp + '').replace('T', '')}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import robotStateChartArea from './component/robotStateChart'
import gaugeChart from './component/gaugeChart'
import gaugeChartTwo from './component/gaugeChartTwo'

export default {
  // 父组件传入的属性值
  props: {
    robotData: null
  },
  mounted: function () {
  },
  components: {
    robotStateChartArea,
    gaugeChart,
    gaugeChartTwo
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
      this.$refs.angleChart.updateDataChart(data, time)
    },
    // 更新模式图形数据
    updateModeData(data) {
      this.$refs.modeBarChart.updateDataChart(data)
    },
    // 更新速度图形数据
    updateSpeedData(data) {
      this.$refs.speedBarChart.updateDataChart(data)
    },
    // 清除图表数据
    clearChartData() {
      this.$refs.angleChart.clearChartData()
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
.pb-10{
  padding-bottom: 10px;
}
.tableHeight{
  height: 342px;
  .el-table{
    height: 322px;
    overflow-y: auto;
  }
}
</style>
