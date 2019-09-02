<template>
  <!-- 设备保养知识库 -->
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
          @size-change="getTableData"
          @current-change="getTableData"
          :current-page.sync="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix flexbox">
            <div>设备名称:{{ item.equipmentName }}</div>
          </div>
          <div class="text item">
            <group>
              <cell title="设备保养类别" :value="item.category"></cell>
              <cell title="保养周期" :value="item.maintainCycle"></cell>
              <cell title="保养等级" :value="item.maintainLevel"></cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button type="primary" round size="mini" @click="addRow">添加设备保养知识库</el-button>
        <span class="ml-20">设备名称：</span>
        <el-select v-model="equipment" placeholder="请选择" size="small" @change="getData">
          <el-option v-for="item in deviceNameList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
        </el-select>
        <span class="ml-20">设备类别：</span>
        <el-select v-model="categoryId" placeholder="请选择" size="small" @change="getData">
          <el-option v-for="item in categoryList" :key="item.categoryId" :value="item.categoryId" :label="item.category"></el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-5">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.equipmentName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备保养类别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.category }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养周期" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.maintainCycle }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养等级" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.maintainLevel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                v-if="scope.row.maintainDocumentUrl && scope.row.maintainDocumentUrl.length>0"
                size="mini"
                @click="viewPDF( scope.row )"
              >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getTableData"
          @current-change="getTableData"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
      <!-- 添加或编辑设备弹框 -->
      <el-dialog :visible.sync="dialogVisible" title="请填写" class="width-20">
        <el-form label-position="right" label-width="150px" :model="dialogData">
          <el-form-item label="设备名称：">
            <el-input v-model="dialogData.equipmentName"></el-input>
          </el-form-item>
          <el-form-item label="设备保养类别：">
            <el-select v-model="dialogData.categoryId" placeholder="请选择" size="small" @change="getCycleData">
              <el-option v-for="item in categoryList" :key="item.categoryId" :value="item.categoryId" :label="item.category"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保养等级：">
            <el-select v-model="dialogData.maintainLevel" placeholder="请选择" size="small" @change="getCycleData">
              <el-option v-for="item in maintainLevelList" :key="item.maintainLevel" :value="item.maintainLevel" :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保养周期：">
            <el-input v-model="dialogData.maintainCycle"></el-input>
          </el-form-item>
          <el-form-item label="上传文档:">
            <el-upload
              class="upload-demo"
              ref="upload"
              :headers="headers"
              :auto-upload="false"
              :action="uploadActionUrl"
              :file-list="fileList"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
              :on-change="changeFile"
              :on-success="handleSuccessPicture"
              :on-error="handleErrorPicture"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
