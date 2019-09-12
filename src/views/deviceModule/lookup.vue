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
          @size-change="getDeviceInfoByPage"
          @current-change="getDeviceInfoByPage"
          :current-page="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div>{{item.deviceName}}</div>
            <div class="text-r">{{ item.category}}</div>
          </div>
          <div class="text item flexbox">
            <div style="width:100%">
              <div class="flexbox mt-5">
                设备别名:
                <div>{{item.equipmentAlias}}</div>
              </div>
              <div class="flexbox mt-5">
                设备型号:
                <div>{{item.equipmentModel}}</div>
              </div>
              <div class="flexbox mt-5">
                设备详情:
                <div>{{item.equipmentDetails}}</div>
              </div>
              <div class="flexbox mt-5">
                学校:
                <div>{{item.schoolName}}</div>
              </div>
              <div class="flexbox mt-5">
                负责人:
                <div>{{item.adminName}}</div>
              </div>
              <div class="flexbox mt-5">
                启用时间:
                <div>{{item.enableTime}}</div>
              </div>
              <div class="flexbox mt-5">
                固有资产号:
                <div>{{item.inherentAssetNum}}</div>
              </div>
              <div class="flexbox mt-5">
                安装地点:
                <div>{{item.installLocation}}</div>
              </div>
              <div class="flexbox mt-5">
                安装时间:
                <div>{{item.installTime}}</div>
              </div>
              <div class="flexbox mt-5">
                安装单位:
                <div>{{item.installschool}}</div>
              </div>
              <div class="flexbox mt-5">
                设备厂家:
                <div>{{item.equipmentManufacturer}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-select v-model="schoolId" size="small" placeholder="请选择" @change="getDeviceInfoByPage">
          <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
        </el-select>
        <el-row :gutter="10" class="text-c">
          <el-col :span="8" class="mt-10" v-for="(item,index) in tableData" :key="index">
            <el-card>
              <img
                :src=" item.type === 'A' ? ( item.isBind ? aBindImg : aImg ) : ( item.isBind ? bBindImg : bImg ) "
                :class="item.isBind ? 'bind' : '' "
              />
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <!-- 编辑设备信息弹框 -->
    <el-dialog :visible.sync="editDialogVisible" title="请填写设备信息(*是必填项)" class="editDialog">
      <el-form label-position="right" label-width="120px" :model="dialogData" ref="ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备名称：" :rules="{ required: true, message: '请输入设备名称', trigger: 'blur' }">
              <el-input v-model="dialogData.deviceName"></el-input>
            </el-form-item>
            <el-form-item label="设备编码：" :rules="{ required: true, message: '请输入设备名称', trigger: 'blur' }">
              <el-input v-model="dialogData.deviceCode"></el-input>
            </el-form-item>
            <el-form-item label="位置号：">
              <el-input v-model="dialogData.seat"></el-input>
            </el-form-item>
            <el-form-item label="类别：">
              <el-input v-model="dialogData.type"></el-input>
            </el-form-item>
            <el-form-item label="学校：">
              <el-select v-model="dialogData.schoolId" placeholder="请选择" size="small">
                <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否绑定：">
              <el-switch v-model="dialogData.isBind" active-color="#288AF1" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="盒子id：">
              <el-input v-model="dialogData.boxId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产时间：">
              <el-input v-model="dialogData.productionTime"></el-input>
            </el-form-item>
            <el-form-item label="安装地点：">
              <el-input v-model="dialogData.installLocation"></el-input>
            </el-form-item>
            <el-form-item label="安装时间：">
              <el-date-picker v-model="dialogData.installTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="设备图片：">
              <el-upload
                enctype="multipart/form-data"
                ref="upload"
                :headers="headers"
                :auto-upload="false"
                :action="uploadActionUrl"
                multiple
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="changePicture"
                :on-success="handleSuccessPicture"
                :on-error="handleErrorPicture"
                :file-list="fileList"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="imgDialogVisible" :modal-append-to-body="false" :modal="false">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="editSubmitClick">确定</el-button>
          <el-button type="info" size="medium" @click="editCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceInfoByPage, getDeviceInfoById, editDeviceInfoById, addDeviceInfo, deleteDeviceInfoById } from '@/api/deviceModule.js'
import { getAllUserInfo } from '@/api/ucenter/userInfo.js'
import { getSchoolList } from '@/api/ucenter/school.js'
import { parseTime } from '@/utils/index'
import aImg from '@/assets/A.png'
import bImg from '@/assets/B.png'
import aBindImg from '@/assets/Abind.png'
import bBindImg from '@/assets/Bbind.png'

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
      // 设置弹窗是添加还是编辑
      dialogAction: 'add',
      // 放大图片
      imgDialogVisible: false,
      // 放大图片
      dialogImageUrl: [],
      // 上传图片列表
      fileList: [],
      // 负责人列表
      personList: [],
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
    this.getAllUserInfo()
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
        this.deviceId = this.dialogData.deviceId
        if (!res.imgUrl) this.fileList = []
        else {
          this.fileList = res.imgUrl.map(item => {
            const tmp = item.split('/')
            const name = tmp.length > 0 ? tmp[tmp.length - 1] : '文件'
            return { name: name, url: item }
          })
        }
      }).catch(err => this.$message.error(err))
    },
    // 获取所有人的信息
    getAllUserInfo() {
      getAllUserInfo().then(res => {
        this.personList = res
      }).catch(err => this.$message.error(err))
    },
    // 添加设备信息
    addTableData() {
      this.editDialogVisible = false
      this.dialogData.schoolName = this.schoolList.filter(item => item.schoolId === this.dialogData.schoolId)[0].schoolName
      addDeviceInfo(this.dialogData).then(res => {
        this.deviceId = res
        this.$nextTick(() => this.$refs.upload.submit())
        this.getDeviceInfoByPage()
      }).catch(err => this.$message.error(err))
    },
    // 保存修改的报警信息
    editTableData() {
      this.editDialogVisible = false
      // 获取保留的文件路径
      this.dialogData.imgUrl = this.fileList.filter(item => item.status === 'success').map(item => item.url)
      editDeviceInfoById(this.dialogData.deviceId, this.dialogData).then(res => {
        const waitForUpload = this.fileList.filter(item => item.status === 'ready')
        if (waitForUpload.length > 0) {
          // 在表单提交成功之后再上传文件
          this.$nextTick(() => this.$refs.upload.submit())
        } else {
          this.getDeviceInfoByPage()
        }
      }).catch(err => this.$message.error(err))
    },
    // 删除单条已提交报警信息
    deleteTableData(id) {
      deleteDeviceInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.getDeviceInfoByPage()
      }).catch(err => this.$message.error(err))
    },
    // 页面操作
    // 上传图片前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp'
      const isLimit = file.size / 1024 / 1024 < 15
      if (!isJPG) {
        this.$message.error('上传图片只能是jpg、jpeg、png、gif、bmp格式!')
      }
      if (!isLimit) {
        this.$message.error('上传头像图片大小不能超过15MB!')
      }
      return isJPG && isLimit
    },
    // 删除图片事件,将filelist赋值,用来标识是否有图片
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    // 添加图片事件,将filelist赋值,用来标识是否有图片
    changePicture(file, fileList) {
      this.fileList = fileList
    },
    // 成功上传图片到服务器
    handleSuccessPicture(response, file, fileList) {
      if (fileList.length > 0 && fileList[fileList.length - 1].status === 'success') {
        this.getDeviceInfoByPage()
        if (this.act === 'add') this.$message.success('添加成功')
        else this.$message.success('更新成功')
      }
    },
    // 上传图片失败
    handleErrorPicture(response, file, fileList) {
    },
    // 点击添加按钮，弹框显示
    addRow() {
      this.dialogAction = 'add'
      this.editDialogVisible = true
      this.fileList = []
      // 初始化弹窗数据
      this.dialogData = {
        deviceName: '',
        category: '',
        equipmentAlias: '',
        equipmentModel: '',
        equipmentDetails: '',
        adminName: '',
        enableTime: parseTime(new Date()),
        inherentAssetNum: '',
        installLocation: '',
        installTime: parseTime(new Date()),
        installschool: '',
        equipmentManufacturer: ''
      }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(id) {
      this.dialogAction = 'edit'
      this.editDialogVisible = true
      this.fileList = []
      this.getDialogData(id)
    },
    // 修改设备信息，点击确定按钮
    editSubmitClick() {
      // 负责人adminName
      this.dialogData.adminName = this.personList.filter(item => item.id === this.dialogData.adminId)[0].name
      if (this.dialogAction === 'add') this.addTableData()
      else this.editTableData()
    },
    // 编辑报警信息弹框,点击取消，隐藏弹窗
    editCancel() {
      this.editDialogVisible = false
      this.dialogData = {}
    },
    // 确认删除
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(id))
        .catch(() => this.$message.info('取消删除'))
    },
    // 移动端点击卡片进入详情页面
    subAlarmDetailInfo(id) {
      this.$router.push({
        path: '/repairModule/subAlarmDetailInfo',
        query: { id: id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mobileStyle.scss";
// el-dialog默认宽度50%，两栏放不下
.editDialog .el-dialog {
  width: 65%;
}
.editDialog /deep/ .el-input__inner {
  max-width: 200px;
}
.editDialog /deep/ .el-date-editor.el-input {
  max-width: 200px;
}
.bind /deep/ .el-card__body {
  background-color: #ccffff;
}
</style>
