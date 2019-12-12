<template>
  <!-- 设备详情 -->
  <div class="p-10">
    <el-card>
      <div slot="header" class="clearfix">
        <span>设备详情</span>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="4" class="mt-10">序列号:{{ detileData.machineSerialNum}}</el-col>
          <el-col :span="4" class="mt-10">设备名称:{{ detileData.name}}</el-col>
          <el-col :span="4" class="mt-10">经度:{{ detileData.longitude}}</el-col>
          <el-col :span="4" class="mt-10">纬度:{{ detileData.latitude}}</el-col>
          <el-col :span="4" class="mt-10">安装时间:{{ detileData.deployTime}}</el-col>
          <el-col :span="4" class="mt-10">所属项目:{{ detileData.item}}</el-col>
          <el-col :span="4" class="mt-10">
            在线状态:
            <el-tag :type="detileData.status?'':'danger'">{{ detileData.status?'在线':'离线'}}</el-tag>
          </el-col>
          <el-col :span="4" class="mt-10">
            设备状态:
            <el-tag :type="detileData.isAlarm?'':'danger'">{{ detileData.isAlarm?'故障':'正常'}}</el-tag>
          </el-col>
          <el-col :span="4" class="mt-10">备注:{{ detileData.description}}</el-col>
        </el-row>
        <el-tabs v-model="activeTab" type="card" @tab-click="tabClick" class="mt-10">
          <el-tab-pane label="设备数据" name="deviceData">设备数据</el-tab-pane>
          <el-tab-pane label="预警记录" name="alarmRecord">预警记录</el-tab-pane>
          <el-tab-pane label="故障记录" name="errorRecord">
            <el-table :data="tableData" border stripe class="mt-10">
              <el-table-column label="序号" fixed width="50px" type="index" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="序列号" fixed align="center" min-width="130px">
                <template slot-scope="scope">
                  <span>{{ scope.row.machineSerialNum}}</span>
                </template>
              </el-table-column>
              <el-table-column label="故障代码" align="center" min-width="130px">
                <template slot-scope="scope">
                  <span>{{ scope.row.errorCode}}</span>
                </template>
              </el-table-column>
              <el-table-column label="建议处理方式" align="center" min-width="130px">
                <template slot-scope="scope">
                  <span>{{ scope.row.suggest}}</span>
                </template>
              </el-table-column>
              <el-table-column label="故障时间" align="center" min-width="130px">
                <template slot-scope="scope">
                  <span>{{ scope.row.errorTime}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="mt-10 text-r"
              background
              @size-change="getErrorByPage"
              @current-change="getErrorByPage"
              :current-page.sync="errorCurrentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size.sync="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="errorTotal"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="设备参数" name="deviceParams">设备参数</el-tab-pane>
          <el-tab-pane label="运行日志" name="runLog">运行日志</el-tab-pane>
          <el-tab-pane label="操作记录" name="editRecord">操作记录</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMachineByPage, getMachineById, addMachine, editMachine, deleteMachine } from '@/api/deviceCenter/info.js'
import { getAllItem } from '@/api/sysCenter/item.js'
import mqtt from 'mqtt'

export default {
  data() {
    return {
      // 查询条件
      id: '',
      detileData: { machineSerialNum: '1', name: '设备1', longitude: '100', latitude: '108', deployTime: '2019-12-12', item: '项目1', status: true, isAlarm: true, description: '' },
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
      // 表格总数据条数
      errorTotal: 0,
      // 当前页
      errorCurrentPage: 1,
      // 一页显示多少条数据
      errorPageSize: 10,
      // 弹框数据
      dialogData: {},
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      // 验证规则
      rules: {
        machineSerialNum: [
          { required: true, message: '请输入序列号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择设备名称', trigger: 'blur' }
        ],
        deployAddress: [
          { required: true, message: '请输入安装地点', trigger: 'blur' }
        ]
      },
      // *** mqtt ***
      mqttConf: {
        client: '',
        addr: 'ws://47.99.219.161:8083/mqtt',
        theme: 'datatransmit',
        options: {
          port: 8083,
          connectTimeout: 40000,
          clientId: '35e1acdbc2664baca8da1701eac58874',
          username: 'admin',
          password: 'public',
          clean: true
        }
      },
      mqttData: {}
    }
  },
  mounted: function () {
    // this.mqttOperate() // 初始设备
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
        console.log('订阅的消息:' + message.toString()) // 打印消息内容
        try {
          that.mqttData = JSON.parse(message.toString())
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
    // 获取项目列表
    getAllItem() {
      getAllItem().then(res => {
        this.itemList = res
        // 默认选中第一项
        this.serachParams.id = res[0].id
        this.getMachineByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页
    getMachineByPage() {
      getMachineByPage(this.currentPage, this.pageSize, this.serachParams).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id查询设备信息
    getMachineById(id) {
      getMachineById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加设备
    addMachine() {
      addMachine(this.dialogData).then(res => {
        this.$message.success('添加成功')
        this.getMachineByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑设备
    editMachine() {
      editMachine(this.id, this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getMachineByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除设备
    deleteMachine(id) {
      deleteMachine(id).then(res => {
        this.$message.success('删除成功')
        this.getMachineByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加会员按钮
    addClick() {
      this.dialogVisible = true
      this.dialogAction = 'add'
      this.dialogData = { id: '', machineSerialNum: '', name: '', deployAddress: '', deployTime: '', description: '', latitude: '', longitude: '' }
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      // 验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogAction === 'add') this.addMachine()
          else this.editMachine()
          this.getMachineByPage()
          this.dialogData = {}
        } else {
          this.$message.error('填写错误，添加失败')
          return false
        }
      })
    },
    // 弹框的取消按钮
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    // 编辑
    editRow(id) {
      this.dialogVisible = true
      this.dialogAction = 'edit'
      this.editMachine(id)
      this.id = id
    },
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteMachine(id))
        .catch(() => this.$message.info('取消删除'))
    },
    tabClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
