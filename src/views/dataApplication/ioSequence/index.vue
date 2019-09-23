<template>
  <div :class="isMobile?'':'m-10'">
    <!--<el-row :class="isMobile?'m-5':'mb-10'">
      <el-select v-model="singleframeValue" size="small" placeholder="请选择" @change="singleframeChange">
        <el-option v-for="item in singleframeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span v-if="!isActive" type="danger" size="mini" class="float-r btn-style">离线</span>
    </el-row>-->
    <io-sequence-chart ref="ioSequenceChart"></io-sequence-chart>
  </div>
</template>

<script>
// import { resolveIoStringData } from '@/api/common.js'
// import { getSingleBoxConfigioMointorData } from '@/api/configuration.js'
import ioSequenceChart from './components/ioSequenceChart'
import mqtt from 'mqtt'

export default {
  components: {
    ioSequenceChart
  },
  data() {
    return {
      // *** mqtt ***
      mqttConf: {
        client: '',
        addr: 'ws://153.37.213.2:8083/mqtt', // 'ws://47.92.5.140:8083/mqtt
        theme: 'web-SZ-2019001:DV-2019001',
        options: {
          connectTimeout: 40000,
          clientId: '35e1acdbc2664baca8da1701eac58875',
          username: 'admin',
          password: 'public',
          clean: true
        }
      },
      // 是否在线
      isActive: true,
      // 单柜选择框默认值
      singleframeValue: '1#',
      // 单柜选择框列表
      singleframeList: [{ value: '1#', label: '单柜1' }],
      tableData: []
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
    // this.getIoParam()
    // this.openWebSocket()
  },
  mounted() {
    this.mqttOperate()
    this.$refs.ioSequenceChart.resetChart(['库位1', '库位2', '库位3', '库位4', '库位5', '库位6', '毛坯工件', '半成品工件', '成品工件', '检测到卡', '相机联机', '红色工件', '黄色工件', '蓝色工件'])
  },
  beforeDestroy() {
    // this.closeWebSocket()
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
      // IO 解析
      const plc_switch = []
      let plc = ''
      for (const key in data) {
        if (key === 'PLC-01') {
          plc = data[key]
        }
      }
      if (plc !== '') {
        const db = plc.DB201
        if (db) {
          plc_switch[0] = parseInt(db.value.charAt(2))
          plc_switch[1] = parseInt(db.value.charAt(3))
          plc_switch[2] = parseInt(db.value.charAt(4))
          plc_switch[3] = parseInt(db.value.charAt(5))
          plc_switch[4] = parseInt(db.value.charAt(6))
          plc_switch[5] = parseInt(db.value.charAt(7))
          plc_switch[6] = parseInt(db.value.charAt(8))
          plc_switch[7] = parseInt(db.value.charAt(9))
          plc_switch[8] = parseInt(db.value.charAt(13))
          plc_switch[9] = parseInt(db.value.charAt(14))
          plc_switch[10] = parseInt(db.value.charAt(15))
          plc_switch[11] = parseInt(db.value.charAt(16))
          plc_switch[12] = parseInt(db.value.charAt(17))
          plc_switch[13] = parseInt(db.value.charAt(18))
        }
        if (plc_switch.length > 0) {
          this.$refs.ioSequenceChart.updateData(plc_switch)
        }
      }
    }
    /* // 初始化IO的数据
    getIoParam() {
      getSingleBoxConfigioMointorData()
        .then(res => {
          this.tableData = res
          const titles = this.tableData.map(item => item.desc)
          this.$refs.ioSequenceChart.resetChart(titles)
        })
        .catch(err => { this.$message.error(err) })
    },

    // 切换单柜
    singleframeChange() {
      this.getIoParam()
    },
    //  初始化weosocket
    openWebSocket() {
      // websocket服务器地址
      const url = process.env.VUE_APP_WS_SINGLEFRAME
      // 建立连接对象
      const socket = new this.$sockjs(url)
      // 获取STOMP子协议的客户端对象
      this.stompClient = this.$stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = { Authorization: '' }
      this.stompClient.connect(headers, () => {
        console.log(`开启websocket并已连接，服务器地址：${url}，订阅的主题为：${process.env.VUE_APP_WS_SINGLEFRAME}`)
        this.subscribeData()
      }, error => console.log('fail' + error))
    },
    subscribeData() {
      this.stompClient.subscribe(process.env.VUE_APP_TOPIC_PER_SINGLEFRAME, msg => {
        this.singleframeData = JSON.parse(msg.body)
        // 获取数据长度
        const stateDataLength = Object.keys(this.singleframeData).length
        // 清空单柜列表
        this.singleframeList = []
        // 处理单柜列表
        for (let i = 0; i < stateDataLength; i++) {
          this.singleframeList.push({ value: `${i + 1}#`, label: `单柜${i + 1}` })
        }
        const srcData = JSON.parse(this.singleframeData[`${this.singleframeValue}`])
        this.isActive = srcData['__isActive']
        // 获取io数据
        const ioStr = srcData.MelsecPLC.IO
        // 转化io数据
        const ioData = resolveIoStringData(ioStr)
        // console.log(ioData)
        this.tableData.forEach(item => {
          item.enable = ioData[item.byte][item.bit]
        })
        this.updateChart()
      })
    },
    //  主动关闭websocket
    closeWebSocket() {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('关闭websocket')
      }
    },
    async updateChart() {
      const ioData = this.tableData.map(item => item.enable ? 1 : 0)
      this.$refs.ioSequenceChart.updateData(ioData)
    }*/
  }
}
</script>

<style lang='scss' scoped>
.btn-style {
  width: 60px;
  height: 32px;
  color: white;
  line-height: 32px;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  background: #f56c6c;
}
</style>
