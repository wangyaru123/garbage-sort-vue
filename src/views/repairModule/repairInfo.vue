<template>
  <!-- 维修表 -->
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
          <div slot="header" class="flexbox font-size-13 text-gray" @click.stop="maintainDetailInfo(item.subMaintainId)">
            <div>{{item.subTime}}</div>
            <div class="text-r">{{item.faultRegion}}</div>
          </div>
          <div class="text item flexbox" @click.stop="maintainDetailInfo(item.subMaintainId)">
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
          <el-table-column label="添加维修" fixed="right" width="100px" align="center" v-if="updateAuth">
            <template slot-scope="scope">
              <el-button type="success" size="mini" :disabled="scope.row.status!==1" @click="addRow( scope.row.subMaintainId )">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150px" align="center" v-if="updateAuth">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :disabled="scope.row.status===1"
                icon="el-icon-edit"
                @click="editRow( scope.row.subMaintainId )"
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
    <el-dialog :visible.sync="dialogVisible" title="请填写维修信息">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="维修人：">
          <el-input v-model="dialogData.adminName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="维修时间：">
          <el-date-picker v-model="dialogData.maintainTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="维修过程：">
          <el-input v-model="dialogData.process"></el-input>
        </el-form-item>
        <el-form-item label="维修结果：">
          <el-select v-model="dialogData.result" placeholder="请选择" size="small">
            <el-option v-for="item in maintainResultList" :key="item.result" :value="item.result" :label="item.resultDescribe"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修图片：">
          <ul class="el-upload-list el-upload-list--picture-card">
            <li class="el-upload-list__item is-ready" v-for="(imgItem,index) in dialogData.maintainImg" :key="index">
              <el-image class="el-upload-list__item-thumbnail" :src="imgItem"></el-image>
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview">
                  <i class="el-icon-zoom-in" @click="clickImg(imgItem)"></i>
                </span>
                <span class="el-upload-list__item-preview">
                  <i class="el-icon-delete" @click="deleteUploadedImg(imgItem)"></i>
                </span>
              </span>
            </li>
          </ul>
          <el-upload
            v-if="dialogData.maintainImg && dialogData.maintainImg.length<4"
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
            :limit="4-dialogData.maintainImg.length"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImgVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :isMobile="isMobile"></big-img>
  </div>
</template>

<script>
import { getMaintainInfoByPage, getMaintainInfoById, editMaintainInfo, deleteMaintainInfo } from '@/api/repireModule.js'
import BigImg from '@/components/BigImg'
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
      return process.env.VUE_APP_HTTP_REPAIR + '/repair/images/_upload'
    },
    // 修改权限
    updateAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('maintain_update')
    }
  },
  components: {
    'big-img': BigImg
  },
  data() {
    return {
      // 编辑报警信息弹框显示
      dialogVisible: false,
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
      // 图片显示
      dialogImgVisible: false,
      // 点击缩略图放大图片
      showImg: false,
      imgSrc: '',
      // 维修结果列表
      maintainResultList: [{ result: 4, resultDescribe: '维修失败' }, { result: 3, resultDescribe: '维修成功' }],
      // 标记当前是编辑信息还是添加信息
      dialogAction: ''
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
      getMaintainInfoByPage(this.currentPage, this.pageSize).then(res => {
        console.log(res)
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
    // 添加维修信息
    addRow(id) {
      this.dialogAction = 'add'
      this.dialogVisible = true
      this.dialogData = { subMaintainId: id, adminName: this.$store.state.user.accessTokenDecode.name, maintainTime: parseTime(new Date()), process: '', result: null, maintainImg: [] }
    },
    // 根据id回显数据
    getDialogData(id) {
      getMaintainInfoById(id).then(res => {
        this.dialogData = res
        console.log(res)
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(id) {
      this.dialogAction = 'edit'
      this.dialogVisible = true
      this.getDialogData(id)
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
      this.dialogData.maintainImg.push(imgUrl)
      if (this.uploadFinished === fileList.length) {
        this.editMaintainInfo()
      }
    },
    // 上传图片失败
    handleErrorPicture(response, file, fileList) {
      this.uploadFinished++
      if (this.uploadFinished === fileList.length) {
        this.editMaintainInfo()
      }
    },
    // 保存修改的报警信息
    editMaintainInfo() {
      // console.log(this.dialogData)
      this.dialogVisible = false
      editMaintainInfo(this.dialogData.subMaintainId, this.dialogData).then(res => {
        this.$message.success('保存成功')
        // 清空图片缓存
        this.fileList = []
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击确定按钮
    submitClick() {
      this.uploadFinished = 0
      // 如果有添加图片,执行上传,若没有,直接保存
      if (this.fileList.length > 0) this.$refs.upload.submit()
      else this.editMaintainInfo()
    },
    // 点击取消，隐藏弹窗
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
      // 清空图片缓存
      this.fileList = []
    },
    // 删除单条已提交报警信息
    deleteTableData(id) {
      deleteMaintainInfo(id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
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
    maintainDetailInfo(id) {
      this.$router.push({
        path: '/repairModule/repairDetailInfo',
        query: { id: id }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/mobileStyle.scss";
.ellipsis-td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
