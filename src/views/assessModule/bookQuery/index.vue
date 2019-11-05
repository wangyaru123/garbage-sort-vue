<template>
  <!-- 预约查询 -->
  <div class="p-10">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未完成的预约" name="unfinishedBook">
        <el-table :data="unfinishedBookList" class="mt-10">
          <el-table-column label="序号" fixed width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" fixed align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学校" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.testCenter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.testCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否开启预约" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.testDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始预约时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.periodName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束预约时间" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getBookList"
          @current-change="getBookList"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="历史预约" name="historyBook">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getBookList } from '@/api/assessModule/bookQuery'

export default {
  data() {
    return {
      activeName: 'unfinishedBook',
      unfinishedBookList: [],
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10
    }
  },
  created() {
    this.getBookList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getBookList() {
      getBookList(this.currentPage, this.pageSize).then(res => {
        console.log(res)
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
