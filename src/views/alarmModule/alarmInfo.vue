<template>
  <!-- 报警模块 -->
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
          :current-page.sync="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix">
            <el-tag :type="item.isSubmit ? 'primary' : 'danger'" disable-transitions>{{ item.isSubmit ? "已提交" : "未提交" }}</el-tag>
          </div>
          <div class="text item">开始时间：{{item.solveTime}}</div>
          <div class="text item">结束时间：{{item.startTime}}</div>
          <div class="text item">报警描述：{{item.alarmContent}}</div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row class="top-row">
        <span>开始时间：</span>
        <el-date-picker
          v-model="startTime"
          size="small"
          :disabled="!isSelectByCondition"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="fetchData"
        ></el-date-picker>
        <span class="ml-20">结束时间：</span>
        <el-date-picker
          v-model="solveTime"
          size="small"
          :disabled="!isSelectByCondition"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="fetchData"
        ></el-date-picker>
        <span class="ml-20">是否提交：</span>
        <el-switch v-model="conIsSubmit" :disabled="!isSelectByCondition" @change="fetchData"></el-switch>
        <el-checkbox class="float-r check-style" v-model="isSelectByCondition" @change="fetchData">是否按照条件查询</el-checkbox>
      </el-row>
      <el-row>
        <el-table class="mt-5" :data="tableData" border stripe>
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" width="200px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" width="200px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.solveTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="报警信息" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.alarmContent }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150px" prop="isSubmit" label="是否提交报警" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isSubmit ? 'primary' : 'danger'" disable-transitions>{{ scope.row.isSubmit ? "已提交" : "未提交" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" align="center" v-if="updeteAuth">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" :disabled="scope.row.isSubmit" @click="editRow(scope.row)"></el-button>
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
          :hide-on-single-page="true"
        ></el-pagination>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="请填写报警信息（以下都是必填项、图片最多上传4张）">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="报警信息：">
          <span>{{ dialogData.alarmContent }}</span>
        </el-form-item>
        <el-form-item label="开始时间：">
          <span>{{ dialogData.startTime }}</span>
        </el-form-item>
        <el-form-item label="结束时间：">
          <span>{{ dialogData.solveTime }}</span>
        </el-form-item>
        <el-form-item label="故障时间：">
          <el-date-picker v-model="editAlarmInfo.faultTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="故障区域：">
          <el-input v-model="editAlarmInfo.faultRegion"></el-input>
        </el-form-item>
        <el-form-item label="报警描述：">
          <el-input type="textarea" v-model="editAlarmInfo.alarmDescription"></el-input>
        </el-form-item>
        <el-form-item label="维修费用：">
          <el-input v-model="editAlarmInfo.maintainCost"></el-input>
        </el-form-item>
        <el-form-item label="报警图片：">
          <el-upload
            enctype="multipart/form-data"
            ref="upload"
            :auto-upload="false"
            :headers="headers"
            :action="uploadActionUrl"
            multiple
            list-type="picture-card"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccessPicture"
            :on-error="handleErrorPicture"
            :file-list="fileList"
            :limit="4"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImgVisible" :modal-append-to-body="false" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitAlarmInfo">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAlarmInfoByPage, getAlarmInfoById, saveAlarmInfo, updateAlarmInfo } from '@/api/alarmModule.js'
import { parseTime } from '@/utils/index'
import dayjs from 'dayjs'

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
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('maintain_alarm_add')
    }
  },
  data() {
    return {
      // 是否按照条件来筛选
      isSelectByCondition: false,
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
      dialogImgVisible: false,
      // 上传图片路径
      dialogImageUrl: '',
      // 要保存的报警信息初始化
      editAlarmInfo: { alarmDescription: '', alarmImg: [], alarmInfoId: 1, faultRegion: '', faultTime: parseTime(new Date()), maintainCost: 1 },
      // 更新标识数据初始化
      updateAlarmData: { isSubmit: true, solveTime: parseTime(new Date()) },
      // 上传结束标志
      uploadFinished: 0,
      // 上传图片缓存
      fileList: [],
      // 多条件筛选
      // 开始时间
      startTime: ['', ''],
      // 结束时间
      solveTime: ['', ''],
      // 是否提交
      conIsSubmit: true
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
      const params = {}
      if (this.isSelectByCondition) {
        params.isSubmit = this.conIsSubmit
        if (this.startTime[0]) params.beginStart = dayjs(this.startTime[0]).format('YYYY-MM-DD HH:mm:ss')
        if (this.startTime[1]) params.endStart = dayjs(this.startTime[1]).format('YYYY-MM-DD HH:mm:ss')
        if (this.solveTime[0]) params.beginSolve = dayjs(this.solveTime[0]).format('YYYY-MM-DD HH:mm:ss')
        if (this.solveTime[1]) params.endSolve = dayjs(this.solveTime[1]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        // 清空条件
        this.startTime = ['', '']
        this.solveTime = ['', '']
      }
      getAlarmInfoByPage(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // pageSize改变时触发
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData()
    },
    // 页数改变时触发
    handleCurrentChange(val) {
      this.fetchData()
    },
    // 根据id回显数据
    editTableData(id) {
      getAlarmInfoById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err))
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogVisible = true
      this.editAlarmInfo.alarmInfoId = row.alarmInfoId
      this.editTableData(row.alarmInfoId)
    },
    // 上传图片前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp'
      const isLimit = file.size / 1024 / 1024 < 15
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg,jpeg, png,gif,bmp格式!')
      }
      if (!isLimit) {
        this.$message.error('上传头像图片大小不能超过 15MB!')
      }
      return isJPG && isLimit
    },
    // 删除图片
    handleRemove(file, fileList) {
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogImgVisible = true
    },
    // 成功上传图片到服务器
    handleSuccessPicture(response, file, fileList) {
      console.log('上传成功')
      this.uploadFinished++
      const imgUrl = response.data[0]
      this.editAlarmInfo.alarmImg.push(imgUrl)
      if (this.uploadFinished === fileList.length) {
        this.saveAndUploadAlarmInfo()
      }
    },
    // 上传图片失败
    handleErrorPicture(response, file, fileList) {
      console.log('上传失败')
      this.uploadFinished++
      if (this.uploadFinished === fileList.length) {
        this.saveAndUploadAlarmInfo()
      }
    },
    // 保存报警信息
    submitAlarmInfo() {
      // 必填项检验
      if (this.editAlarmInfo.alarmDescription === '' || this.editAlarmInfo.alarmImg === [] || this.editAlarmInfo.faultRegion === '') {
        this.$message.error('必填项不能为空')
        return false
      }
      this.uploadFinished = 0
      // 上传图片
      this.$refs.upload.submit()
      // 将字符串转化数字类型
      this.editAlarmInfo.maintainCost = Number(this.editAlarmInfo.maintainCost)
    },
    saveAndUploadAlarmInfo() {
      // 清空图片缓存
      this.fileList = []
      // 关闭弹窗
      this.dialogVisible = false
      // 保存报警信息
      Promise.all([
        // 保存提交报警表的信息
        saveAlarmInfo(this.editAlarmInfo),
        // 更新解决时间和是否提交报警表标识
        updateAlarmInfo(this.editAlarmInfo.alarmInfoId, this.updateAlarmData)
      ]).then(() => {
        // 重新刷新表格数据
        this.fetchData()
        // 提示
        this.$message.success('提交成功')
        // 要提交的编辑信息初始化
        this.editAlarmInfo = { alarmDescription: '', alarmImg: [], alarmInfoId: 1, faultRegion: '', faultTime: parseTime(new Date()), maintainCost: 1 }
      }).catch(err => this.$message.error(err))
    },
    // 点击取消，隐藏弹窗,清空图片缓存
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
      this.fileList = []
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/mobileStyle.scss";
.top-row /deep/ .el-input__inner {
  width: 260px;
}
.top-row /deep/ .el-range-separator {
  padding: 0;
  width: 6%;
}
.check-style {
  height: 32px;
  line-height: 32px;
}
</style>
