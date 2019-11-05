<template>
  <!-- 设备管理表 -->
  <div :class="isMobile?'':'p-10'">
    <!-- 移动端 -->
    <div v-if="isMobile">
      <div class="fixed">
        <el-pagination
          id="mobile-pagination"
          background
          layout="prev, jumper, next, total"
          :page-size="10"
          :total="total"
          @size-change="fetchData"
          @current-change="fetchData"
          :current-page="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div>{{item.deviceCode}}</div>
            <div class="text-r">
              <el-tag :type="item.isBind?'':'danger'">{{ item.isBind?'已绑定':'未绑定'}}</el-tag>
            </div>
          </div>
          <div class="text item flexbox">
            <div style="width:100%">
              <div class="flexbox mt-5">
                位置号:
                <div>{{item.seat}}</div>
              </div>
              <div class="flexbox mt-5">
                类别:
                <div>{{item.type}}</div>
              </div>
              <div class="flexbox mt-5">
                学校:
                <div>{{item.schoolName}}</div>
              </div>
              <div class="flexbox mt-5">
                安装地点:
                <div>{{item.installLocation}}</div>
              </div>
              <div class="flexbox mt-5">
                安装时间:
                <div>{{item.installTime}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button type="primary" size="small" round @click="addRow" v-if="addAuth">添加设备</el-button>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-10">
          <el-table-column label="序号" fixed="left" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备编码" fixed="left" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.deviceCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="位置号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.seat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="类别" fixed="left" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学校" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.schoolName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="安装地点" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.installLocation}}</span>
            </template>
          </el-table-column>
          <el-table-column label="安装时间" width="180px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.installTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否绑定" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isBind?'':'danger'">{{ scope.row.isBind?'是':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="绑定" fixed="right" width="90px" align="center" v-if="updateAuth">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="binding( scope.row.deviceId )" v-if="!scope.row.isBind">绑定</el-button>
              <el-button type="danger" size="mini" @click="unbinding( scope.row.deviceId, scope.row.boxId )" v-else>解绑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150px" align="center" v-if="updateAuth || deleteAuth">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.deviceId )" v-if="updateAuth"></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteRow( scope.row.deviceId , scope.row.isBind )"
                v-if="deleteAuth"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="fetchData"
          @current-change="fetchData"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
    <!-- 编辑设备信息弹框 -->
    <el-dialog :visible.sync="editDialogVisible" title="请填写设备信息(*是必填项)" class="editDialog">
      <el-form label-position="right" label-width="120px" :model="dialogData" ref="ruleForm">
        <el-row>
          <el-form-item label="设备编码：" :rules="{ required: true, message: '请输入设备编码', trigger: 'blur' }">
            <el-input v-model="dialogData.deviceCode"></el-input>
          </el-form-item>
          <el-form-item label="位置号：">
            <el-input v-model="dialogData.seat"></el-input>
          </el-form-item>
          <el-form-item label="类别：">
            <el-select v-model="dialogData.type" placeholder="请选择" size="small">
              <el-option value="A" label="A"></el-option>
              <el-option value="B" label="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校：">
            <el-select v-model="dialogData.schoolId" placeholder="请选择" size="small" @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产时间：">
            <el-date-picker v-model="dialogData.productionTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="安装地点：">
            <el-input v-model="dialogData.installLocation"></el-input>
          </el-form-item>
          <el-form-item label="安装时间：">
            <el-date-picker v-model="dialogData.installTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-row>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="editSubmitClick">确定</el-button>
          <el-button type="info" size="medium" @click="editCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 绑定弹框 -->
    <el-dialog :visible.sync="bindingDialogVisible" title="请输入盒子编码进行搜索" class="bindingDialog">
      <el-form label-position="right" label-width="120px" :model="bindingdialogData" ref="ruleForm">
        <el-row>
          <el-form-item label="盒子编码：">
            <el-select
              v-model="boxValue"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getBoxesInfoById"
              :loading="loading"
            >
              <el-option v-for="item in boxList" :key="item.boxId" :label="item.boxCode" :value="item.boxId"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="bindSubmitClick">确定</el-button>
          <el-button type="info" size="medium" @click="bindCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceInfoByPage, getDeviceInfoById, editDeviceInfoById, addDeviceInfo, deleteDeviceInfoById, bindingData, unbindingData } from '@/api/deviceModule/index.js'
import { getBoxesInfoById } from '@/api/deviceModule/box.js'
import { getSchoolList } from '@/api/ucenter/school.js'
import { parseTime } from '@/utils/index'

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
    },
    // upload组件上传图片的Action路由地址
    uploadActionUrl() {
      return process.env.VUE_APP_HTTP_DEVICE + '/equipment/devices/_upload/' + this.deviceId
    },
    // 添加权限
    addAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('equipment_add')
    },
    // 修改权限
    updateAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('equipment_update')
    },
    // 删除权限
    deleteAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('equipment_delete')
    }
  },
  data() {
    return {
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 编辑报警信息弹框显示
      editDialogVisible: false,
      // 绑定弹框
      bindingDialogVisible: false,
      // 弹框回显报警信息数据
      dialogData: {},
      // 绑定弹框数据
      bindingdialogData: {},
      // 设置弹窗是添加还是编辑
      dialogAction: 'add',
      // 设备id
      deviceId: '',
      // 盒子id
      boxId: '',
      // 学校列表
      schoolList: [],
      // 输入框中设备编码值
      boxValue: '',
      // 盒子数据列表
      boxList: [],
      // 加载
      loading: false,
      // 是否绑定列表
      isBindList: [{ isBind: 0, desc: '未绑定' }, { isBind: 1, desc: '已绑定' }]
    }
  },
  created() {
    this.fetchData()
    // 获取学校列表
    this.getSchoolList()
  },
  methods: {
    // api
    // 获取学校列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取盒子列表
    getBoxesInfoById(query) {
      this.loading = true
      const params = { code: query }
      getBoxesInfoById(params).then(res => {
        this.loading = false
        this.boxList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据page,size获取当前表格数据
    fetchData() {
      getDeviceInfoByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id回显数据
    getDialogData(id) {
      getDeviceInfoById(id).then(res => {
        this.dialogData = res
        this.deviceId = this.dialogData.deviceId
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加设备信息
    addTableData() {
      this.dialogData.schoolName = this.schoolList.find(item => item.schoolId === this.dialogData.schoolId).schoolName
      addDeviceInfo(this.dialogData).then(res => {
        this.editDialogVisible = false
        this.deviceId = res
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 保存修改的报警信息
    editTableData() {
      editDeviceInfoById(this.dialogData.deviceId, this.dialogData).then(res => {
        this.editDialogVisible = false
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除单条已提交报警信息
    deleteTableData(id) {
      deleteDeviceInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加设备信息
    bindingData() {
      this.bindingDialogVisible = false
      const params = { boxId: this.boxValue, deviceId: this.deviceId }
      bindingData(params).then(res => {
        this.$message.success('绑定成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加设备信息
    unbindingData() {
      const params = { boxId: this.boxId, deviceId: this.deviceId }
      unbindingData(params).then(res => {
        this.$message.success('解绑成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 页面操作
    // 点击添加按钮，弹框显示
    addRow() {
      this.dialogAction = 'add'
      this.editDialogVisible = true
      // 初始化弹窗数据
      this.dialogData = {
        deviceCode: '',
        seat: '',
        type: '',
        schoolId: '',
        productionTime: parseTime(new Date()),
        installLocation: '',
        installTime: parseTime(new Date())
      }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(id) {
      this.dialogAction = 'edit'
      this.editDialogVisible = true
      this.getDialogData(id)
    },
    // 改变学校时修改schoolName
    changeSchool() {
      this.dialogData.schoolName = this.schoolList.find(item => item.schoolId === this.dialogData.schoolId).schoolName
    },
    // 修改设备信息，点击确定按钮
    editSubmitClick() {
      if (this.dialogAction === 'add') this.addTableData()
      else this.editTableData()
    },
    // 编辑报警信息弹框,点击取消，隐藏弹窗
    editCancel() {
      this.editDialogVisible = false
      this.dialogData = {}
    },
    // 确认删除
    deleteRow(id, isBind) {
      this.$confirm(isBind ? '此操作将删除该行并解绑, 是否删除?' : '此操作将删除该行, 是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(id))
        .catch(() => this.$message.info('取消删除'))
    },
    // 绑定信息，点击确定按钮
    bindSubmitClick() {
      this.bindingData()
    },
    // 绑定弹框,点击取消，隐藏弹窗
    bindCancel() {
      this.bindingDialogVisible = false
      this.dialogData = {}
    },
    // 绑定
    binding(deviceId) {
      this.deviceId = deviceId
      this.boxValue = ''
      this.bindingDialogVisible = true
    },
    // 解绑
    unbinding(deviceId, boxId) {
      this.deviceId = deviceId
      this.boxId = boxId
      this.$confirm('此操作将解绑, 是否解绑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.unbindingData())
        .catch(() => this.$message.info('取消解绑'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mobileStyle.scss";

.editDialog /deep/ .el-dialog {
  width: 40%;
}
.editDialog /deep/ .el-input__inner {
  max-width: 400px;
}
.editDialog /deep/ .el-date-editor.el-input {
  max-width: 400px;
}
.bindingDialog /deep/ .el-dialog {
  width: 30%;
}
</style>