import { getLibraryByPage, getLibraryById, addLibrary, updateLibrary, deleteLibrary } from '@/api/maintainModule/deviceMaintainLibrary.js'
import { getCategoryList, getCycleData } from '@/api/maintainModule/rules/level1.js'
import { getDeviceNameList } from '@/api/deviceModule.js'
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
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
    uploadActionUrl() {
      return process.env.VUE_APP_HTTP_MAINTAIN + '/maintain/docs/_upload/' + this.knowledgeBaseId
    }
  },
  data() {
    return {
      // 下拉框选择设备
      equipment: '',
      // 下拉框选择类别
      categoryId: '',
      // 类别列表
      categoryList: [],
      // 设备名称类别
      deviceNameList: [],
      // 等级列表
      maintainLevelList: [
        { maintainLevel: 1, desc: '一级' },
        { maintainLevel: 2, desc: '二级' },
        { maintainLevel: 3, desc: '三级' }
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
      // 上传文件列表
      fileList: [],
      // 添加还是编辑标志
      act: 'add',
      // 弹框数据
      dialogData: { equipmentName: '', categoryId: '', maintainLevel: '', maintainCycle: '', fileList: [] },
      // 知识库id
      knowledgeBaseId: ''
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // api
    // 获取设备名称列表
    getDeviceNameList() {
      getDeviceNameList().then(res => {
        this.deviceNameList = res
      }).catch(err => this.$message.error(err))
    },
    // 获取设备保养类型列表
    getCategoryList() {
      getCategoryList().then(res => {
        this.categoryList = res
      }).catch(err => this.$message.error(err))
    },
    // 获取表格数据
    getTableData() {
      Promise.all([
        this.getDeviceNameList(),
        this.getCategoryList()
      ]).then(() => {
        this.getData()
      }).catch(err => this.$message.error(err))
    },
    // 获取表格数据
    getData() {
      const params = {}
      if (this.equipment) params.equipment = this.deviceNameList.filter(item => item.equipmentId === this.equipment)[0].equipmentName
      if (this.categoryId) params.category = this.categoryList.filter(item => item.categoryId === this.categoryId)[0].category
      getLibraryByPage(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 回显
    getdialogData(id) {
      getLibraryById(id).then(res => {
        this.dialogData = res
        this.knowledgeBaseId = this.dialogData.knowledgeBaseId
        if (!res.maintainDocumentUrl) this.fileList = []
        else {
          this.fileList = res.maintainDocumentUrl.map(item => {
            const tmp = item.split('/')
            const name = tmp.length > 0 ? tmp[tmp.length - 1] : '文件'
            return { name: name, url: item }
          })
        }
      }).catch(err => this.$message.error(err))
    },
    // 获取周期数据
    getCycleData() {
      const params = {
        category: this.categoryList.filter(item => item.categoryId === this.dialogData.categoryId)[0].category,
        level: this.dialogData.maintainLevel
      }
      if (params.category && params.level) {
        getCycleData(params).then(res => {
          if (res.length === 1) this.dialogData.maintainCycle = res[0].timeInterval
        }).catch(err => this.$message.error(err))
      }
    },
    // 添加
    addTableData() {
      this.dialogData.category = this.categoryList.filter(item => item.categoryId === this.dialogData.categoryId)[0].category
      addLibrary(this.dialogData).then(res => {
        this.knowledgeBaseId = res
        this.$nextTick(() => this.$refs.upload.submit())
        this.getTableData()
      }).catch(err => this.$message.error(err))
    },
    // 编辑
    editTableData(id) {
      this.dialogData.category = this.categoryList.filter(item => item.categoryId === this.dialogData.categoryId)[0].category
      this.dialogData.maintainDocumentUrl = this.fileList.filter(item => item.status === 'success').map(item => item.url)
      updateLibrary(id, this.dialogData).then(res => {
        const waitForUpload = this.fileList.filter(item => item.status === 'ready')
        if (waitForUpload.length > 0) {
          // 在表单提交成功之后再上传文件
          this.$nextTick(() => this.$refs.upload.submit())
        } else {
          this.getTableData()
        }
      }).catch(err => this.$message.error(err))
    },
    // 删除
    deleteTableData(id) {
      deleteLibrary(id).then(res => {
        this.$message.success('删除成功')
        this.getTableData()
      }).catch(err => this.$message.error(err))
    },
    // 页面操作
    // 上传图片前的校验
    beforeAvatarUpload(file) {
      const isPDF = file.type === 'application/pdf'
      const isLimit = file.size / 1024 / 1024 < 15
      if (!isPDF) {
        this.$message.error('上传文件只能是pdf格式!')
      }
      if (!isLimit) {
        this.$message.error('上传文件大小不能超过15MB!')
      }
      return isPDF && isLimit
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
    handleSuccessPicture(response, file, fileList) {
      if (fileList.length > 0 && fileList[fileList.length - 1].status === 'success') {
        this.getTableData()
        if (this.act === 'add') this.$message.success('添加成功')
        else this.$message.success('更新成功')
      }
    },
    // 上传失败
    handleErrorPicture(response, file, fileList) {
    },
    // 点击添加按钮，弹框显示，并回显数据
    addRow(row) {
      this.dialogVisible = true
      this.act = 'add'
      this.fileList = []
      this.dialogData = { equipmentName: '', categoryId: '', maintainLevel: '', maintainCycle: '' }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogVisible = true
      this.act = 'edit'
      this.getdialogData(row.knowledgeBaseId)
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(row.knowledgeBaseId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 预览文件
    viewPDF(row) {
      window.open(row.maintainDocumentUrl[0])
    },
    // 弹框提交
    submitClick() {
      this.dialogVisible = false
      if (this.act === 'add') this.addTableData()
      else this.editTableData(this.dialogData.knowledgeBaseId)
    },
    // 弹框取消
    cancel() {
      this.dialogVisible = false
      this.dialogData = { equipmentName: '', categoryId: '', maintainLevel: '', maintainCycle: '' }
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
