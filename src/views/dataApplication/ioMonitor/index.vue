<template>
  <!-- io监控 -->
  <div class="p-10">
    <el-row>
      <el-col :span="16">
        <div>
          <el-select v-model="singleframeValue" size="small" placeholder="请选择" @change="onChangeProductLine">
            <el-option v-for="item in singleframeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8" class="text-r">
        <el-button type="primary" round size="small" @click="toIoPage">查看时序</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border stripe style="width:100%;" class="mt-10">
      <el-table-column label="序号" width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态名称" align="center">
        <template slot-scope="scope">
          <el-button :type="scope.row.enable ? 'success': 'info'" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="信号详细信息" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { resolveRepositoryData } from '@/utils/resolutIo.js'
import mqtt from 'mqtt'

export default {
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
      // *** 原始代码 *****
      singleframeValue: '1#',
      singleframeList: [{ value: '1#', label: '单柜1' }],
      tableData: [
        { enable: false, byte: 0, bit: 0, number: 'D700.0', desc: '自动输入' },
        { enable: false, byte: 0, bit: 1, number: 'D700.1', desc: '自动运行中' },
        { enable: false, byte: 0, bit: 2, number: 'D700.2', desc: '手动输入' },
        { enable: false, byte: 0, bit: 3, number: 'D700.3', desc: '手动运行中' },
        { enable: false, byte: 0, bit: 4, number: 'D700.4', desc: '示教输入' },
        { enable: false, byte: 0, bit: 5, number: 'D700.5', desc: '示教运行中' },
        { enable: false, byte: 0, bit: 6, number: 'D700.6', desc: '检修输入' },
        { enable: false, byte: 0, bit: 7, number: 'D700.7', desc: '检修运行中' },
        { enable: false, byte: 1, bit: 0, number: 'D700.8', desc: '本地急停输入' },
        { enable: false, byte: 1, bit: 1, number: 'D700.9', desc: '本地急停运行中' },

        { enable: false, byte: 2, bit: 0, number: 'D701.0', desc: '允许上料' },
        { enable: false, byte: 2, bit: 1, number: 'D701.1', desc: '上料输入' },
        { enable: false, byte: 2, bit: 2, number: 'D701.2', desc: '上料完成' },
        { enable: false, byte: 2, bit: 3, number: 'D701.3', desc: '工位1' },
        { enable: false, byte: 2, bit: 4, number: 'D701.4', desc: '工位2' },
        { enable: false, byte: 2, bit: 5, number: 'D701.5', desc: '工位限位信号' },
        { enable: false, byte: 2, bit: 6, number: 'D701.6', desc: '大转门高速转动中' },
        { enable: false, byte: 2, bit: 7, number: 'D701.7', desc: '大转门低速转动中' },
        { enable: false, byte: 3, bit: 0, number: 'D701.8', desc: '工位1转动中' },
        { enable: false, byte: 3, bit: 1, number: 'D701.9', desc: '工位2转动中' },

        { enable: false, byte: 4, bit: 0, number: 'D702.0', desc: '机器人暂停运行' },
        { enable: false, byte: 4, bit: 1, number: 'D702.1', desc: '机器人运行' },
        { enable: false, byte: 4, bit: 2, number: 'D702.2', desc: '机器人开始喷釉' },
        { enable: false, byte: 4, bit: 3, number: 'D702.3', desc: '机器人在原点输入' },
        { enable: false, byte: 4, bit: 4, number: 'D702.4', desc: '机器人工位旋转' },
        { enable: false, byte: 4, bit: 5, number: 'D702.5', desc: '机器人清洗喷枪' },
        { enable: false, byte: 4, bit: 6, number: 'D702.6', desc: '机器人喷釉完成' },
        { enable: false, byte: 4, bit: 7, number: 'D702.7', desc: '机器人喷枪1' },
        { enable: false, byte: 5, bit: 0, number: 'D702.8', desc: '机器人喷枪2' },
        { enable: false, byte: 5, bit: 1, number: 'D702.9', desc: '强制机器人在原点输入' },
        { enable: false, byte: 5, bit: 1, number: 'D702.A', desc: '机器人在原点中' },

        { enable: false, byte: 6, bit: 0, number: 'D703.0', desc: '釉料阀开启' },
        { enable: false, byte: 6, bit: 1, number: 'D703.1', desc: '雾化1开启' },
        { enable: false, byte: 6, bit: 2, number: 'D703.2', desc: '扇形1开启' },
        { enable: false, byte: 6, bit: 3, number: 'D703.3', desc: '喷枪1开启' },
        { enable: false, byte: 6, bit: 4, number: 'D703.4', desc: '雾化2开启' },
        { enable: false, byte: 6, bit: 5, number: 'D703.5', desc: '扇形2开启' },
        { enable: false, byte: 6, bit: 6, number: 'D703.6', desc: '喷枪2开启' },
        { enable: false, byte: 6, bit: 7, number: 'D703.7', desc: '喷枪清洗气路' },
        { enable: false, byte: 7, bit: 0, number: 'D703.8', desc: '喷枪清洗水路' }
      ]
      // *** 原始代码 *****
    }
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
    // this.openWebSocket()
  },
  beforeDestroy() {
    // this.closeWebSocket()
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
      // const that = this
      this.client.on('message', function (topic, message) {
        // console.log('订阅的消息:' + topic + ',' + message.toString()) // 打印消息内容
        try {
          // that.initData(JSON.parse(message.toString()))
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
    // 切换产线
    onChangeProductLine() {
    }
    /* // ***** 原始代码 *********************************************************
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
        // 获取io数据
        const ioStr = JSON.parse(this.singleframeData[`${this.singleframeValue}`]).MelsecPLC.IO
        const ioData = resolveRepositoryData(ioStr)
        this.tableData.forEach(item => {
          item.enable = ioData[item.byte][item.bit]
        })
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
        path: '/dataApplication/ioMonitor/index'
      })
    }
    // ***** 原始代码 **********************************************************/
  }
}
</script>

<style lang="scss" scoped>
</style>
