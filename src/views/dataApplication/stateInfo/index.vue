<template>
  <div class="isMobile?'p-5':'p-10'">
    <robotState :robotData="robotData" ref="robotState">></robotState>
  </div>
</template>

<script>

import robotState from './robotState'
import mqtt from 'mqtt'

export default {
  components: {
    robotState
  },
  data() {
    return {
      // mqtt
      client: '',
      // addr: 'ws://47.92.5.140:8083/mqtt',
      addr: 'ws://192.168.0.133:8083/mqtt',
      theme: 'web-SZ-2019001:DV-20190001',
      options: {
        connectTimeout: 40000,
        clientId: '35e1acdbc2664baca8da1701eac58874',
        username: 'admin',
        password: 'public',
        clean: true
      },
      // 机器人数据
      robotInfo: [],
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
    this.mqttConnect()
  },
  beforeDestroy() {
  },
  methods: {
    // mqtt
    mqttConnect() {
      // 连接mqtt
      this.client = mqtt.connect(this.addr, this.options)
      // 订阅
      this.client.on('connect', (e) => {
        console.log('连接成功：' + e)
        this.client.subscribe(this.theme, { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功：订阅主题【' + this.theme + '】')
          } else {
            console.log('订阅失败：' + error)
          }
        })
      })
      // 接收消息处理
      const that = this
      this.client.on('message', function (topic, message) {
        // console.log('订阅的消息:' + topic + ',' + message.toString()) // 打印消息内容
        try {
          that.initData(JSON.parse(message.toString()))
        } catch (e) {
        }
      })
      // 断开发起重连
      this.client.on('reconnect', (error) => {
        console.log('xxy 正在重连:', error)
      })
      // 链接异常处理
      this.client.on('error', (error) => {
        console.log('xxy 连接失败:', error)
      })
    },
    initData(data) { // 订阅数据解析
      const robot = data.sensorData
      const time = this.$dayjs().format('HH:mm:ss:SSS')
      // 机器人数据解析
      if (robot) {
        const pj = robot.PhysicalJoints
        if (pj) {
          if (pj.value.length !== 6) {
            const value_tem = JSON.parse(pj.value)
            this.robotInfo[0] = value_tem[0]
            this.robotInfo[1] = value_tem[1]
            this.robotInfo[2] = value_tem[2]
            this.robotInfo[3] = value_tem[3]
            this.robotInfo[4] = value_tem[4]
            this.robotInfo[5] = Math.abs(value_tem[5]) > 180 ? (value_tem[5] > 0 ? value_tem[5] - 360 : value_tem[5] + 360) : value_tem[5]
            // this.robotInfo[5] = this.getModelData(value_tem[5])
          }
        }
        // console.log(time)
        this.$refs.robotState.updateData(this.robotInfo, time)
      }
    },
    getModelData(data) { // 将机器人第六轴数据 模型到 -180 到 180 之间
      while (data > 360) {
        data = data - 360
      }
      return data - data / 180 * 360
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card__header {
  padding: 10px 15px;
}
</style>
