<template>
  <!-- 预约查询 -->
  <div class="p-10">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未完成的预约" name="unBook">
        <el-table :data="unBookList" class="mt-10">
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
          @size-change="getUnBookList"
          @current-change="getUnBookList"
          :current-page.sync="unBookCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="unBookPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="unBookTotal"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="历史预约" name="book">
        <el-table :data="bookList" class="mt-10">
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
          :current-page.sync="bookCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="bookPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="bookTotal"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getBookList } from '@/api/examAndTrainModule/bookQuery'

export default {
  data() {
    return {
      activeName: 'unBook',
      // 未完成预约数据
      unBookList: [],
      // 表格总数据条数
      unBookTotal: 0,
      // 当前页
      unBookCurrentPage: 1,
      // 一页显示多少条数据
      unBookPageSize: 10,
      // 历史预约数据
      bookList: [],
      // 表格总数据条数
      bookTotal: 0,
      // 当前页
      bookCurrentPage: 1,
      // 一页显示多少条数据
      bookPageSize: 10
    }
  },
  created() {
    this.getUnBookList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getUnBookList() {
      const condition = { isTrained: false }
      getBookList(this.unBookCurrentPage, this.unBookPageSize, condition).then(res => {
        console.log(res)
        this.unBookList = res.data
        this.unBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    getBookList() {
      const condition = { isTrained: true }
      getBookList(this.bookCurrentPage, this.bookPageSize, condition).then(res => {
        console.log(res)
        this.bookList = res.data
        this.bookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
