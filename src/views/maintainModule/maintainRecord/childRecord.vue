<template>
  <!-- 保养子记录 -->
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
          @size-change="getChildRecordDataByPage"
          @current-change="getChildRecordDataByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix flexbox">
            <div>
              <b>{{ item.checkItemName }}</b>
            </div>
          </div>
          <div class="text item">
            <group>
              <cell title="保养等级" :value="item.maintainLevel"></cell>
              <cell title="计划时间" :value="item.planTime"></cell>
              <cell title="保养结果" :value="item.result&&resultList.filter(i=>i.result===item.result)[0].desc"></cell>
              <cell title="保养记录" :value="item.maintainRecord"></cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
        <span class="ml-20">设备名称：{{$route.query.equipmentName}}</span>
        <span class="ml-20">保养等级：{{$route.query.maintainLevel}}</span>
      </el-row>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-5">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="点检项目" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.checkItemName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.planTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.executionTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养结果" width="110px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.result && resultList.filter(i=>i.result===scope.row.result)[0].desc }}</span>
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
          <el-table-column label="保养结果" width="100px" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="addResult( scope.row )"
                :disabled="Boolean($route.query.isConfirm) || Boolean(scope.row.result)"
              >添加结果</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="getResult( scope.row )"
                :disabled="Boolean($route.query.isConfirm) || !scope.row.result"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getChildRecordDataByPage"
          @current-change="getChildRecordDataByPage"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
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
              :limit="4"
            >
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
            <el-button type="info" size="medium" @click="cancel">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getChildRecordDataByPage, getResultDataById, addResultData, updateResultData } from '@/api/maintainModule/record/level1.js'
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
    // 授权头
    headers() {
      return {
        Authorization: this.$store.getters.authorization
      }
    },
    // upload组件上传图片的Action路由地址
    uploadActionUrl() {
      return process.env.VUE_APP_HTTP_MAINTAIN + '/maintain/images/_upload/' + this.childPlanRecordId
    }
  },
  data() {
    return {
      // 结果列表
      resultList: [
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
      // 弹框数据
      dialogData: {},
      // 放大图片
      imgDialogVisible: false,
      // 上传图片路径
      dialogImageUrl: '',
      // 上传图片缓存
      fileList: [],
      // 添加还是修改
      act: 'add',
      // 点击缩略图放大图片
      showImg: false,
      imgSrc: '',
      // 子记录id
      childPlanRecordId: ''
    }
  },
  created() {
    this.getChildRecordDataByPage()
  },
  methods: {
    // api
    // 获取表格数据
    getChildRecordDataByPage() {
      getChildRecordDataByPage(this.currentPage, this.pageSize, this.$route.query.id).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 添加结果
    addResultData() {
      addResultData(this.dialogData.id, this.dialogData).then(res => {
        this.$nextTick(() => this.$refs.upload.submit())
        this.getChildRecordDataByPage()
      }).catch(err => this.$message.error(err))
    },
    // 回显结果信息
    getdialogData(id) {
      getResultDataById(id).then(res => {
        // console.log(res)
        if (!res.imgUrl) this.fileList = []
        else {
          this.fileList = res.imgUrl.map(item => {
            const tmp = item.split('/')
            const name = tmp.length > 0 ? tmp[tmp.length - 1] : '文件'
            return { name: name, url: item }
          })
        }
        this.dialogData = res
        this.dialogData.id = id
      }).catch(err => this.$message.error(err))
    },
    // 修改结果
    updateResultData() {
      this.dialogData.imgUrl = this.fileList.filter(item => item.status === 'success').map(item => item.url)
      console.log('----------------------')
      updateResultData(this.dialogData.id, this.dialogData).then(res => {
        console.log('111111111111111111111111111111')
        const waitForUpload = this.fileList.filter(item => item.status === 'ready')
        if (waitForUpload.length > 0) {
          // 在表单提交成功之后再上传文件
          this.$nextTick(() => this.$refs.upload.submit())
        } else {
          this.getChildRecordDataByPage()
        }
      }).catch(err => this.$message.error(err))
    },
    // 页面操作
    // 返回上一页
    back() {
      this.$router.go(-1)
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
      if (fileList.length > 0 && fileList[fileList.length - 1].status === 'success') {
        this.getChildRecordDataByPage()
        if (this.act === 'add') this.$message.success('添加成功')
        else this.$message.success('更新成功')
      }
    },
    // 上传图片失败
    handleErrorPicture(response, file, fileList) {
    },
    // 点击添加按钮，弹框显示，并回显数据
    addResult(row) {
      this.childPlanRecordId = row.childPlanRecordId
      this.dialogVisible = true
      this.act = 'add'
      this.fileList = []
      this.dialogData = { id: row.childPlanRecordId, maintainRecord: '', result: '' }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    getResult(row) {
      this.childPlanRecordId = row.childPlanRecordId
      this.dialogVisible = true
      this.act = 'edit'
      this.getdialogData(row.childPlanRecordId)
    },
    // 弹框提交
    submitClick() {
      this.dialogVisible = false
      if (this.act === 'add') this.addResultData()
      else this.updateResultData()
    },
    // 弹框取消
    cancel() {
      this.dialogVisible = false
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
    }
  }
}
</script>

<style lang="scss">
@import "../../../styles/mobileStyle.scss";
.text /deep/ .weui-cells {
  font-size: 14px;
}
p /deep/ label.vux-label {
  font-weight: 350;
}
</style>
