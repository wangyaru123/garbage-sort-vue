<template>
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
          @size-change="getfileAdminByPage"
          @current-change="getfileAdminByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div>{{item.fileName}}</div>
            <div class="text-r">
              <el-button type="primary" v-if="item.fileUrl && item.fileUrl.length>0" size="mini" @click="viewPDF( item )">查看</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-upload
          class="upload-demo"
          ref="upload"
          :headers="headers"
          :action="uploadActionUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccessPicture"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
        <el-table :data="tableData" border stripe class="mt-10">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.fileName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件查看" align="center">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.fileUrl && scope.row.fileUrl.length>0" size="mini" @click="viewPDF( scope.row )">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="发布" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isPublish" @change="publish($event,scope.row.id)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row.id )"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getfileAdminByPage"
          @current-change="getfileAdminByPage"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getfileAdminByPage, publishFile, deleteFile } from '@/api/fileModule/index.js'

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
      return process.env.VUE_APP_HTTP_FILE + '/file/_upload'
    }
  },
  data() {
    return {
      fileList: [],
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 新增还是编辑
      dialogAction: [],
      // 弹框显示
      dialogVisible: false,
      // 弹框数据
      dialogData: {}
    }
  },
  created() {
    this.getfileAdminByPage()
  },
  methods: {
    // 获取公司列表
    getfileAdminByPage() {
      getfileAdminByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 发布
    publishFile(id, params) {
      publishFile(id, params).then(res => {
        if (params.status === true) this.$message.success('发布成功')
        else this.$message.success('取消发布成功')
        this.getfileAdminByPage()
      }).catch(err => this.$message.error(err))
    },
    // 删除
    deleteFile(id) {
      deleteFile(id).then(res => {
        this.$message.success('删除成功')
        this.getfileAdminByPage()
      }).catch(err => this.$message.error(err))
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 成功上传图片到服务器
    handleSuccessPicture(response, file, fileList) {
      if (fileList.length > 0 && fileList[fileList.length - 1].status === 'success') {
        this.$message.success('上传成功')
        this.getfileAdminByPage()
        this.fileList = []
      }
    },
    publish($event, id) {
      console.log($event)
      const params = { status: $event }
      console.log(params)
      this.publishFile(id, params)
    },
    // 预览文件
    viewPDF(row) {
      window.open(row.fileUrl[0])
    },
    // 确认删除
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteFile(id))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
