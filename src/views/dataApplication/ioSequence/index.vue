<template>
  <div :class="isMobile?'':'m-10'">
    <el-row :class="isMobile?'m-5':'mb-10'">
      <el-select v-model="singleframeValue" size="small" placeholder="请选择" @change="singleframeChange">
        <el-option v-for="item in singleframeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span v-if="!isActive" type="danger" size="mini" class="float-r btn-style">离线</span>
    </el-row>
    <io-sequence-chart ref="ioSequenceChart"></io-sequence-chart>
  </div>
</template>

<script>
import { resolveIoStringData } from '@/api/common.js'
import { getSingleBoxConfigioMointorData } from '@/api/configuration.js'
import ioSequenceChart from './components/ioSequenceChart'

export default {
  components: {
    ioSequenceChart
  },
  data() {
    return {
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
    this.getIoParam()
    this.openWebSocket()
  },
  beforeDestroy() {
    this.closeWebSocket()
  },
  methods: {
    // 初始化IO的数据
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
    }
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
