<template>
  <!-- 设备详情 -->
  <div class="p-10">
    <el-card>
      <div slot="header" class="clearfix">
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
            <el-tag>{{ detileData.deviceStatus}}</el-tag>
          </el-col>
          <el-col :span="4" class="mt-10">备注:{{ detileData.description}}</el-col>
        </el-row>
        <el-tabs v-model="activeTab" type="card" @tab-click="tabClick" class="mt-10">
          <el-tab-pane label="设备数据" name="deviceData">设备数据</el-tab-pane>
          <el-tab-pane label="预警记录" name="alarmRecord">
            <alarm-record></alarm-record>
          </el-tab-pane>
          <el-tab-pane label="故障记录" name="errorRecord">
            <error-record></error-record>
          </el-tab-pane>
          <el-tab-pane label="设备参数" name="deviceParams">
            <device-params></device-params>
          </el-tab-pane>
          <el-tab-pane label="运行日志" name="runLog">
            <run-log></run-log>
          </el-tab-pane>
          <el-tab-pane label="操作记录" name="editRecord">操作记录</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMachineById } from '@/api/deviceCenter/info.js'
import { setRestart } from '@/api/deviceCenter/detile.js'
import alarmRecord from './component/detile/alarmRecord'
import errorRecord from './component/detile/errorRecord'
import deviceParams from './component/detile/deviceParams'
import runLog from './component/detile/runLog'
import mqtt from 'mqtt'

export default {
  components: {
    alarmRecord,
    errorRecord,
    deviceParams,
    runLog
  },
  data() {
    return {
      // 查询条件
      id: '',
      detileData: { machineSerialNum: '', name: '', longitude: '', latitude: '', deployTime: '', item: '', onlineStatus: '', deviceStatus: '', description: '' },
      activeTab: 'deviceData',
      // table所有数据
      errorTableData: [
        { errorCode: '01', suggest: '201910001', errorTime: '2019-12-12' },
        { errorCode: '02', suggest: '201910100', errorTime: '2019-12-12' }
      ],
      // 项目列表
      itemList: [],
      // 查询条件
      serachParams: { id: '' },
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
      deviceId: ''
    }
  },
  mounted: function () {
    this.deviceId = this.$route.query.id
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
        console.log(this.detileData)
      }).catch(err => this.$message.error(err.toString()))
    },
    issue() {
      const params = {
        machNo: 'U010519060000'
      }
      setRestart(params).then(res => {
        this.$message.success('重启成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    tabClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
.baseInfoRow {
  // background-color: #d2edc4;
}
</style>
