<template>
  <!-- 保养父记录 -->
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
          @size-change="getRecordDataByPage"
          @current-change="getRecordDataByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="mt-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix flexbox">
            <div>设备名称:{{ item.equipmentName }}</div>
            <!-- <el-button type="primary" size="mini" @click="toChildRecord( item )">查看子记录</el-button> -->
          </div>
          <div class="text item">
            <group>
              <cell title="点检项目" :value="item.checkItemName"></cell>
              <cell title="计划时间" :value="item.planTime"></cell>
              <cell title="保养时间" :value="item.executionTime"></cell>
              <cell title="保养结果" :value="resultList[item.result? item.result:0].desc"></cell>
              <cell title="保养记录" :value="item.maintainRecord"></cell>
              <!-- <cell title="保养记录" :value="item.maintainRecord"></cell> -->
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <span>设备名称：</span>
        <el-select v-model="equipmentId" placeholder="请选择" size="small" :disabled="!isSelectByCondition" @change="getRecordDataByPage">
          <el-option v-for="item in deviceNameList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
        </el-select>
        <span class="ml-20">选择月份：</span>
        <el-date-picker
          v-model="selectMonthTime"
          size="small"
          type="month"
          value-format="yyyy-MM-dd"
          placeholder="选择月"
          :disabled="!isSelectByCondition"
          @change="getRecordDataByPage"
        ></el-date-picker>
        <el-checkbox class="float-r check-style" v-model="isSelectByCondition" @change="getRecordDataByPage">是否按照条件查询</el-checkbox>
      </el-row>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-10">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" align="center" width="140px">
            <template slot-scope="scope">
              <span>{{ scope.row.equipmentName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="点检项目" width="140px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.checkItemName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划时间" align="center" width="160px">
            <template slot-scope="scope">
              <span>{{ scope.row.planTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养时间" align="center" width="160px">
            <template slot-scope="scope">
              <span>{{ scope.row.executionTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养结果" align="center">
            <template slot-scope="scope">
              <span>{{ resultList[scope.row.result? scope.row.result:0].desc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养图片" align="center">
            <template slot-scope="scope">
              <img v-for="(img,index) in scope.row.imgUrl" :src="img" :key="index" class="img-style-small" alt="无图片" @click="clickImg(img)" />
            </template>
          </el-table-column>
          <el-table-column label="保养记录" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.maintainRecord }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="parentCheckerPageAuth&&scope.row.verifyResult!=1" type="primary" size="mini" @click="editRow( scope.row )">保养结果</el-button>
              <el-button
                v-if="parentConfirmorPageAuth&&scope.row.result&&!scope.row.verifyResult"
                type="primary"
                size="mini"
                @click="confirmRecord(scope.row)"
              >确认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getRecordDataByPage"
          @current-change="getRecordDataByPage"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
      <!-- 放大图片 -->
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :isMobile="isMobile"></big-img>
      <!-- 添加结果弹框 -->
      <el-dialog :visible.sync="dialogVisible" title="请填写" class="width-20">
        <el-form label-position="right" label-width="150px" :model="dialogData">
          <el-form-item label="保养结果：">
            <el-select v-model="dialogData.result" placeholder="请选择" size="small">
              <el-option v-for="item in resultList" :key="item.result" :value="item.result" :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片：">
            <el-upload
              enctype="multipart/form-data"
              ref="upload"
              :auto-upload="false"
              :headers="headers"
              :action="uploadActionUrl"
              multiple
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :limit="uploadLimitNumber"
            >
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过15Mb，不能超过{{uploadLimitNumber}}个文件</div>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="imgDialogVisible" :modal-append-to-body="false" :modal="false">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="处理记录：">
            <el-input v-model="dialogData.maintainRecord" type="textarea"></el-input>
          </el-form-item>
          <div class="text-c">
            <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
            <el-button type="info" size="medium" @click="cancelSubmit">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRecordDataById, updateRecordDataById, confirmRecord, getRecordDataByCheckerId, getRecordDataByConfirmId, getRecordDataByAdduser } from '@/api/maintainModule/record/level2.js'
import { getDeviceNameList } from '@/api/deviceModule/index.js'
import { Group, Cell } from 'vux'
import BigImg from '@/components/BigImg'

export default {
  components: {
    Group,
    Cell,
    BigImg
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    },
    headers() {
      return {
        Authorization: this.$store.getters.authorization
      }
    },
    // 查询添加人权限
    parentAdduserPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('parent_adduser_page')
    },
    // 查询点检人权限
    parentCheckerPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('parent_checker_page')
    },
    // 查询确认人权限
    parentConfirmorPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('parent_confirmor_page')
    },
    userId() {
      return this.$store.state.user.userId
    },
    // upload组件上传图片的Action路由地址
    uploadActionUrl() {
      return process.env.VUE_APP_HTTP_MAINTAIN + '/maintain/level-two/upload/file/' + this.resultId
    }
    // hasConfirmPower() {
    //   const role = this.$store.state.user.roles
    //   if (role.includes(process.env.VUE_APP_ROLE_ADMIN)) return true
    //   if (role.includes(process.env.VUE_APP_ROLE_MANAGER)) return true
    //   if (role.includes(process.env.VUE_APP_ROLE_MAINTAIN_CONFIRMER)) return true
    //   return false
    // },
    // hasCheckPower() {
    //   const role = this.$store.state.user.roles
    //   if (role.includes(process.env.VUE_APP_ROLE_ADMIN)) return true
    //   if (role.includes(process.env.VUE_APP_ROLE_MANAGER)) return true
    //   if (role.includes(process.env.VUE_APP_ROLE_MAINTAIN_CONFIRMER)) return true
    //   if (role.includes(process.env.VUE_APP_ROLE_MAINTAIN_CHECKER)) return true
    //   return false
    // }
  },
  data() {
    return {
      // 是否按照条件来筛选
      isSelectByCondition: false,
      // 选择的月
      selectMonthTime: new Date(),
      // 下拉选择框设备id
      equipmentId: '',
      // 设备列表
      deviceNameList: [],
      // 结果列表
      resultList: [
        { result: 0, desc: '未执行' },
        { result: 1, desc: '良好' },
        { result: 2, desc: '不良' },
        { result: 3, desc: '不良改善完成' },
        { result: 4, desc: '停止運行' }
      ],
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 弹框显隐
      dialogVisible: false,
      // 放大图片
      imgDialogVisible: false,
      // 弹框数据
      dialogData: {},
      // 添加还是修改
      operation: 'add',
      // 上传文件个数限制
      uploadLimitNumber: 2,
      // 上传文件类型
      uploadFileType: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'],
      // 上传文件的Id
      resultId: 0,
      // 上传图片路径
      dialogImageUrl: '',
      // 上传图片缓存
      fileList: [],
      // 点击缩略图放大图片
      showImg: false,
      // 图片地址
      imgSrc: ''
    }
  },
  created() {
    this.getRecordDataByPage()
    this.getDeviceNameList()
  },
  methods: {
    // api
    // 获取设备名称列表
    getDeviceNameList() {
      getDeviceNameList().then(res => {
        this.deviceNameList = res
      }).catch(err => this.$message.error(err))
    },
    // 分页多条件查询所有的父计划在确认人的角色
    getRecordDataByConfirmId() {
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        params.monthTime = this.$dayjs(this.selectMonthTime).format('YYYY-MM')
      } else {
        this.equipmentId = ''
        this.selectMonthTime = new Date()
      }
      getRecordDataByConfirmId(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 分页多条件查询所有的父计划在点检人的角色
    getRecordDataByCheckerId() {
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        params.monthTime = this.$dayjs(this.selectMonthTime).format('YYYY-MM')
      } else {
        this.equipmentId = ''
        this.selectMonthTime = new Date()
      }
      getRecordDataByCheckerId(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 分页多条件查询所有的父计划在添加计划人的角度
    getRecordDataByAdduser() {
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        params.monthTime = this.$dayjs(this.selectMonthTime).format('YYYY-MM')
      } else {
        this.equipmentId = ''
        this.selectMonthTime = new Date()
      }
      getRecordDataByAdduser(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 分页多条件查询所有的父计划在添加计划人的角度
    getRecordDataByPage() {
      if (this.parentAdduserPageAuth) {
        this.getRecordDataByAdduser()
        return
      }
      if (this.parentCheckerPageAuth) {
        this.getRecordDataByCheckerId()
        return
      }
      if (this.parentConfirmorPageAuth) this.getRecordDataByConfirmId()
    },
    // 确认人确认
    confirmRecord(row) {
      confirmRecord(row.parentPlanRecordId).then(res => {
        this.$message.success('确认成功')
        this.getRecordDataByPage()
      }).catch(err => this.$message.error(err))
    },
    // 点击确认按钮，弹框显示，并回显数据
    confirmRow(row) {
      this.confirmRecord(row.parentPlanRecordId)
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogVisible = true
      this.operation = 'edit'
      this.fileList = []
      this.getDialogData(row.parentPlanRecordId)
    },
    // 弹框取消
    cancel() {
      this.dialogVisible = false
    },
    // 计算完成率
    calculateFinishPercent(row) {
      if (row.completeNum && row.totalNum) {
        const temp = 100 * row.completeNum / row.totalNum
        return temp.toFixed(1) + '%'
      }
      return '0%'
    },
    // 回显结果信息
    getDialogData(parentPlanRecordId) {
      getRecordDataById(parentPlanRecordId).then(res => {
        // console.log(res)
        if (res.imgUrl) {
          this.fileList = res.imgUrl.map(item => {
            const tmp = item.split('/')
            const name = tmp.length > 0 ? tmp[tmp.length - 1] : '文件'
            return { name: name, url: item }
          })
        }
        this.dialogData = res
        this.dialogData.parentPlanRecordId = parentPlanRecordId
      }).catch(err => this.$message.error(err))
    },
    // 修改结果
    updateResultData() {
      // 获取保留的文件路径
      this.dialogData.imgUrl = this.fileList.filter(item => item.status === 'success').map(item => item.url)
      // console.log(this.dialogData.filePath)
      updateRecordDataById(this.dialogData.parentPlanRecordId, this.dialogData).then(res => {
        const waitForUpload = this.fileList.filter(item => item.status === 'ready')
        if (waitForUpload.length > 0) {
          this.resultId = this.dialogData.parentPlanRecordId
          // 在表单提交成功之后再上传文件
          this.$nextTick(() => this.$refs.upload.submit())
        } else {
          this.getChildRecordDataByPage()
        }
      }).catch(err => this.$message.error(err))
    },
    // 点击添加按钮，弹框显示，并回显数据
    addResult(row) {
      this.childPlanRecordId = row.childPlanRecordId
      this.dialogVisible = true
      this.act = 'add'
      this.fileList = []
      this.dialogData = { id: row.childPlanRecordId, imgUrl: [], maintainRecord: '', result: '' }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    getResult(row) {
      this.childPlanRecordId = row.childPlanRecordId
      this.dialogVisible = true
      this.act = 'edit'
      this.fileList = []
      this.getDialogData(row.childPlanRecordId)
    },
    // 校验上传文件的格式
    // 校验上传文件的格式
    checkUploadFileFormat() {
      const waitForUploadFiles = this.fileList.filter(item => item.status === 'ready')
      if (waitForUploadFiles.length === 0) return true

      for (let i = 0; i < waitForUploadFiles.length; i++) {
        const isJPG = this.uploadFileType.includes(waitForUploadFiles[i].raw.type)
        if (!isJPG) {
          this.$message.error('上传图片只能是jpg、jpeg、png、gif、bmp格式!')
          return false
        }
        const isLimit = waitForUploadFiles[i].size / 1024 / 1024 < 15
        if (!isLimit) {
          this.$message.error('上传头像图片大小不能超过15MB!')
          return false
        }
      }
      return true
    },
    // 弹框提交
    submitClick() {
      if (!this.checkUploadFileFormat()) return
      this.dialogVisible = false
      if (this.operation === 'edit') this.updateResultData()
    },
    // 弹框取消
    cancelSubmit() {
      this.dialogVisible = false
      if (this.operation === 'add') this.$message.info('取消添加')
      else this.$message.info('取消编辑')
    },
    // 组件方法:点击缩略图放大图片
    clickImg(src) {
      this.showImg = true
      this.imgSrc = src
    },
    // 点击子组件的遮罩层,取消显示
    viewImg() {
      this.showImg = false
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
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    // 成功上传图片到服务器
    handleSuccess(response, file, fileList) {
      if (fileList.length > 0 && fileList[fileList.length - 1].status === 'success') {
        this.getRecordDataByPage()
        if (this.operation === 'add') this.$message.success('添加成功')
        else this.$message.success('更新成功')
      }
    },
    // 上传图片失败
    handleError(response, file, fileList) {
    },
    // 上传图片超过个数限制
    handleExceed(files, fileList) {
      this.$message.error('上传图片超出限制')
    }
  }
}
</script>

<style lang="scss">
@import "../../../../styles/mobileStyle.scss";
.text /deep/ .weui-cells {
  font-size: 14px;
}
p /deep/ label.vux-label {
  font-weight: 350;
}

.check-style {
  height: 32px;
  line-height: 32px;
}
</style>
