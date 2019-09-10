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
          @size-change="getfileUserByPage"
          @current-change="getfileUserByPage"
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
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getfileUserByPage"
          @current-change="getfileUserByPage"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getfileUserByPage } from '@/api/fileModule/index.js'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
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
    this.getfileUserByPage()
  },
  methods: {
    // 获取公司列表
    getfileUserByPage() {
      getfileUserByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 预览文件
    viewPDF(row) {
      window.open(row.fileUrl[0])
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
