<template>
  <div class="isMobile?'p-5':'p-10'">
    <div :class="isMobile?'mobileSelect m-5':'webSelect m-10'">
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
    <!--<button @click="analogSend">模拟发送</button>
    <button @click="analogStop">模拟发送停止</button>-->
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
        ModeStatus: 1, // 模式状态
        SpeedStatus: 100, // 速度状态
        ProjectName: ' T_ROB1', // 工程名
        ProgramName: 'MAIN', // 程序名
        log: ['', '', '', '', '', ''], // 日志信息
        robotPhysicalJoints: []
      },
      buffer_log: [], // 缓存log
      // *** 选择框 ***
      device: [ // 设备
        { name: '设备1', id: 0, module: [{ description: '成品仓储模块', topic: 'web-SZ-2019001:DV-20190001' }] },
        { name: '设备2', id: 1, module: [{ description: '测试模块2', topic: 'xxy', configSubmodules: [{ type: '1', key: 'IFT-01', description: 'IFT机器人设备1' }] }] },
        { name: '设备3', id: 2, module: [{ description: '测试模块3', topic: 'xxy', configSubmodules: [{ type: '1', key: 'IFT-01', description: 'IFT机器人设备1' }] }] }
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
    this.setRZTime() // 启动日志定时器
  },
  beforeDestroy() {
    this.mqttConf.client.end() // 关闭订阅
    clearInterval(this.clearTimeSet) // 清除定时器
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
      /* const tem = '[{"id":1,"gmtCreate":"2019-05-07 09:11:22","gmtModified":"2019-09-19 17:00:53","key":"storage","description":"成品仓储模块","topic":"web-SZ-2019001:DV-2019001","equipmentId":1,"configSubmodules":[{"id":1,"moduleId":1,"key":"PLC-01","description":"PLC设备1","gmtCreate":"2019-09-11 15:18:57","gmtModified":"2019-09-11 15:19:00","type":"0"},{"id":2,"moduleId":1,"key":"Abb-01","description":"ABB机器人设备1","gmtCreate":"2019-09-11 15:27:58","gmtModified":"2019-09-11 15:28:01","type":"1"},{"id":3,"moduleId":1,"key":"PLC-02","description":"PLC设备2","gmtCreate":"2019-09-19 09:16:24","gmtModified":"2019-09-19 09:16:27","type":"0"},{"id":4,"moduleId":1,"key":"Abb-02","description":"ABB机器人设备2","gmtCreate":"2019-09-19 09:17:20","gmtModified":"2019-09-19 09:17:22","type":"1"}]}]'
      const _a = JSON.parse(tem)
      this.device[0].module = _a
      this.modelInfo = _a // 初始model
      this.choose_model_idx = 0
      this.getRobotInfo(this.modelInfo[0])
      if (this.robotInfo.length > 0) {
        this.mqttConf.theme = this.modelInfo[0].topic // 更新订阅主题
        this.mqttOperate() // 开始订阅
      }*/
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
    initData(data) { // 订阅数据解析
      let robot = ''
      for (const key in data) {
        if (key === this.robotInfo[this.choose_robot_idx].key) {
          robot = data[key]
        } else if (key === 'IFT-01') {
          this.initIFT(data[key])
          return
        }
      }
      if (robot === '') return
      const time = this.$dayjs().format('HH:mm:ss:SSS')
      // 机器人数据解析
      if (robot) {
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
            this.$refs.robotState.updateModeData(84)
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
        }
        // 机器人IO数据
        const _io = robot.ioout
        if (_io) {
          const _v = _io.value
          if (_v.length > 16) {
            this.robotData.io[0] = _v.charAt(15)
            this.robotData.io[1] = '0'
            this.robotData.io[2] = _v.charAt(13)
            this.robotData.io[3] = _v.charAt(14)
            this.robotData.io[4] = _v.charAt(15)
            this.robotData.io[5] = _v.charAt(16)
            this.robotData.io[6] = _v.charAt(17)
            this.robotData.io[7] = _v.charAt(18)
            this.robotData.io[8] = _v.charAt(19)
          }
        }
        const _io2 = robot.io2out
        if (_io2) {
          const _v = _io2.value
          if (_v.length > 16) {
            this.robotData.io[0] = _v.charAt(14)
            this.robotData.io[1] = _v.charAt(3)
          }
        }
      }
    },
    initIFT(data) { // 解析ift机器人
      let robot = ''
      robot = data
      if (robot === '') return
      const time = this.$dayjs().format('HH:mm:ss:SSS')
      // 机器人数据解析
      if (robot) {
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
            this.$refs.robotState.updateModeData(84)
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
        }
        // 机器人IO数据
        const _io = robot.ioout
        if (_io) {
          const _v = _io.value
          if (_v.length > 16) {
            this.robotData.io[0] = _v.charAt(15)
            this.robotData.io[1] = '0'
            this.robotData.io[2] = _v.charAt(13)
            this.robotData.io[3] = _v.charAt(14)
            this.robotData.io[4] = _v.charAt(15)
            this.robotData.io[5] = _v.charAt(16)
            this.robotData.io[6] = _v.charAt(17)
            this.robotData.io[7] = _v.charAt(18)
            this.robotData.io[8] = _v.charAt(19)
          }
        }
        const _io2 = robot.io2out
        if (_io2) {
          const _v = _io2.value
          if (_v.length > 16) {
            this.robotData.io[0] = _v.charAt(14)
            this.robotData.io[1] = _v.charAt(3)
          }
        }
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
      }, 500)
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
      // const c = this.temLog[Math.round(Math.random() * 2)]
      const rz = '[\n  {\n    "id": "15119",\n    "msgtype": "1",\n    "code": "10144",\n    "tstamp": "2019-09-19 T 17:01:29",\n    "title": "等待指令的模拟",\n    "desc": "等待指令（WaitTime, WaitUntil, WaitDO等）已由 Default User 在任务 T_ROB1 中模拟。",\n    "conseqs": "",\n    "causes": "",\n    "actions": "",\n    "argc": "2",\n    "arg1": "T_ROB1",\n    "arg2": "Default User"\n  },\n  {\n    "id": "15118",\n    "msgtype": "1",\n    "code": "10151",\n    "tstamp": "2019-09-19 T 17:01:00",\n    "title": "程序已启动",\n    "desc": "从任务的入口例行程序的第一个指令开始执行任务 T_ROB1 。起因是外部客户端。",\n    "conseqs": "",\n    "causes": "",\n    "actions": "",\n    "argc": "2",\n    "arg1": "1",\n    "arg2": "T_ROB1"\n  },\n  {\n    "id": "15117",\n    "msgtype": "1",\n    "code": "10053",\n    "tstamp": "2019-09-19 T 17:01:00",\n    "title": "返回就绪",\n    "desc": "返回移动就绪。",\n    "conseqs": "",\n    "causes": "",\n    "actions": "",\n    "argc": "1",\n    "arg1": "0"\n  },\n  {\n    "id": "15116",\n    "msgtype": "1",\n    "code": "10052",\n    "tstamp": "2019-09-19 T 17:01:00",\n    "title": "返回启动",\n    "desc": "返回移动已启动。",\n    "conseqs": "",\n    "causes": "",\n    "actions": "",\n    "argc": "1",\n    "arg1": "0"\n  },\n  {\n    "id": "15115",\n    "msgtype": "1",\n    "code": "10011",\n    "tstamp": "2019-09-19 T 17:01:00",\n    "title": "电机上电(ON) 状态",\n    "desc": "系统处于电机上电 (ON) 状态。",\n    "conseqs": "电机上电 (ON) 电路已经闭合，正在给机械手电机供电。可恢复正常操作。",\n    "causes": "",\n    "actions": "",\n    "argc": "0"\n  },\n  {\n    "id": "15114",\n    "msgtype": "1",\n    "code": "10010",\n    "tstamp": "2019-09-19 T 17:00:59",\n    "title": "电机下电 (OFF) 状态",\n    "desc": "系统处于电机下电 (OFF) 状态。从手动模式切换至自动模式，或者程序执行过程中电机上电 (ON) 电路被打开后，系统就会进入此状态。",\n    "conseqs": "闭合电机上电 (ON) 电路之前无法进行操作。此时，机械手轴被机械制闸固定在适当的位置。",\n    "causes": "",\n    "actions": "",\n    "argc": "0"\n  },\n  {\n    "id": "15113",\n    "msgtype": "1",\n    "code": "10149",\n    "tstamp": "2019-09-19 T 17:00:55",\n    "title": "程序指针移至例行程序",\n    "desc": "任务 T_ROB1 中的程序指针已经被 Default User 移至例行程序 main 。",\n    "conseqs": "",\n    "causes": "",\n    "actions": "",\n    "argc": "3",\n    "arg1": "T_ROB1",\n    "arg2": "main",\n    "arg3": "Default User"\n  },\n  {\n    "id": "15112",\n    "msgtype": "1",\n    "code": "10002",\n    "tstamp": "2019-09-19 T 17:00:55",\n    "title": "程序指针已经复位",\n    "desc": "任务 T_ROB1 的程序指针已经复位。",\n    "conseqs": "启动后，程序将在任务录入例行程序发出第一个指令时开始执行。请注意重新启动后机械手可能移动到非预期位置！",\n    "causes": "操作人员可能已经手动请求了此动作。",\n    "actions": "",\n    "argc": "3",\n    "arg1": "1",\n    "arg2": "0",\n    "arg3": "T_ROB1"\n  },\n  {\n    "id": "15111",\n    "msgtype": "1",\n    "code": "10148",\n    "tstamp": "2019-09-19 T 16:57:14",\n    "title": "IO设置",\n    "desc": "IO 信号 YV3 已由 Default User 更改为值 0。",\n    "conseqs": "",\n    "causes": "",\n    "actions": "",\n    "argc": "3",\n    "arg1": "YV3",\n    "arg2": "0",\n    "arg3": "Default User"\n  },\n  {\n    "id": "15110",\n    "msgtype": "1",\n    "code": "10148",\n    "tstamp": "2019-09-19 T 16:57:05",\n    "title": "IO设置",\n    "desc": "IO 信号 YV2 已由 Default User 更改为值 0。",\n    "conseqs": "",\n    "causes": "",\n    "actions": "",\n    "argc": "3",\n    "arg1": "YV2",\n    "arg2": "0",\n    "arg3": "Default User"\n  }\n]'
      this.buffer_log = JSON.parse(rz)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card__header {
  padding: 10px 15px;
}
.webSelect{
  /deep/ .el-select{
    z-index: 1;
  }
}
  .mobileSelect{
    /deep/ .el-select{
       width:100px;
      z-index: 1;
    }
  }
</style>
