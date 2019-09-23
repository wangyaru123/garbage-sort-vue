<template>
  <div :class="isMobile? 'total-layout-mobile':'total-layout'">
    <div class="title">
      <img v-if="!isMobile" src="../../../assets/billboard/h1Posco.png" class="pl-10 float-l" alt />
      <img v-if="!isMobile" src="../../../assets/billboard/extra.png" alt="">
      <span class="title-name">“1+X”工业机器人应用编程</span>
      <img v-if="!isMobile" src="../../../assets/billboard/extra.png" alt="">
      <img v-if="!isMobile" src="../../../assets/billboard/goBack.png" class="go-back" alt @click="goBack" title="返回" />
    </div>
    <el-row class="content">
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item-h33 p-10">
          <device-info></device-info>
        </div>
        <div class="item-h22 p-10">
          <device-state></device-state>
        </div>
        <div class="item-h44 p-10">
          <parameter :robotData="robotData"></parameter>
        </div>
      </el-col>
      <el-col :lg="14" :md="24" :sm="24" class="content-layout">
        <el-col :lg="12" :md="24" :sm="24" class="p-10" :class="isMobile? 'item-h33':'item-h50'">
          <operation-ratio></operation-ratio>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24" class="p-10" :class="isMobile? 'item-h33':'item-h50'">
          <use-duration></use-duration>
        </el-col>
        <el-col :lg="24" :md="24" :sm="24" class="p-10" :class="isMobile? 'item-h33':'item-h50'">
          <robot-info :robotData="robotData" ref="robotState"></robot-info>
        </el-col>
      </el-col>
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item-h33 p-10">
          <device-location></device-location>
        </div>
        <div class="item-h22 p-10">
          <box-info></box-info>
        </div>
        <div class="item-h44 p-10">
          <device-alarm></device-alarm>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import boxInfo from './component/boxInfo'
import deviceAlarm from './component/deviceAlarm'
import deviceInfo from './component/deviceInfo'
import deviceLocation from './component/deviceLocation'
import deviceState from './component/deviceState'
import operationRatio from './component/operationRatio'
import parameter from './component/parameter'
import robotInfo from './component/robotInfo'
import useDuration from './component/useDuration'
import mqtt from 'mqtt'

export default {
  components: {
    boxInfo,
    deviceAlarm,
    deviceInfo,
    deviceLocation,
    deviceState,
    operationRatio,
    parameter,
    robotInfo,
    useDuration
  },
  data() {
    return {
      // *** mqtt ***
      mqttConf: {
        client: '',
        addr: 'ws://192.168.0.133:8083/mqtt', // 'ws://47.92.5.140:8083/mqtt
        theme: 'web-SZ-2019001:DV-2019001',
        options: {
          connectTimeout: 40000,
          clientId: '35e1acdbc2664baca8da1701eac58874',
          username: 'admin',
          password: 'public',
          clean: true
        }
      },
      robotData: {
        io: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ModeStatus: 1, // 模式状态
        SpeedStatus: 50, // 速度状态
        ProjectName: '暂定', // 工程名
        ProgramName: '暂定', // 程序名
        log: ['', '', '', '', '', ''], // 日志信息
        robotPhysicalJoints: []
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  mounted: function() {
    this.mqttOperate() // 初始设备
  },
  beforeDestroy() {
    this.mqttConf.client.end() // 关闭订阅
  },
  methods: {
    mqttOperate() { // mqtt
      // 连接mqtt
      this.mqttConf.client = mqtt.connect(this.mqttConf.addr, this.mqttConf.options)
      // 订阅
      this.mqttConf.client.on('connect', (e) => {
        console.log('连接成功：' + this.mqttConf.addr)
        this.mqttConf.client.subscribe(this.mqttConf.theme, { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功：订阅主题【' + this.mqttConf.theme + '】')
          } else {
            console.log('订阅失败：' + error)
          }
        })
      })
      // 接收消息处理
      const that = this
      this.mqttConf.client.on('message', function (topic, message) {
        // console.log('订阅的消息:' + topic + ',' + message.toString()) // 打印消息内容
        try {
          that.initData(JSON.parse(message.toString()))
        } catch (e) {
        }
      })
      // 断开发起重连
      this.mqttConf.client.on('reconnect', (error) => {
        console.log('xxy 正在重连:', error)
      })
      // 链接异常处理
      this.mqttConf.client.on('error', (error) => {
        console.log('xxy 连接失败:', error)
      })
    },
    initData(data) {
      let robot = ''
      for (const key in data) {
        if (key === 'Abb-01') {
          robot = data[key]
        }
      }
      if (robot !== '') {
        // 机器人关节角度数据
        const time = this.$dayjs().format('HH:mm:ss:SSS')
        const pj = robot.jointtarget
        if (pj) {
          const value_tem = JSON.parse(pj.value)
          this.robotData.robotPhysicalJoints[0] = value_tem[0]
          this.robotData.robotPhysicalJoints[1] = value_tem[1]
          this.robotData.robotPhysicalJoints[2] = value_tem[2]
          this.robotData.robotPhysicalJoints[3] = value_tem[3]
          this.robotData.robotPhysicalJoints[4] = value_tem[4]
          this.robotData.robotPhysicalJoints[5] = Math.abs(value_tem[5]) > 180 ? (value_tem[5] > 0 ? value_tem[5] - 360 : value_tem[5] + 360) : value_tem[5]
        }
        // console.log(time)
        this.$refs.robotState.updateDataChart(this.robotData.robotPhysicalJoints, time)
        // 模式
        if (robot.OperationMode) {
          if (robot.OperationMode.value === 'MANR') {
            this.robotData.ModeStatus = 1 // 手动
          } else if (robot.OperationMode.value === 'AUTO_CH') {
            this.robotData.ModeStatus = 2 // 等待自动
          } else if (robot.OperationMode.value === 'AUTO') {
            this.robotData.ModeStatus = 3 // 自动
          }
        }
        // 机器人速率
        if (robot.SpeedRatio) {
          this.robotData.SpeedStatus = robot.SpeedRatio.value
        }
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.total-layout {
  background-color: #002035;
  height: 100vh;
  width: 100vw;
  color: white;
}
.title {
  height: 80px;
  width: 100%;
  text-align: center;
  line-height: 80px;
  font-size: 28px;
  color: #00ffcc;
  border-bottom: 1px solid #009fff;
  .title-name {
    background: radial-gradient(center, #00adcf, #02263e, #002035);
    background: -webkit-radial-gradient(center, #00adcf, #02263e, #002035);
  }
}
.go-back {
  height: 40px;
  width: 40px;
  margin: 20px;
  float: right;
  cursor: pointer;
}
.content {
  min-height: calc(100vh - 80px);
  color: white;
}

.content-layout {
  height: calc(100vh - 80px);
}
.item-h33 {
  height: 33.3%;
}
.item-h22 {
  height: 22.2%;
}
.item-h44 {
  height: 44.4%;
}
.item-h50 {
  height: 50%;
}
.h100 {
  height: 100%;
}
.total-layout-mobile {
  background-color: #002035;
  min-height: 100vh;
  width: 100%;
  color: white;
  .content-layout {
    min-height: 150vh;
    padding: 10px;
  }
}
</style>
