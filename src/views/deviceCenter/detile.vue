<template>
  <!-- 设备详情 -->
  <div class="p-10">
    <el-card class="p-0">
      <div slot="header" class="clearfix">
        <el-button size="small" circle @click="back" icon="iconfont icon-back"></el-button>
        <span>设备详情</span>
        <el-button style="float: right;" type="primary" size="small" @click="issue">重启</el-button>
      </div>
      <div>
        <el-row :gutter="10" class="baseInfoRow">
          <el-col :span="4" class="mt-10">序列号:{{ detileData.machineSerialNum}}</el-col>
          <el-col :span="4" class="mt-10">设备名称:{{ detileData.name}}</el-col>
          <el-col :span="4" class="mt-10">经度:{{ detileData.longitude}}</el-col>
          <el-col :span="4" class="mt-10">纬度:{{ detileData.latitude}}</el-col>
          <el-col :span="8" class="mt-10">安装时间:{{ detileData.deployTime}}</el-col>
          <el-col :span="4" class="mt-10">所属项目:{{ detileData.item}}</el-col>
          <el-col :span="4" class="mt-10">
            在线状态:
            <el-tag :type="detileData.onlineStatus?'success':'danger'">{{ detileData.onlineStatus?'在线':'离线'}}</el-tag>
          </el-col>
          <el-col :span="4" class="mt-10">
            设备状态:
            <el-tag :type="detileData.deviceStatus?'danger':'success'">{{ detileData.deviceStatus?'故障':'正常'}}</el-tag>
          </el-col>
          <el-col :span="4" class="mt-10">备注:{{ detileData.description}}</el-col>
        </el-row>
        <el-tabs v-model="activeTab" type="card" @tab-click="tabClick" class="mt-10 the-tab">
          <el-tab-pane label="设备数据" name="deviceData">
            <device-data ref="deviceData" :machNo="machNo"></device-data>
          </el-tab-pane>
          <el-tab-pane label="预警记录" name="alarmRecord">
            <alarm-record ref="alarmRecord" :machNo="machNo"></alarm-record>
          </el-tab-pane>
          <el-tab-pane label="故障记录" name="errorRecord">
            <error-record ref="errorRecord" :machNo="machNo"></error-record>
          </el-tab-pane>
          <el-tab-pane label="设备参数" name="deviceParams">
            <device-params ref="deviceParams" :machNo="machNo"></device-params>
          </el-tab-pane>
          <el-tab-pane label="运行日志" name="runLog">
            <run-log ref="runLog" :machNo="machNo"></run-log>
          </el-tab-pane>
          <el-tab-pane label="操作记录" name="operationLogs">
            <operation-logs ref="operationLogs" :machNo="machNo"></operation-logs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMachineById } from '@/api/deviceCenter/info.js'
import { setRestart } from '@/api/deviceCenter/detile.js'
import deviceData from './component/detile/deviceData'
import alarmRecord from './component/detile/alarmRecord'
import errorRecord from './component/detile/errorRecord'
import deviceParams from './component/detile/deviceParams'
import runLog from './component/detile/runLog'
import operationLogs from './component/detile/operationLogs'
import mqtt from 'mqtt'

export default {
  components: {
    deviceData,
    alarmRecord,
    errorRecord,
    deviceParams,
    runLog,
    operationLogs
  },
  data() {
    return {
      // 查询条件
      id: '',
      detileData: { machineSerialNum: '', name: '', longitude: '', latitude: '', deployTime: '', item: '', onlineStatus: '', deviceStatus: '', description: '' },
      activeTab: 'deviceData',
      // 项目列表
      itemList: [],
      // 编辑弹框显示
      dialogVisible: false,
      // 弹框数据
      dialogData: {},
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      // *** mqtt ***
      mqttConf: {
        client: '',
        addr: 'ws://47.99.219.161:8083/mqtt',
        theme: 'devicetoserver',
        options: {
          port: 8083,
          connectTimeout: 40000,
          clientId: '35e1acdbc2664baca8da1701eac58874',
          username: 'admin',
          password: 'public',
          clean: true
        }
      },
      mqttData: {},
      deviceId: '',
      machNo: ''
    }
  },
  mounted: function () {
    this.deviceId = this.$route.query.id
    this.machNo = this.$route.query.machNo
    this.getMachineById()
    this.mqttOperate() // 初始设备
  },
  created() {
    // this.getAllItem()
  },
  beforeDestroy() {
    this.mqttConf.client.end() // 关闭订阅
  },
  methods: {
    mqttOperate() { // mqtt
      // 连接mqtt
      console.log(this.mqttConf.addr)
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
        console.log(JSON.parse(message.toString()))
        try {
          const mqttData = JSON.parse(message.toString())
          console.log(mqttData)
          if (mqttData.cmd === 3131 && mqttData.data.state === 1) {
            console.log('-------')
            that.detileData.deviceStatus = true
            Object.assign({}, that.detileData, { deviceStatus: true })
            that.$set(that.detileData, 'deviceStatus', true)
            console.log(that.detileData)
          }
        } catch (e) {
        }
      })
      // 断开发起重连
      this.mqttConf.client.on('reconnect', (error) => {
        that.detileData.onlineStatus = false
        console.log(error)
      })
      // 链接异常处理
      this.mqttConf.client.on('error', (error) => {
        console.log('xxy 连接失败:', error)
      })
    },
    // 根据id查询设备信息
    getMachineById() {
      getMachineById(this.deviceId).then(res => {
        this.detileData = res
        this.detileData.onlineStatus = false
        this.detileData.deviceStatus = false
        this.$refs.deviceData.$emit('getWeightcount')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 重启
    issue() {
      const params = {
        machNo: this.machNo
      }
      setRestart(params).then(res => {
        this.$message.success('重启成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    tabClick(e) {
      if (e.name === 'deviceData') {
        this.$refs.deviceData.$emit('getWeightcount')
      } else if (e.name === 'alarmRecord') {
        this.$refs.alarmRecord.$emit('getWarns')
      } else if (e.name === 'errorRecord') {
        this.$refs.errorRecord.$emit('getFaults')
      } else if (e.name === 'deviceParams') {
        this.$refs.deviceParams.$emit('getDeviceParams')
      } else if (e.name === 'runLog') {
        this.$refs.runLog.$emit('getRunlogs')
      } else if (e.name === 'operationLogs') {
        this.$refs.operationLogs.$emit('getOperationlogs')
      }
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.p-0 /deep/ .el-card__body {
  padding: 0;
}
.baseInfoRow {
  padding: 10px;
}
.the-tab /deep/ .el-tab-pane {
  padding: 10px;
}
</style>
