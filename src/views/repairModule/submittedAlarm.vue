<template>
  <!-- 已提交报警表 -->
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray" @click.stop="subAlarmDetailInfo(item.subAlarmId)">
            <div>{{item.subTime}}</div>
            <div class="text-r">{{item.faultRegion}}</div>
          </div>
          <div class="text item flexbox" @click.stop="subAlarmDetailInfo(item.subAlarmId)">
            <img :src="item.alarmImg[0]" class="img-style-small" @click.stop="clickImg(item.alarmImg[0])" />
            <div>{{item.alarmDescription}}</div>
          </div>
        </el-card>
      </div>
      <!-- 放大图片 -->
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :isMobile="isMobile"></big-img>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;">
          <el-table-column label="序号" fixed width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提交时间" width="180px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.subTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="故障时间" width="180px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.faultTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="故障区域" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.faultRegion}}</span>
            </template>
          </el-table-column>
          <el-table-column label="维修费用" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.maintainCost}}</span>
            </template>
          </el-table-column>
          <el-table-column label="报警描述" align="center">
            <template slot-scope="scope">
              <span class="ellipsis-td">{{ scope.row.alarmDescription}}</span>
            </template>
          </el-table-column>
          <el-table-column label="报警图片" width="250px" align="center">
            <template slot-scope="scope">
              <img v-for="(img,index) in scope.row.alarmImg" :src="img" :key="index" class="img-style-small" alt="无图片" @click="clickImg(img)" />
            </template>
          </el-table-column>
          <el-table-column label="派发" fixed="right" width="100px" align="center" v-if="dispatchAuth">
            <template slot-scope="scope">
              <el-button type="success" size="mini" :disabled="Boolean(scope.row.status)" @click="distribute( scope.row )">派发</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150px" align="center" v-if="updeteAuth || deleteAuth">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )" v-if="updeteAuth"></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                :disabled="Boolean(scope.row.status)"
                v-if="deleteAuth"
                @click="deleteRow( scope.row )"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
    <!-- 编辑报警信息弹框 -->
    <el-dialog :visible.sync="editDialogVisible" title="请填写报警信息(以下都是必填项)">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="提交时间：">
          <span>{{dialogData.subTime}}</span>
        </el-form-item>
        <el-form-item label="故障时间：">
          <el-date-picker v-model="dialogData.faultTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="故障区域：">
          <el-input v-model="dialogData.faultRegion"></el-input>
        </el-form-item>
        <el-form-item label="维修费用：">
          <el-input v-model="dialogData.maintainCost"></el-input>
        </el-form-item>
        <el-form-item label="报警描述：">
          <el-input type="textarea" v-model="dialogData.alarmDescription"></el-input>
        </el-form-item>
        <el-form-item label="报警图片：">
          <ul class="el-upload-list el-upload-list--picture-card">
            <li class="el-upload-list__item is-ready" v-for="(alarmImgItem,index) in dialogData.alarmImg" :key="index">
              <el-image class="el-upload-list__item-thumbnail" :src="alarmImgItem"></el-image>
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview">
                  <i class="el-icon-zoom-in" @click="clickImg(alarmImgItem)"></i>
                </span>
                <span class="el-upload-list__item-preview">
                  <i class="el-icon-delete" @click="deleteUploadedImg(alarmImgItem)"></i>
                </span>
              </span>
            </li>
          </ul>
          <el-upload
            v-if="dialogData.alarmImg && dialogData.alarmImg.length<4"
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
            :limit="4-dialogData.alarmImg.length"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible" :modal-append-to-body="false" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="editSubmitClick">确定</el-button>
          <el-button type="info" size="medium" @click="editCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 派发维修人弹框 -->
    <el-dialog :visible.sync="distributeDialogVisible" title="请选择维修人" class="width-20">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="维修人：">
          <el-select v-model="dialogData.adminId" placeholder="请选择" size="small">
            <el-option v-for="item in maintainPersonList" :key="item.adminId" :value="item.adminId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="distributeSubmitClick">确定</el-button>
          <el-button type="info" size="medium" @click="distributeCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :isMobile="isMobile"></big-img>
  </div>
</template>

