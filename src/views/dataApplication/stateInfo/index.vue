<template>
  <div class="isMobile?'p-5':'p-10'">
    <div class="mt-20 mb-5">
      <el-select size="small" v-model="choose_device_idx" placeholder @change="changeDevice">
        <el-option v-for="(item, idx) in device" :key="item.id" :label="item.name" :value="idx"></el-option>
      </el-select>
      <el-select size="small" v-model="choose_model_idx" placeholder @change="changeModel">
        <el-option v-for="(item, idx) in modelInfo" :key="item.id" :label="item.description" :value="idx"></el-option>
      </el-select>
      <el-select size="small" v-model="choose_robot_idx" placeholder @change="changeRobot">
        <el-option v-for="(item, idx) in robotInfo" :key="item.key" :label="item.description" :value="idx"></el-option>
      </el-select>
    </div>
    <robotState :robotData="robotData" ref="robotState">></robotState>
    <button @click="analogSend">模拟发送</button>
    <button @click="analogStop">模拟发送停止</button>
  </div>
</template>

<script>

import robotState from './robotState'
import mqtt from 'mqtt'
import { getModel } from '@/api/dataBox/onlineData.js'

export default {
  components: {
    robotState
  },
  data() {
    return {
      // *** mqtt ***
      mqttConf: {
        client: '',
        addr: 'ws://192.168.0.133:8083/mqtt', // 'ws://47.92.5.140:8083/mqtt
        theme: 'web-SZ-2019001:DV-20190001',
        options: {
          connectTimeout: 40000,
          clientId: '35e1acdbc2664baca8da1701eac58874',
          username: 'admin',
          password: 'public',
          clean: true
        }
      },
      // *** 机器人数据 ***
      robotData: {
        io: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ModeStatus: 2, // 模式状态
        SpeedStatus: 100, // 速度状态
        ProjectName: '暂定', // 工程名
        ProgramName: '暂定', // 程序名
        log: ['', '', '', '', '', ''], // 日志信息
        robotPhysicalJoints: []
      },
      buffer_log: [], // 缓存log
      // *** 选择框 ***
      device: [ // 设备
        { name: '设备1', id: 0, module: [{ description: '成品仓储模块', topic: 'web-SZ-2019001:DV-20190001' }] },
        { name: '设备2', id: 1, module: [{ description: '测试模块', topic: 'xxy' }] },
        { name: '设备3', id: 2 }
      ],
      choose_device_idx: 0, // 选择的设备
      choose_model_idx: '', // 选择的model
      modelInfo: [],
      choose_robot_idx: '', // 选择的机器人
      robotInfo: [],
      // *** 模拟数据 ***
      clearTimeSet: '', // 定时器
      temLog: ['机器人运行正常', '机器人停止运行中', '机器人出现运行故障'] // 模拟日志
    }
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
  },
  mounted() {
    this.initDevice()
  },
  beforeDestroy() {
  },
  methods: {
    initDevice() { // 初始化设备
      getModel().then(res => {
        this.device[0].module = res
        this.modelInfo = res // 初始model
        this.choose_model_idx = 0
        this.getRobotInfo(this.modelInfo[0])
        if (this.robotInfo.length > 0) {
          this.mqttConf.theme = this.modelInfo[0].topic // 更新订阅主题
          this.mqttOperate() // 开始订阅
        }
      }).catch(err => this.$message.error(err))
    },
    getRobotInfo(module) { // 获取model中的机器人
      this.robotInfo = []
      this.choose_robot_idx = ''
      if (module.configSubmodules) {
        module.configSubmodules.forEach(v => {
          if (v.type === '1') {
            this.robotInfo.push({ key: v.key, description: v.description })
            this.choose_robot_idx = 0
          }
        })
      }
    },
    changeDevice() { // 选择设备事件
      this.mqttConf.client.end() // 关闭订阅
      this.modelInfo = []
      this.choose_model_idx = ''
      this.robotInfo = []
      this.choose_robot_idx = ''
      if (this.device[this.choose_device_idx].module) {
        this.modelInfo = this.device[this.choose_device_idx].module
        this.choose_model_idx = 0
        this.getRobotInfo(this.modelInfo[0])
        if (this.robotInfo.length > 0) {
          this.mqttConf.theme = this.modelInfo[0].topic // 更新订阅主题
          this.mqttOperate() // 开始订阅
        }
      }
    },
    changeModel() { // 选择model事件
      this.mqttConf.client.end() // 关闭订阅
      this.getRobotInfo(this.modelInfo[this.choose_model_idx])
      if (this.robotInfo.length > 0) {
        this.mqttConf.theme = this.modelInfo[this.choose_model_idx].topic // 更新订阅主题
        this.mqttOperate() // 开始订阅
      }
    },
    changeRobot() { // 选择机器人事件
    },
    mqttOperate() { // mqtt操作
      // 连接mqtt
      this.mqttConf.client = mqtt.connect(this.mqttConf.addr, this.mqttConf.options)
      // 订阅
      this.mqttConf.client.on('connect', (e) => {
        console.log('连接成功：' + e)
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
    initData(data) { // 订阅数据解析
      let robot = ''
      for (const key in data) {
        if (key === this.robotInfo[this.choose_robot_idx].key) {
          robot = data[key]
        }
      }
      const time = this.$dayjs().format('HH:mm:ss:SSS')
      // 机器人数据解析
      if (robot) {
        const pj = robot.jointtarget
        if (pj) {
          if (pj.value.length !== 6) {
            const value_tem = JSON.parse(pj.value)
            this.robotData.robotPhysicalJoints[0] = value_tem[0]
            this.robotData.robotPhysicalJoints[1] = value_tem[1]
            this.robotData.robotPhysicalJoints[2] = value_tem[2]
            this.robotData.robotPhysicalJoints[3] = value_tem[3]
            this.robotData.robotPhysicalJoints[4] = value_tem[4]
            this.robotData.robotPhysicalJoints[5] = Math.abs(value_tem[5]) > 180 ? (value_tem[5] > 0 ? value_tem[5] - 360 : value_tem[5] + 360) : value_tem[5]
          }
        }
        // console.log(time)
        // 机器人关节角度数据
        this.$refs.robotState.updateData(this.robotData.robotPhysicalJoints, time)
        // 模式
        if (robot.OperationMode) {
          if (robot.OperationMode.value === 'MANR') {
            this.robotData.ModeStatus = 1 // 手动
            this.$refs.robotState.updateModeData(16)
          } else if (robot.OperationMode.value === 'AUTO_CH') {
            this.robotData.ModeStatus = 2 // 等待自动
            this.$refs.robotState.updateModeData(50)
          } else if (robot.OperationMode.value === 'AUTO') {
            this.robotData.ModeStatus = 3 // 自动
            this.$refs.robotState.updateModeData(90)
          }
        }
        // 速度
        if (robot.SpeedRatio) {
          this.robotData.SpeedStatus = robot.SpeedRatio.value
          this.$refs.robotState.updateSpeedData(robot.SpeedRatio.value)
        }
        // 日志
        const rz = robot.log
        if (rz) {
          this.buffer_log = JSON.parse(rz.value)
          this.setRZTime()
        }
        // 机器人IO数据
      }
    },
    setRZTime() { // 日志刷新
      this.clearTimeSet = setInterval(() => {
        this.robotData.log = this.buffer_log
      }, 2000)
    },
    // ******* 模拟数据 ***************************************************************************
    analogSend() { // 模拟定时发送
      this.setTime()
    },
    analogStop() { // 模拟定时停止
      clearInterval(this.clearTimeSet)
    },
    setTime() {
      this.clearTimeSet = setInterval(() => {
        this.analogData()
      }, 100)
    },
    analogData() { // 模拟数据
      // IO数据
      this.robotData.io[0] = Math.round(Math.random())
      this.robotData.io[1] = Math.round(Math.random())
      this.robotData.io[2] = Math.round(Math.random())
      this.robotData.io[3] = Math.round(Math.random())
      this.robotData.io[4] = Math.round(Math.random())
      this.robotData.io[5] = Math.round(Math.random())
      this.robotData.io[6] = Math.round(Math.random())
      this.robotData.io[7] = Math.round(Math.random())
      this.robotData.io[8] = Math.round(Math.random())
      // 模式
      const a = 1 + Math.round(Math.random() * 2)
      this.robotData.ModeStatus = a // 手动
      this.$refs.robotState.updateModeData(a === 1 ? 16 : a === 2 ? 50 : 84)
      // 速度
      const b = Math.round(Math.random() * 100)
      this.robotData.SpeedStatus = b
      this.$refs.robotState.updateSpeedData(b)
      // 角度
      this.robotInfo[0] = Math.random() * 60 + 120
      this.robotInfo[1] = Math.random() * 60 + 60
      this.robotInfo[2] = Math.random() * 60
      this.robotInfo[3] = Math.random() * 60 - 60
      this.robotInfo[4] = Math.random() * 60 - 120
      this.robotInfo[5] = Math.random() * 60 - 180
      const time = this.$dayjs().format('HH:mm:ss:SSS')
      this.$refs.robotState.updateData(this.robotInfo, time)
      // 日志
      const c = this.temLog[Math.round(Math.random() * 2)]
      if (this.robotData.log[5] !== c) {
        this.robotData.log.shift()
        this.robotData.log.push(c)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card__header {
  padding: 10px 15px;
}
</style>
