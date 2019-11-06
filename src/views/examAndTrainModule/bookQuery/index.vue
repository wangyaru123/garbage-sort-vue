<template>
  <!-- 预约查询 -->
  <div class="p-10">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未完成的培训预约" name="unTrainBook">
        <unTrainBook :unTrainBookList="unTrainBookList"></unTrainBook>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getUnTrainBookList"
          @current-change="getUnTrainBookList"
          :current-page.sync="unTrainBookCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="unTrainBookPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="unTrainBookTotal"
        ></el-pagination>
      </el-tab-pane>
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
      <el-tab-pane label="历史培训预约" name="trainBook">
        <trainBook :trainBookList="trainBookList"></trainBook>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getTrainBookList"
          @current-change="getTrainBookList"
          :current-page.sync="trainBookCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="trainBookPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="trainBookTotal"
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
import { getTrainBookList, getExamBookList } from '@/api/examAndTrainModule/bookQuery'
import unTrainBook from './components/unTrainBook.vue'
import unExamBook from './components/unExamBook.vue'
import trainBook from './components/trainBook.vue'
import examBook from './components/examBook.vue'

export default {
  components: {
    unTrainBook,
    unExamBook,
    trainBook,
    examBook
  },
  data() {
    return {
      activeName: 'unTrainBook',
      // 未完成预约培训数据
      unTrainBookList: [],
      unTrainBookTotal: 0,
      unTrainBookCurrentPage: 1,
      unTrainBookPageSize: 10,
      // 未完成预约考核数据
      unExamBookList: [],
      unExamBookTotal: 0,
      unExamBookCurrentPage: 1,
      unExamBookPageSize: 10,
      // 历史预约培训数据
      trainBookList: [],
      trainBookTotal: 0,
      trainBookCurrentPage: 1,
      trainBookPageSize: 10,
      // 历史预约考核数据
      examBookList: [],
      examBookTotal: 0,
      examBookCurrentPage: 1,
      examBookPageSize: 10
    }
  },
  created() {
    this.getUnTrainBookList()
  },
  methods: {
    handleClick(tab) {
      if (tab.name === 'unTrainBook') this.getUnTrainBookList()
      else if (tab.name === 'unExamBook') this.getUnExamBookList()
      else if (tab.name === 'trainBook') this.getTrainBookList()
      else if (tab.name === 'examBook') this.getExamBookList()
    },
    // 未完成预约培训数据
    getUnTrainBookList() {
      console.log('getunTrainBookList')
      const condition = { isTrained: false }
      getTrainBookList(this.unTrainBookCurrentPage, this.unTrainBookPageSize, condition).then(res => {
        this.unTrainBookList = res.list
        this.unTrainBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
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
    getTrainBookList() {
      console.log('getTrainBookList')
      const condition = { isTrained: true }
      getTrainBookList(this.trainBookCurrentPage, this.trainBookPageSize, condition).then(res => {
        this.trainBookList = res.list
        this.trainBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 历史预约培训数据
    getExamBookList() {
      console.log('getExamBookList')
      const condition = { isTrained: true }
      getExamBookList(this.trainBookCurrentPage, this.trainBookPageSize, condition).then(res => {
        this.examBookList = res.list
        this.examBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
