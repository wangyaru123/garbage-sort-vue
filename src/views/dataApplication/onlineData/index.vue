<template>
  <!-- 数据应用首页 -->
  <div :class="isMobile?'p-5':'p-10'">
    <el-row :gutter="5">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card :class="isMobile?'h-auto':'h-num-l'">
          <div slot="header" class="clearfix alignCenter">
            <div>
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
          </div>
          <img :src="machineImg" class="sidebar-logo" alt="">
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <!--开关量-->
        <el-card class="pb-10">
          <div slot="header" class="clearfix">
            <div>开关量</div>
          </div>
          <!--<div v-for="o in inputInfo" :key="o" class="text item m-10">
            {{o}}
          </div>-->
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">库位1：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[0][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r"> 库位2：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[0][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">库位3：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[0][2]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">库位4：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[0][3]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">库位5：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">库位6：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">毛坯工件：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][2]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">半成品工件：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][3]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">成品工件：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">检测到卡：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">相机联机：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][2]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10">
            <el-col :span="12" class="text-r">红色工件：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[1][3]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10 mb-10">
            <el-col :span="12" class="text-r">黄色工件：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[2][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
          <el-col :span="12" class="mt-10 mb-10">
            <el-col :span="12" class="text-r">蓝色工件：</el-col>
            <el-col :span="12">
              <span v-if="inputArrayData[2][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </el-col>
          </el-col>
        </el-card>
        <!--机器人-->
        <el-card class="pb-10 mt-5">
          <div slot="header" class="clearfix">
            <div>机器人</div>
          </div>
          <div class="text item m-10">
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">关节1坐标：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[0]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">关节2坐标：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[1]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">关节3坐标：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[2]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">关节4坐标：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[3]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">关节5坐标：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[4]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">关节6坐标：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[5]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">速度百分比：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[6]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="13" class="text-r">操作模式：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[7]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10 mb-10">
              <el-col :span="13" class="text-r">当前状态：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[8]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10 mb-10">
              <el-col :span="13" class="text-r">错误状态：</el-col>
              <el-col :span="11" class="alignLeft">{{robotInfo[9]}}</el-col>
            </el-col>
          </div>
        </el-card>
        <!--其他-->
        <el-card class="pb-10 mt-5">
          <div slot="header" class="clearfix">
            <div>其他</div>
          </div>
          <!--<div v-for="o in robotInfo" :key="o" class="text item m-10">
            {{o}}
          </div>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import machineImg from '@/assets/machine.png'
import mqtt from 'mqtt'
import { getModel } from '@/api/dataBox/onlineData.js'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    },
    // 授权头
    headers() {
      return {
        Authorization: this.$store.getters.authorization
      }
    }
  },
  components: {
  },
  data() {
    return {
      machineImg, // 头像图片
      websocket: '',
      robotData: ['', '', '', '', '', '', '', '', ''],
      inputArrayData: [['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']],
      outputArrayData: [['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']],
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
      PLCInfo: [] // PLC
    }
  },
  created() {
    // this.openWebSocket()
  },
  mounted: function() {
    this.initDevice() // 初始设备
  },
  beforeDestroy() {
    this.mqttConf.client.end() // 关闭订阅
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
      this.PLCInfo = []
      this.choose_robot_idx = ''
      if (module.configSubmodules) {
        module.configSubmodules.forEach(v => {
          if (v.type === '1') {
            this.robotInfo.push({ key: v.key, description: v.description })
            this.choose_robot_idx = 0
          } else if (v.type === '0') {
            this.PLCInfo.push({ key: v.key, description: v.description })
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
    mqttConnect() { // mqtt
      // 连接mqtt
      this.mqttConf.client = mqtt.connect(this.mqttConf.addr, this.mqttConf.options)
      // 订阅
      this.mqttConf.client.on('connect', (e) => {
        console.log('连接成功：' + e)
        this.mqttConf.client.subscribe(this.theme, { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功：订阅主题【' + this.theme + '】')
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
      // IO 解析
      this.PLCInfo.forEach(v => {
        for (const key in data) {
          if (key === v.key) {
            v.data = data[key]
          }
        }
      })

      // 机器人解析
      let robot = ''
      for (const key in data) {
        if (key === this.robotInfo[this.choose_robot_idx].key) {
          robot = data[key]
        }
      }
      if (robot !== '') {
        const pj = robot.jointtarget
        if (pj) {
          const value_tem = JSON.parse(pj.value)
          this.robotData[0] = value_tem[0] + ' 度'
          this.robotData[1] = value_tem[1] + ' 度'
          this.robotData[2] = value_tem[2] + ' 度'
          this.robotData[3] = value_tem[3] + ' 度'
          this.robotData[4] = value_tem[4] + ' 度'
          this.robotData[5] = Math.abs(value_tem[5]) > 180 ? (value_tem[5] > 0 ? value_tem[5] - 360 : value_tem[5] + 360) : value_tem[5] + ' 度'
        }
        if (robot.SpeedRatio) {
          this.robotInfo[6] = robot.SpeedRatio.value + ' %'
        }
        if (robot.OperationMode) {
          this.robotInfo[7] = robot.OperationMode.value
        }
        if (robot.CtrlState) {
          this.robotInfo[8] = robot.CtrlState.value
        }
        if (robot.ErrorState) {
          this.robotInfo[9] = robot.ErrorState.value
        }
      }
      /* const input = data.Input
      const output = data.Output
      const robot = data.sensorData
      if (input) {
        this.inputArrayData = []
        for (let i = 0; i < input.length; i++) {
          this.inputArrayData[i] = []
          for (let j = 0; j < input[i].length; j++) {
            this.inputArrayData[i][j] = input[i][j]
          }
        }
      }
      if (output) {
        this.outputArrayData = []
        for (let i = 0; i < output.length; i++) {
          this.outputArrayData[i] = []
          for (let j = 0; j < output[i].length; j++) {
            this.outputArrayData[i][j] = output[i][j]
          }
        }
      }
      // 机器人数据解析
      if (robot) {
        const pj_PhysicalJoints = robot.PhysicalJoints
        if (pj_PhysicalJoints) {
          if (pj_PhysicalJoints.value.length !== 6) {
            const value_tem = JSON.parse(pj_PhysicalJoints.value)
            this.robotInfo[0] = value_tem[0] + ' 度'
            this.robotInfo[1] = value_tem[1] + ' 度'
            this.robotInfo[2] = value_tem[2] + ' 度'
            this.robotInfo[3] = value_tem[3] + ' 度'
            this.robotInfo[4] = value_tem[4] + ' 度'
            this.robotInfo[5] = value_tem[5] + ' 度'
          }
        }
        if (robot.SpeedRatio) {
          this.robotInfo[6] = robot.SpeedRatio.value + ' %'
        }
        if (robot.OperationMode) {
          this.robotInfo[7] = robot.OperationMode.value
        }
        if (robot.CtrlState) {
          this.robotInfo[8] = robot.CtrlState.value
        }
        if (robot.ErrorState) {
          this.robotInfo[9] = robot.ErrorState.value
        }
      }*/
    },
    sparkGray(index) {
      return 'sparkGray' + index
    }
  }
}
</script>

<style lang="scss" scoped>
  .text{
    text-align: center;
  }
  .h-auto{
    height: auto;
  }
  .el-card__body{
    display: flex;
    align-items: center;
  }
  .alignCenter{
    display: flex;
    justify-content:center;
    /deep/ .el-select{
      margin: 4px;
     }
  }
  .h-num-l{
    height: 88vh;
    /deep/ .el-select{
     width:140px
    }
  }
  .h-auto,.h-num-l{
    img {
      width: 70%;
      margin: 0 auto;
      display: block;
    }
    /deep/ .el-card__header{
      border-bottom:none;
    }
  }
  .h-auto{
    /deep/ .el-select{
     width:100px;
    }
  }
  .sparkGreen,.sparkGray{
    width: 18px;
    height: 18px;
    background: #54d51c;
    display: inline-block;
    border-radius: 20px;
  }
  .sparkGray{
    background: #898989;
  }
  .alignLeft{
    text-align: left;
  }
  .pb-10{
    padding-bottom: 10px;
  }
</style>
