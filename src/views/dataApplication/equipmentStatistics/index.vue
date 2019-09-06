<template>
  <div class="p-10">
    <statisticsState></statisticsState>
  </div>
</template>

<script>
import statisticsState from './statisticsState'

export default {
  components: {
    statisticsState
  },
  data() {
    return {
    }
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
    this.openWebSocket()
  },
  beforeDestroy() {
    this.closeWebSocket()
  },
  methods: {
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
      this.$refs.robotState.clearChartData()
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
        // 获取plc数据
        this.plcData = JSON.parse(this.singleframeData[`${this.singleframeValue}`]).MelsecPLC
        // 获取机器人数据
        this.robotData = JSON.parse(this.singleframeData[`${this.singleframeValue}`]).Robot
        var time = this.$dayjs().format('HH:mm:ss')
        this.$refs.robotState.updateData(this.robotData, time)
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
        path: '/dataApplication/ioMonitor',
        query: { singleframeValue: this.singleframeValue }
      })
    },
    toAlarmPage() {
      this.$router.push({
        path: '/dataApplication/alarmInfo',
        query: { singleframeValue: this.singleframeValue }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card__header {
  padding: 10px 15px;
}
</style>
