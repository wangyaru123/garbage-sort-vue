<template>
  <!-- 数据应用首页 -->
  <div :class="isMobile?'p-5':'p-10'">
    <el-row :gutter="5">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card :class="isMobile?'h-auto':'h-num-l'">
          <img src="@/assets/machine.png" class="sidebar-logo">
        </el-card>
        </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card :class="isMobile?'h-auto':'h-num-r'">
          <div slot="header" class="clearfix">
            <div>开关量</div>
          </div>
          <!--<div v-for="o in inputInfo" :key="o" class="text item m-10">
            {{o}}
          </div>-->
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="text item m-10">
                input[0][0] : {{inputArrayData[0][0]}}
              </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="text item m-10">
            input[1][0] :  {{inputArrayData[1][0]}}
          </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="text item m-10">
            input[2][0] :  {{inputArrayData[2][0]}}
          </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="text item m-10">
            input[3][0] :  {{inputArrayData[3][0]}}
          </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="text item m-10">
            output[0][0] :  {{outputArrayData[0][0]}}
          </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="text item m-10">
            output[1][0] : {{outputArrayData[1][0]}}
          </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="text item m-10">
            output[2][0] : {{outputArrayData[2][0]}}
          </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="text item m-10">
            output[3][0] : {{outputArrayData[3][0]}}
          </div>
          </el-col>
        </el-card>
        <el-card :class="isMobile?'h-auto':'h-num-r mt-5'">
          <div slot="header" class="clearfix">
            <div>机器人</div>
          </div>
          <div v-for="o in robotInfo" :key="o" class="text item m-10">
            {{o}}
          </div>
        </el-card>
        <el-card :class="isMobile?'h-auto':'h-num-r mt-5'">
          <div slot="header" class="clearfix">
            <div>其他</div>
          </div>
          <div v-for="o in robotInfo" :key="o" class="text item m-10">
            {{o}}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

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
      tableData: [],
      websocket: '',
      inputData: {},
      outputData: {},
      robotData: {},
      inputInfo: [],
      outputInfo: [],
      robotInfo: [],
      inputArrayData: [],
      outputArrayData: []
    }
  },
  created() {
    this.openWebSocket()
  },
  mounted: function() {
  },
  beforeDestroy() {
    this.closeWebSocket()
  },
  methods: {
    openWebSocket() {
      // 建立连接对象
      const socket = new this.$sockjs(process.env.VUE_APP_WS_MN)
      // 获取STOMP子协议的客户端对象
      this.stompClient = this.$stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = {
        Authorization: this.$store.getters.authorization
      }
      this.stompClient.connect(headers, () => {
        console.log(`开启websocket并已连接，服务器地址：${process.env.VUE_APP_WS_MN}，订阅的主题为：${process.env.VUE_APP_TOPIC_PER_MN}`)
        this.stompClient.subscribe(process.env.VUE_APP_TOPIC_PER_MN, msg => {
          // console.log(JSON.parse(msg.body))
          // this.tableData = JSON.parse(msg.body)
          this.initdata(JSON.parse(msg.body))
        })
      }, error => {
        console.log('fail : ' + error)
      })
    },
    initdata(data) {
      // let tem = "{\"Input\":[\"00001001\",\"00001100\",\"01011100\",\"00000000\"],\"Output\":[\"00000000\",\"10000000\",\"00000000\",\"00000000\"],\"sensorData\":[{\"description\":\"条形码\",\"key\":\"ScannerSensor\",\"moduleId\":1,\"unit\":\"\",\"value\":\"1020010\"},{\"description\":\"温度\",\"key\":\"Temperature\",\"moduleId\":1,\"unit\":\"摄氏度\",\"value\":\"37\"},{\"description\":\"压力\",\"key\":\"Pressure\",\"moduleId\":1,\"unit\":\"\",\"value\":\"1020010\"},{\"description\":\"机器人温度\",\"key\":\"Robot-Joint\",\"moduleId\":1,\"unit\":\"度\",\"value\":\"10,20,10,30,22,23\"},{\"description\":\"机器人速度\",\"key\":\"Robot-speed\",\"moduleId\":1,\"unit\":\"\",\"value\":\"10\"},{\"description\":\"机器人模式\",\"key\":\"Robot-mode\",\"moduleId\":1,\"unit\":\"\",\"value\":\"自动/手动\"},{\"description\":\"机器人报警\",\"key\":\"Robot-alarm\",\"moduleId\":1,\"unit\":\"\",\"value\":\"无\"}]}";
      // let t = tem.substr(1,tem.length-1);
      // let d = JSON.parse(tem);
      const input = data.Input
      const output = data.Output
      const robot = data.sensorData
      // this.inputInfo = [] ;
      // this.outputInfo = [];
      this.robotInfo = []
      // input[][]解析
      // let str_input = '{';
      // eslint-disable-next-line no-array-constructor
      this.inputArrayData = new Array()
      for (let i = 0; i < input.length; i++) {
        // eslint-disable-next-line no-array-constructor
        this.inputArrayData[i] = new Array()
        for (let j = 0; j < input[i].length; j++) {
          // let name = '\"input_' + i + '' + j + '\":' + input[i][j] + ',';
          // str_input = str_input + name;
          // this.inputInfo.push(name);
          this.inputArrayData[i][j] = input[i][j]
        }
      }
      // this.inputData = JSON.parse(str_input.substr(0, str_input.length - 1) + '}');
      // output[][]解析
      // let str_output = '{';
      // eslint-disable-next-line no-array-constructor
      this.outputArrayData = new Array()
      for (let i = 0; i < output.length; i++) {
        // eslint-disable-next-line no-array-constructor
        this.outputArrayData[i] = new Array()
        for (let j = 0; j < output[i].length; j++) {
          // let name = '\"output[' + i + '][' + j + ']\":' + output[i][j] + ',';
          // str_output = str_output + name;
          // this.outputInfo.push(name);
          this.outputArrayData[i][j] = output[i][j]
        }
      }
      // this.outputData = JSON.parse(str_output.substr(0, str_output.length - 1) + '}');
      // 机器人数据解析
      let str_robot = '{'
      for (let i = 0; i < robot.length; i++) {
        const name = '\"' + robot[i].description + '\":\"' + robot[i].value + ' ' + robot[i].unit + '\",'
        str_robot = str_robot + name
        this.robotInfo.push(name)
      }
      this.robotData = JSON.parse(str_robot.substr(0, str_robot.length - 1) + '}')
    },
    closeWebSocket() {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('关闭websocket')
      }
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
</style>
