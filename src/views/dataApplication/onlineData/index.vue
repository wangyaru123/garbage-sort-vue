<template>
  <!-- 数据应用首页 -->
  <div :class="isMobile?'p-5':'p-10'">
    <el-row :gutter="5">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card :class="isMobile?'h-auto':'h-num-l'">
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
        <el-card :class="isMobile?'h-auto':'h-num-r mt-5 pb-10'">
          <div slot="header" class="clearfix">
            <div>机器人</div>
          </div>
          <div class="text item m-10">
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">关节1坐标：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[0]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">关节2坐标：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[1]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">关节3坐标：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[2]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">关节4坐标：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[3]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">关节5坐标：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[4]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">关节6坐标：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[5]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">速度百分比：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[6]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-col :span="12" class="text-r">操作模式：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[7]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10 mb-10">
              <el-col :span="12" class="text-r">当前状态：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[8]}}</el-col>
            </el-col>
            <el-col :span="12" class="mt-10 mb-10">
              <el-col :span="12" class="text-r">错误状态：</el-col>
              <el-col :span="12" class="alignLeft">{{robotInfo[9]}}</el-col>
            </el-col>
          </div>
        </el-card>
        <!--其他-->
        <el-card :class="isMobile?'h-auto':'h-num-r mt-5'">
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
      robotInfo: ['', '', '', '', '', '', '', '', ''],
      inputArrayData: [['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']],
      outputArrayData: [['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']],
      // mqtt
      client: '',
      addr: 'ws://47.92.5.140:8083/mqtt',
      theme: 'xxy',
      options: {
        connectTimeout: 40000,
        clientId: '35e1acdbc2664baca8da1701eac58874',
        username: 'xxy',
        password: '123456',
        clean: true
      }
    }
  },
  created() {
    // this.openWebSocket()
  },
  mounted: function() {
    this.mqttConnect()
  },
  beforeDestroy() {
    // this.closeWebSocket()
    this.client.end()
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
            console.log('订阅成功')
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
    // WebSocket
    openWebSocket() {
      // 建立连接对象
      const socket = new this.$sockjs(process.env.VUE_APP_WS_DATABOX)
      // 获取STOMP子协议的客户端对象
      this.stompClient = this.$stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = {
        Authorization: this.$store.getters.authorization
      }
      this.stompClient.connect(headers, () => {
        // console.log(`开启websocket并已连接，服务器地址：${process.env.VUE_APP_WS_DATABOX}，订阅的主题为：${process.env.VUE_APP_TOPIC_PER_DATABOX}`)
        this.stompClient.subscribe(process.env.VUE_APP_TOPIC_PER_DATABOX, msg => {
          this.initData(JSON.parse(msg.body))
        })
      }, error => {
        console.log('fail : ' + error)
      })
    },
    initData(data) {
      const input = data.Input
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
        const robot_tem = []
        for (let i = 0; i < robot.length; i++) {
          if (robot[i].key === 'PhysicalJoints') {
            if (robot[i].value.length !== 6) {
              const value_tem = JSON.parse(robot[i].value)
              robot_tem[0] = value_tem[0] + ' 度'
              robot_tem[1] = value_tem[1] + ' 度'
              robot_tem[2] = value_tem[2] + ' 度'
              robot_tem[3] = value_tem[3] + ' 度'
              robot_tem[4] = value_tem[4] + ' 度'
              robot_tem[5] = value_tem[5] + ' 度'
            }
          }
          if (robot[i].key === 'SpeedRatio') {
            robot_tem[6] = robot[i].value + ' %'
          }
          if (robot[i].key === 'OperationMode') {
            robot_tem[7] = robot[i].value
          }
          if (robot[i].key === 'CtrlState') {
            robot_tem[8] = robot[i].value
          }
          if (robot[i].key === 'ErrorState') {
            robot_tem[9] = robot[i].value
          }
        }
        if (robot_tem !== []) {
          this.robotInfo = robot_tem
        }
      }
    },
    closeWebSocket() {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('关闭websocket')
      }
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
  .h-num-l{
    height: 88vh;
    display: flex;
    align-items: center;
  }
  .h-auto,.h-num-l{
    img {
      width: 70%;
      margin: 0 auto;
      display: block;
    }
  }
  .sparkGreen,.sparkGray{
    width: 15px;
    height: 15px;
    background: #54d51c;
    display: inline-block;
    border-radius: 20px;
    margin-top: 2px;
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
