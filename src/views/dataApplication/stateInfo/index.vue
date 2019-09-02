<template>
  <div class="p-10">
    <el-row>
      <el-col :xs="24" :lg="16">
        <div>
          <el-select v-model="singleframeValue" size="small" placeholder="请选择" @change="onChangeProductLine">
            <el-option v-for="item in singleframeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xs="24" :lg="8" :class="isMobile?'mt-5':'text-r'">
        <el-button type="primary" round size="small" @click="toIoPage">查看IO</el-button>
        <el-button type="primary" round size="small" @click="toAlarmPage">查看报警</el-button>
      </el-col>
    </el-row>
    <statisticsState></statisticsState>
    <plcState :plcData="plcData" v-if="plcData"></plcState>
    <robotState :robotData="robotData" ref="robotState">></robotState>
  </div>
</template>

<script>
import statisticsState from './statisticsState'
import plcState from './plcState'
import robotState from './robotState'

export default {
  components: {
    statisticsState,
    plcState,
    robotState
  },
  data() {
    return {
      singleframeValue: '1#',
      singleframeList: [{ value: '1#', label: '单柜1' }],
      singleframeData: {},
      plcData: {
        BufferCache: {
          ProductCode: 7,
          ProductModel: 190,
          SprayGlazeCount: 1,
          FirstProgramNumber: 7,
          FirstAtomizingValue: 0,
          FirstFanValue: 0,
          FirstSprayGunValue: 0,
          SecondProgramNumber: 0,
          SecondAtomizingValue: 0,
          SecondFanValue: 0,
          SecondSprayGunValue: 0,
          ThirdProgramNumber: 0,
          ThirdAtomizingValue: 0,
          ThirdFanValue: 0,
          ThirdSprayGunValue: 0,
          LoadMaterialLocation: 1,
          Retention: 1
        },
        AutoCache: {
          ProductCode: 59,
          ProductModel: 990,
          SprayGlazeCount: 1,
          FirstProgramNumber: 59,
          FirstAtomizingValue: 0,
          FirstFanValue: 0,
          FirstSprayGunValue: 0,
          SecondProgramNumber: 0,
          SecondAtomizingValue: 0,
          SecondFanValue: 0,
          SecondSprayGunValue: 0,
          ThirdProgramNumber: 0,
          ThirdAtomizingValue: 0,
          ThirdFanValue: 0,
          ThirdSprayGunValue: 0,
          LoadMaterialLocation: 1,
          Retention: 1
        },
        OneCache: {
          ProductCode: 59,
          ProductModel: 990,
          SprayGlazeCount: 1,
          FirstProgramNumber: 59,
          FirstAtomizingValue: 0,
          FirstFanValue: 0,
          FirstSprayGunValue: 0,
          SecondProgramNumber: 0,
          SecondAtomizingValue: 0,
          SecondFanValue: 0,
          SecondSprayGunValue: 0,
          ThirdProgramNumber: 0,
          ThirdAtomizingValue: 0,
          ThirdFanValue: 0,
          ThirdSprayGunValue: 0,
          LoadMaterialLocation: 1,
          Retention: 1
        },
        TwoCache: {
          ProductCode: 59,
          ProductModel: 990,
          SprayGlazeCount: 1,
          FirstProgramNumber: 59,
          FirstAtomizingValue: 0,
          FirstFanValue: 0,
          FirstSprayGunValue: 0,
          SecondProgramNumber: 0,
          SecondAtomizingValue: 0,
          SecondFanValue: 0,
          SecondSprayGunValue: 0,
          ThirdProgramNumber: 0,
          ThirdAtomizingValue: 0,
          ThirdFanValue: 0,
          ThirdSprayGunValue: 0,
          LoadMaterialLocation: 1,
          Retention: 1
        },
        SprayGlazy: {
          CurrentProductCode: 59,
          CurrentProductModel: 990,
          CurrentGoalFrequency: 1,
          CurrentFrequency: 1,
          ProgramNumber: 59,
          WaitProductCode: 59,
          WaitProductModel: 990,
          WaitGoalFrequency: 1,
          WaitFrequency: 1
        }
      },
      robotData: {
        ErrorStatus: 0,
        HstopStatus: 1,
        AuthorityStatus: 1,
        ServoStatus: 1,
        AxisMoveStatus: 0,
        ProgMoveStatus: 1,
        ProgLoadStatus: 1,
        ProgHoldStatus: 0,
        ModeStatus: 3,
        SpeedStatus: 100,
        ProjectName: '',
        ProgramName: '',
        DbAxisPos: [47.6358, -29.9997, -52.1003, 48.6577, 96.8928, 6.63374, 0.0],
        DbCartPos: [691.126831, 619.565552, 174.929932, -2.021299, 77.9358444, -167.3091]
      }
    }
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
    this.openWebSocket()
  },
  beforeDestroy() {
    this.closeWebSocket()
  },
  methods: {
    // 切换产线
    onChangeProductLine() {
      if (this.stompClient && this.stompClient.connected) {
        if (this.subscription != null) {
          console.log('取消当前的订阅主题')
          this.subscription.unsubscribe()
        }
        this.subscribeData()
        console.log('切换到[机器人' + this.singleframeValue + ']的数据')
      } else {
        this.$message.error('连接已断开，无法订阅数据，请重新刷新页面')
      }
      this.$refs.robotState.clearChartData()
    },
    // 开启websocket
    openWebSocket() {
      // 建立连接对象
      const socket = new this.$sockjs(process.env.VUE_APP_WS_SINGLEFRAME)
      // 获取STOMP子协议的客户端对象
      this.stompClient = this.$stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = {
        Authorization: ''
      }
      this.stompClient.connect(headers, () => {
        console.log(`开启websocket并已连接，服务器地址：${process.env.VUE_APP_WS_SINGLEFRAME}`)
        this.subscribeData()
      }, error => {
        console.log('fail' + error)
      })
    },
    // 订阅数据
    subscribeData() {
      this.subscription = this.stompClient.subscribe(process.env.VUE_APP_TOPIC_PER_SINGLEFRAME, msg => {
        this.singleframeData = JSON.parse(msg.body)
        // 获取数据长度
        const stateDataLength = Object.keys(this.singleframeData).length
        // 清空单柜列表
        this.singleframeList = []
        // 处理单柜列表
        for (let i = 0; i < stateDataLength; i++) {
          this.singleframeList.push({ value: `${i + 1}#`, label: `单柜${i + 1}` })
        }
        // 获取plc数据
        this.plcData = JSON.parse(this.singleframeData[`${this.singleframeValue}`]).MelsecPLC
        // 获取机器人数据
        this.robotData = JSON.parse(this.singleframeData[`${this.singleframeValue}`]).Robot
        var time = this.$dayjs().format('HH:mm:ss')
        this.$refs.robotState.updateData(this.robotData, time)
      })
    },
    // 关闭websocket1
    closeWebSocket() {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('关闭websocket')
      }
    },
    toIoPage() {
      this.$router.push({
        path: '/dataApplication/ioMonitor',
        query: { singleframeValue: this.singleframeValue }
      })
    },
    toAlarmPage() {
      this.$router.push({
        path: '/dataApplication/alarmInfo',
        query: { singleframeValue: this.singleframeValue }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card__header {
  padding: 10px 15px;
}
</style>
