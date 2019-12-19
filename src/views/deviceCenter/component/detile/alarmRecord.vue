<template>
  <div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="序号" width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警类型" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.warnType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警时间" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警重量" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.temp}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getWarns"
      @current-change="getWarns"
      :current-page.sync="errorCurrentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="errorPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="errorTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { getWarns } from '@/api/deviceCenter/detile.js'

export default {
  props: ['machNo'],
  data() {
    return {
      // 表格总数据条数
      errorTotal: 0,
      // 当前页
      errorCurrentPage: 1,
      // 一页显示多少条数据
      errorPageSize: 10,
      tableData: []
    }
  },
  watch: {
    machNo: function (val) {
      this.machNo = val
    }
  },
  created() {
    this.getWarns()
  },
  mounted() {
    this.$on('getWarns', (val) => {
      this.getWarns()
    })
  },
  methods: {
    getWarns() {
      const params = { machNo: this.machNo }
      getWarns(this.errorCurrentPage, this.errorPageSize, params).then(res => {
        this.tableData = res.list
        this.errorTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
