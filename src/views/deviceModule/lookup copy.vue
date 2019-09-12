<template>
  <div class="p-10">
    <el-select v-model="schoolId" size="small" placeholder="请选择" @change="getDeviceInfoByPage">
      <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
    </el-select>
    <el-row :gutter="10" class="text-c">
      <el-col :span="8" class="mt-10">
        <el-card>
          <img :src="aImg" />
        </el-card>
      </el-col>
      <el-col :span="8" class="bind mt-10">
        <el-card>
          <img :src="aBindImg" />
        </el-card>
      </el-col>
      <el-col :span="8" class="mt-10">
        <el-card>
          <img :src="bImg" />
        </el-card>
      </el-col>
      <el-col :span="8" class="bind mt-10">
        <el-card>
          <img :src="bBindImg" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 设备详情 -->
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
import { getSchoolList } from '@/api/ucenter/school.js'
import { getDeviceInfoByPage, getDeviceInfoById, editDeviceInfoById, addDeviceInfo, deleteDeviceInfoById } from '@/api/deviceModule.js'
import aImg from '@/assets/A.png'
import bImg from '@/assets/B.png'
import aBindImg from '@/assets/Abind.png'
import bBindImg from '@/assets/Bbind.png'

export default {
  data() {
    return {
      aImg,
      bImg,
      aBindImg,
      bBindImg,
      schoolId: '',
      schoolList: []
    }
  },
  created() {
    // 获取学校列表
    this.getSchoolList()
    // 获取设备列表
    this.getDeviceInfoByPage()
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
.bind /deep/ .el-card__body {
  background-color: #ccffff;
}
</style>
