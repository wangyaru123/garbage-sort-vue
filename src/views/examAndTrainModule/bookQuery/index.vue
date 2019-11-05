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
    </el-tabs>
  </div>
</template>

<script>
import { getBookList } from '@/api/examAndTrainModule/bookQuery'
import unTrainBook from './components/unTrainBook.vue'
import trainBook from './components/trainBook.vue'

export default {
  components: {
    unTrainBook,
    trainBook
  },
  data() {
    return {
      activeName: 'unTrainBook',
      // 未完成预约数据
      unTrainBookList: [],
      unTrainBookTotal: 0,
      unTrainBookCurrentPage: 1,
      unTrainBookPageSize: 10,
      // 历史预约数据
      trainBookList: [],
      trainBookTotal: 0,
      trainBookCurrentPage: 1,
      trainBookPageSize: 10
    }
  },
  created() {
    this.getUnTrainBookList()
  },
  methods: {
    handleClick(tab) {
      console.log(tab.name)
      if (tab.name === 'unTrainBook') this.getUnTrainBookList()
      else if (tab.name === 'trainBook') this.getTrainBookList()
    },
    getUnTrainBookList() {
      console.log('getunTrainBookList')
      const condition = { isTrained: false }
      getBookList(this.unTrainBookCurrentPage, this.unTrainBookPageSize, condition).then(res => {
        this.unTrainBookList = res.list
        this.unTrainBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    getTrainBookList() {
      console.log('getTrainBookList')
      const condition = { isTrained: true }
      getBookList(this.trainBookCurrentPage, this.trainBookPageSize, condition).then(res => {
        this.trainBookList = res.list
        this.trainBookTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
