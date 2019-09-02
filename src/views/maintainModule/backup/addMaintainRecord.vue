<template>
  <!-- 添加或编辑保养记录 -->
  <div class="p-10">
    <el-row>
      <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
      <span>设备名称:{{$route.query.name}}</span>
    </el-row>
    <el-form
      label-position="right"
      label-width="120px"
      :model="maintainRecordData"
      :class="isMobile?'mt-10':''"
      ref="ruleForm"
      :rules="formRules"
    >
      <el-form-item label="维护保养项目：" prop="pmItem">
        <el-input v-model="maintainRecordData.pmItem"></el-input>
      </el-form-item>
      <el-form-item label="维修保养情况：" prop="pmSituation">
        <el-input v-model="maintainRecordData.pmSituation"></el-input>
      </el-form-item>
      <el-form-item label="维修保养结果:" prop="pmResult">
        <el-input v-model="maintainRecordData.pmResult"></el-input>
      </el-form-item>
      <el-form-item label="上传文档:">
        <el-upload
          v-if="maintainRecordData.annexUrl.length===0"
          class="upload-demo"
          :headers="headers"
          :action="uploadActionUrl"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="changeFile"
          :on-success="handleSuccess"
          :on-error="handleError"
          :limit="1"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <ul class="el-upload-list el-upload-list--text" v-if="maintainRecordData.annexUrl.length===1">
          <li class="el-upload-list__item is-success">
            <a class="el-upload-list__item-name">
              <a :href="maintainRecordData.annexUrl[0]" target="_blank">
                <i class="el-icon-document">保养文档</i>
              </a>
            </a>
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-circle-check"></i>
            </label>
            <i class="el-icon-close" @click="deleteAnnexUrl"></i>
            <i class="el-icon-close-tip">按 delete 键可删除</i>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="maintainRecordData.remark"></el-input>
      </el-form-item>
      <div :class="isMobile?'':'mt-50'" class="text-c">
        <el-button type="primary" size="medium" @click="submitClick">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addMaintainRecord, getMaintainRecord, editMaintainRecord } from '@/api/maintainModule/addMaintainRecord.js'

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
    // upload组件上传pdf文件的Action路由地址
    uploadActionUrl() {
      return process.env.VUE_APP_HTTP_MAINTAIN + '/equipment/docs/_upload'
    }
  },
  data() {
    return {
      // 保养数据
      maintainRecordData: { annexUrl: [] },
      fileList: [],
      // 表单规则
      formRules: {
        pmItem: [{ required: true, message: '必填' }],
        pmSituation: [{ required: true, message: '必填' }],
        pmResult: [{ required: true, message: '必填' }]
      }
    }
  },
  created() {
    // 若是查看，则回显数据
    if (this.$route.query.action === 'edit') this.getMaintainRecord()
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1)
    },
    // 回显数据
    getMaintainRecord() {
      getMaintainRecord(this.$route.query.id)
        .then(res => {
          this.maintainRecordData = res[0]
        })
        .catch(err => this.$message.error(err))
    },
    // 编辑保养信息
    editMaintainRecord() {
      editMaintainRecord(this.maintainRecordData.pmDocRecordId, this.maintainRecordData)
        .then(res => {
          this.$message.success('修改成功')
          this.back()
        })
        .catch(err => this.$message.error(err))
    },
    // 添加保养信息
    addMaintainRecord() {
      addMaintainRecord(this.$route.query.id, this.maintainRecordData)
        .then(res => {
          this.$message.success('添加成功')
          this.back()
        })
        .catch(err => this.$message.error(err))
    },
    // 删除已有的url
    deleteAnnexUrl() {
      this.maintainRecordData.annexUrl = []
      this.fileList = []
    },
    // 上传前的校验
    beforeAvatarUpload(file) {
      const isPDF = file.type === 'application/pdf'
      const isLimit = file.size / 1024 / 1024 < 15
      if (!isPDF) {
        this.$message.error('上传文件只能是pdf格式!')
      }
      if (!isLimit) {
        this.$message.error('上传头像图片大小不能超过15MB!')
      }
      return isPDF && isLimit
    },
    // 放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    // 删除事件,将filelist赋值,用来标识是否有图片
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 添加事件,将filelist赋值,用来标识是否有图片
    changeFile(file, fileList) {
      this.fileList = fileList
    },
    // 成功上传到服务器
    handleSuccess(response, file, fileList) {
      this.maintainRecordData.annexUrl = response.data
    },
    // 上传失败
    handleError(response, file, fileList) {
    },
    submitClick() {
      // 校验必填项
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项')
          return false
        } else {
          // 校验文档是否上传
          if (this.maintainRecordData.annexUrl.length === 0) {
            this.$message.error('请上传文档')
            return false
          }
          // 执行保存
          if (this.$route.query.action === 'add') this.addMaintainRecord()
          else this.editMaintainRecord()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
