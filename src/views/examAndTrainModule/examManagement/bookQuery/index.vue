<template>
  <!-- 预约查询 -->
  <div class="p-10">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未完成的考核预约" name="unExamBook">
        <unExamBook :unExamBookList="unExamBookList"></unExamBook>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getUnExamBookList"
          @current-change="getUnExamBookList"
          :current-page.sync="unExamBookCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="unExamBookPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="unExamBookTotal"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="历史考核预约" name="examBook">
        <examBook :examBookList="examBookList"></examBook>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getExamBookList"
          @current-change="getExamBookList"
          :current-page.sync="examBookCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="examBookPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="examBookTotal"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getExamBookList } from '@/api/examAndTrainModule/bookQuery'
import unExamBook from './components/unExamBook.vue'
import examBook from './components/examBook.vue'

export default {
  components: {
    unExamBook,
    examBook
  },
  data() {
    return {
      activeName: 'unExamBook',
      // 未完成预约考核数据
      unExamBookList: [],
      unExamBookTotal: 0,
      unExamBookCurrentPage: 1,
      unExamBookPageSize: 10,
      // 历史预约考核数据
      examBookList: [],
      examBookTotal: 0,
      examBookCurrentPage: 1,
      examBookPageSize: 10
    }
  },
  created() {
    this.getUnExamBookList()
  },
  methods: {
    handleClick(tab) {
      if (tab.name === 'unExamBook') this.getUnExamBookList()
      else if (tab.name === 'examBook') this.getExamBookList()
    },
    // 未完成预约考核数据
    getUnExamBookList() {
      console.log('getUnExamBookList')
      const condition = { isTrained: false }
      getExamBookList(this.unExamBookCurrentPage, this.unExamBookPageSize, condition).then(res => {
        this.unExamBookList = res.list
        this.unExamBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 历史预约培训数据
    getExamBookList() {
      console.log('getExamBookList')
      const condition = { isTrained: true }
      getExamBookList(this.examBookCurrentPage, this.examBookPageSize, condition).then(res => {
        this.examBookList = res.list
        this.examBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
