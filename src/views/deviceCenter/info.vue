<template>
  <!-- 设备信息 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加设备</el-button>
    <span>请选择项目查看：</span>
    <el-select v-model="serachParams.id" placeholder="请选择" size="small" @change="getMachineByPage">
      <el-option value="0" label="请选择"></el-option>
      <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
    </el-select>
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
      <el-table-column label="设备名称" fixed align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装地点" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.deployAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column label="经度" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.longitude}}</span>
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.latitude}}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装时间" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.deployTime}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属项目" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{itemList.find(i=>i.id===scope.row.id).name}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="在线状态" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status?'':'danger'">{{ scope.row.status?'在线':'离线'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否报警" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isAlarm?'danger':'success'">{{ scope.row.isAlarm?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column label="传感器参数" align="center" min-width="100px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editRow( scope.row.deviceCode )">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="130px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.deviceCode )"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row.id )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getMachineByPage"
      @current-change="getMachineByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <span>{{mqttData}}</span>
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写会员信息">
      <el-form label-position="right" label-width="140px" :model="dialogData" :rules="rules" ref="ruleForm">
        <el-form-item label="序列号" prop="machineSerialNum">
          <el-input v-model="dialogData.machineSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="安装地点" prop="deployAddress">
          <el-input v-model="dialogData.deployAddress"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="dialogData.longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="dialogData.latitude"></el-input>
        </el-form-item>
        <el-form-item label="安装时间" prop="deployTime">
          <el-date-picker v-model="dialogData.deployTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
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
      // table所有数据
      tableData: [
        // { deviceName: '五分类智能垃圾箱', deviceCode: '201910001', address: '浙江杭州', id: 1, status: 1, isAlarm: 1 },
        // { deviceName: '七分类智能垃圾箱', deviceCode: '201910100', address: '安徽合肥', id: 2, status: 0, isAlarm: 0 }
      ],
      // 项目列表
      itemList: [],
      // 查询条件
      serachParams: { id: '' },
      // 编辑弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
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
    this.mqttOperate() // 初始设备
  },
  created() {
    this.getAllItem()
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
    openWebSocket() {
      // 建立连接对象
      const socket = new this.$sockjs(process.env.VUE_APP_WS)
      // 获取STOMP子协议的客户端对象
      this.stompClient = this.$stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = {
        Authorization: this.$store.getters.authorization
      }
      this.stompClient.connect(headers, () => {
        console.log(`开启websocket并已连接，服务器地址：${process.env.VUE_APP_TOPIC}/${this.$route.query.name}，订阅的主题为：${process.env.VUE_APP_TOPIC_BOX}`)
        this.stompClient.subscribe(`${process.env.VUE_APP_TOPIC}`, msg => {
          this.taskData = JSON.parse(msg.body)
        })
      }, error => {
        console.log('fail' + error)
      })
    },
    closeWebSocket() {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('关闭websocket')
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
