<template>
  <!-- 设备管理表 -->
  <div class="p-10">
    <el-row>
      <el-select v-model="schoolId" size="small" placeholder="请选择" @change="getDeviceInfoByPage">
        <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
      </el-select>
      <el-row :gutter="20">
        <el-col :span="6" class="mt-10" v-for="(item,index) in tableData" :key="index" @click.native="editRow( item.deviceId )">
          <el-card :body-style="{ padding: '0px' }">
            <div :class="item.isBind ? 'bind' : '' ">
              <img class="image" :src=" item.type === 'A' ? ( item.isBind ? aBindImg : aImg ) : ( item.isBind ? bBindImg : bImg ) " fit="fill" />
            </div>
            <div class="bottom-div">
              <p>设备编码：{{ item.deviceCode }}</p>
              <div class="bottom clearfix">
                <span>类型：{{ item.type }}</span>
                <span class="right" :class="item.isBind?'text-success':'text-danger'">{{ item.isBind?'已绑定':'未绑定' }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <!-- 编辑设备信息弹框 -->
    <el-dialog :visible.sync="editDialogVisible" title="请填写设备信息(*是必填项)" class="editDialog">
      <el-form label-position="right" label-width="120px" :model="dialogData" ref="ruleForm">
        <el-row>
          <el-form-item label="设备名称：" :rules="{ required: true, message: '请输入设备名称', trigger: 'blur' }">
            <span>{{dialogData.deviceName}}</span>
          </el-form-item>
          <el-form-item label="设备编码：" :rules="{ required: true, message: '请输入设备名称', trigger: 'blur' }">
            <span>{{dialogData.deviceCode}}</span>
          </el-form-item>
          <el-form-item label="位置号：">
            <span>{{dialogData.seat}}</span>
          </el-form-item>
          <el-form-item label="类别：">
            <span>{{dialogData.type}}</span>
          </el-form-item>
          <el-form-item label="学校：">
            <span>{{schoolList.filter(item=>item.schoolId===dialogData.schoolId).schoolName}}</span>
          </el-form-item>
          <el-form-item label="是否绑定：">
            <el-switch v-model="dialogData.isBind" active-color="#288AF1" inactive-color="#ff4949" disabled></el-switch>
          </el-form-item>
          <el-form-item label="生产时间：">
            <span>{{dialogData.productionTime}}</span>
          </el-form-item>
          <el-form-item label="安装地点：">
            <span>{{dialogData.installLocation}}</span>
          </el-form-item>
          <el-form-item label="安装时间：">
            <span>{{dialogData.installTime}}</span>
            <!-- <el-date-picker v-model="dialogData.installTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker> -->
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceInfoByPage, getDeviceInfoById } from '@/api/deviceModule/index.js'
import { getSchoolList } from '@/api/ucenter/school.js'
import aImg from '@/assets/machineRight.png'
import bImg from '@/assets/machine.png'
import aBindImg from '@/assets/machineRightBind.png'
import bBindImg from '@/assets/machineBind.png'

export default {
  name: 'DragDialogDemo',
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
      aImg,
      bImg,
      aBindImg,
      bBindImg,
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
      // 弹框回显报警信息数据
      dialogData: {},
      // 放大图片
      imgDialogVisible: false,
      // 放大图片
      dialogImageUrl: [],
      // 上传图片列表
      fileList: [],
      // 设备id
      deviceId: '',
      // 学校id
      schoolId: '',
      // 学校列表
      schoolList: [],
      // 是否绑定列表
      isBindList: [{ isBind: 0, desc: '未绑定' }, { isBind: 1, desc: '已绑定' }]
    }
  },
  created() {
    this.getDeviceInfoByPage()
    // 获取学校列表
    this.getSchoolList()
  },
  methods: {
    // api
    // 获取学校列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
      }).catch(err => this.$message.error(err))
    },
    // 根据page,size获取当前表格数据
    getDeviceInfoByPage() {
      const params = { schoolId: this.schoolId }
      getDeviceInfoByPage(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 根据id回显数据
    getDialogData(id) {
      getDeviceInfoById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err))
    },
    // 页面操作
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(id) {
      this.editDialogVisible = true
      this.fileList = []
      this.getDialogData(id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mobileStyle.scss";

.editDialog /deep/ .el-dialog {
  width: 30%;
}

.editDialog /deep/ .el-input__inner {
  max-width: 200px;
}

.editDialog /deep/ .el-date-editor.el-input {
  max-width: 200px;
}

.bind {
  background-color: #ccffff;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.right {
  padding: 0;
  float: right;
}

.image {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  padding: 10px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.bottom-div {
  padding: 14px;
  border-top: 1px solid #eee;
}
</style>
