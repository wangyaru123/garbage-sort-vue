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
        <el-card :class="isMobile?'h-auto':'h-num-r'">
          <div slot="header" class="clearfix">
            <div>开关量</div>
          </div>
          <!--<div v-for="o in inputInfo" :key="o" class="text item m-10">
            {{o}}
          </div>-->
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              <span>
                库位1 :
              </span>
              <span v-if="inputArrayData[0][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              库位2 :
              <span v-if="inputArrayData[0][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              库位3 :
              <span v-if="inputArrayData[0][2]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              库位4 :
              <span v-if="inputArrayData[0][3]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              库位5 :
              <span v-if="inputArrayData[1][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              库位6 :
              <span v-if="inputArrayData[1][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              毛坯工件 :
              <span v-if="inputArrayData[1][2]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              半成品工件 :
              <span v-if="inputArrayData[1][3]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              成品工件 :
              <span v-if="inputArrayData[1][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              检测到卡 :
              <span v-if="inputArrayData[1][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              相机联机 :
              <span v-if="inputArrayData[1][2]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              红色工件 :
              <span v-if="inputArrayData[1][3]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              黄色工件 :
              <span v-if="inputArrayData[2][0]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="text item m-10">
              蓝色工件 :
              <span v-if="inputArrayData[2][1]==='0'?false:true" class="sparkGreen"></span>
              <span v-else class="sparkGray"></span>
            </div>
          </el-col>
        </el-card>
        <!--机器人-->
        <el-card :class="isMobile?'h-auto':'h-num-r mt-5'">
          <div slot="header" class="clearfix">
            <div>机器人</div>
          </div>
          <div class="text item m-10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>关节1坐标：</span><span>{{robotInfo[0]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>关节2坐标：</span><span>{{robotInfo[1]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>关节3坐标：</span><span>{{robotInfo[2]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>关节4坐标：</span><span>{{robotInfo[3]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>关节5坐标：</span><span>{{robotInfo[4]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>关节6坐标：</span><span>{{robotInfo[5]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>速度百分比：</span><span>{{robotInfo[6]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>操作模式：</span><span>{{robotInfo[7]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>当前状态：</span><span>{{robotInfo[8]}}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                <span>错误状态：</span><span>{{robotInfo[9]}}</span>
              </div>
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
      width: 75%;
      margin: 0 auto;
      display: block;
    }
  }
  .sparkGreen{
    width: 15px;
    height: 15px;
    background: #54d51c;
    display: block;
    border-radius: 20px;
    float: right;
    margin-right:10px;
    animation:myGreenLight 1s;
    animation-iteration-count: infinite;
  }
  .sparkGray{
    width: 15px;
    height: 15px;
    background: #898989;
    display: block;
    border-radius: 20px;
    float: right;
    margin-right:10px;
  }
  .liteStyle{
    text-align: right;
  }
</style>
