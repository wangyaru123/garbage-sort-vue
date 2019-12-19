<template>
  <div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="序号" width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备消息类型" align="center" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" align="center" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前值" align="center" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.param}}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改前" align="center" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.paramValueOld}}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改后" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.paramValueNew}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getOperationlogs"
      @current-change="getOperationlogs"
      :current-page.sync="operationlogsCurrentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="operationlogsPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="operationlogsTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { getOperationlogs } from '@/api/deviceCenter/detile.js'

export default {
  props: ['machNo'],
  data() {
    return {
      // 表格总数据条数
      operationlogsTotal: 0,
      // 当前页
      operationlogsCurrentPage: 1,
      // 一页显示多少条数据
      operationlogsPageSize: 10,
      tableData: []
    }
  },
  watch: {
    machNo: function (val) {
      this.machNo = val
    }
  },
  created() {
    this.getOperationlogs()
  },
  mounted() {
    this.$on('getOperationlogs', (val) => {
      this.getOperationlogs()
    })
  },
  methods: {
    getOperationlogs() {
      const params = { machNo: this.machNo }
      getOperationlogs(this.operationlogsCurrentPage, this.operationlogsPageSize, params).then(res => {
        this.tableData = res.list
        this.operationlogsTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