<script>
import { getSubAlarmInfoByPage, getSubAlarmInfoById, editSubAlarmInfo, deleteSubAlarmInfo, getMaintainPerson, dispatchTasks } from '@/api/repireModule.js'
import BigImg from '@/components/BigImg'

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
      return process.env.VUE_APP_HTTP_REPAIR + '/repair/images/_upload'
    },
    // 修改权限
    updeteAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('maintain_alarm_update')
    },
    // 删除权限
    deleteAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('maintain_alarm_delete')
    },
    // 派发权限
    dispatchAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('maintain_dispatch_tasks')
    }
  },
  components: {
    'big-img': BigImg
  },
  data() {
    return {
      // 编辑报警信息弹框显示
      editDialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 弹框回显报警信息数据
      dialogData: {},

      // 上传图片时弹出文件夹
      imgDialogVisible: false,
      // 上传图片路径
      dialogImageUrl: '',
      // 上传结束标志
      uploadFinished: 0,
      // 上传图片缓存
      fileList: [],
      // 点击缩略图放大图片
      showImg: false,
      imgSrc: '',
      // 派发维修人弹框
      distributeDialogVisible: false,
      maintainPersonList: {},
      // 请求发开接口时传的positionId
      positionId: 5
    }
  },
  created() {
    // 组件创建完后获取第一页数据
    this.fetchData()
  },
  methods: {
    // 根据tag过滤数据
    filterTag(value, row) {
      return row.isSubmit === value
    },
    // 根据page,size获取当前表格数据
    fetchData() {
      getSubAlarmInfoByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // pageSize改变时触发
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData()
    },
    // 页数改变时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    // 根据id回显数据
    editTableData(id) {
      getSubAlarmInfoById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.editDialogVisible = true
      this.editTableData(row.subAlarmId)
    },
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
      this.uploadFinished++
      const imgUrl = response.data[0]
      this.dialogData.alarmImg.push(imgUrl)
      if (this.uploadFinished === fileList.length) {
        this.saveSubAlarmInfo()
      }
    },
    // 上传图片失败
    handleErrorPicture(response, file, fileList) {
      this.uploadFinished++
      if (this.uploadFinished === fileList.length) {
        this.saveSubAlarmInfo()
      }
    },
    // 保存修改的报警信息
    saveSubAlarmInfo() {
      this.editDialogVisible = false
      editSubAlarmInfo(this.dialogData.subAlarmId, this.dialogData).then(res => {
        this.$message.success('修改成功')
        // 清空图片缓存
        this.fileList = []
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击确定按钮
    editSubmitClick() {
      this.uploadFinished = 0
      // 如果有添加图片,执行上传,若没有,直接保存
      if (this.fileList.length > 0) this.$refs.upload.submit()
      else this.saveSubAlarmInfo()
      // 将字符串转化数字类型
      this.dialogData.maintainCost = Number(this.dialogData.maintainCost)
    },
    // 编辑报警信息弹框,点击取消，隐藏弹窗
    editCancel() {
      this.editDialogVisible = false
      this.dialogData = {}
      // 清空图片缓存
      this.fileList = []
    },
    // 删除单条已提交报警信息
    deleteTableData(id) {
      deleteSubAlarmInfo(id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(row.subAlarmId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 组件方法:点击缩略图放大图片
    clickImg(imgUrl) {
      this.showImg = true
      // 获取当前图片地址
      this.imgSrc = imgUrl
    },
    // 点击子组件的遮罩层,取消显示
    viewImg() {
      this.showImg = false
    },
    // 点击已上传图片的删除图标
    deleteUploadedImg(imgUrl) {
      // 删除某张图片
      this.dialogData.alarmImg.splice(this.dialogData.alarmImg.findIndex(item => item === imgUrl), 1)
    },
    // 移动端点击卡片进入详情页面
    subAlarmDetailInfo(id) {
      this.$router.push({
        path: '/repairModule/subAlarmDetailInfo',
        query: { id: id }
      })
    },
    // 派发维修人
    distribute(row) {
      this.dialogData.subAlarmId = row.subAlarmId
      this.distributeDialogVisible = true
      const positionData = { positionId: this.positionId }
      getMaintainPerson(positionData).then(res => {
        this.maintainPersonList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 派发维修人弹框,点击确定，绑定派发人
    distributeSubmitClick() {
      dispatchTasks({ subAlarmId: this.dialogData.subAlarmId, adminId: this.dialogData.adminId }).then(res => {
        this.distributeDialogVisible = false
        this.$message.success('派发成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 派发维修人弹框,点击取消，隐藏弹窗
    distributeCancel() {
      this.distributeDialogVisible = false
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/mobileStyle.scss";

// 设置派发弹框的宽度为20%，因为内容很少
.width-20 .el-dialog {
  width: 20%;
}
.ellipsis-td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
