<template>
  <div>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备消息类型" fixed align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.messageType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="报文" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.content}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getRunlogs"
      @current-change="getRunlogs"
      :current-page.sync="runlogsCurrentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="runlogsPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="runlogsTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { getRunlogs } from '@/api/deviceCenter/detile.js'

export default {
  props: ['machNo'],
  data() {
    return {
      // 表格总数据条数
      runlogsTotal: 0,
      // 当前页
      runlogsCurrentPage: 1,
      // 一页显示多少条数据
      runlogsPageSize: 10,
      tableData: []
    }
  },
  watch: {
    machNo: function (val) {
      this.machNo = val
    }
  },
  created() {
    this.getRunlogs()
  },
  mounted() {
    this.$on('getRunlogs', (val) => {
      this.getRunlogs()
    })
  },
  methods: {
    getRunlogs() {
      const params = { machNo: this.machNo }
      getRunlogs(this.runlogsCurrentPage, this.runlogsPageSize, params).then(res => {
        this.tableData = res.list
        this.runlogsTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
