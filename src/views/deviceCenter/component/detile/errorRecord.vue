<template>
  <div>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障代码" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.err}}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障名称" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障状态说明" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.errorState}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.state?'1':'0'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="建议处理方式" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.solution}}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障时间" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.time}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getFaults"
      @current-change="getFaults"
      :current-page.sync="errorCurrentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="errorPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="errorTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { getFaults } from '@/api/deviceCenter/detile.js'

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
    this.getFaults()
  },
  mounted() {
    this.$on('getFaults', (val) => {
      this.getFaults(val)
    })
  },
  methods: {
    getFaults() {
      const params = { machNo: this.machNo }
      getFaults(this.errorCurrentPage, this.errorPageSize, params).then(res => {
        this.tableData = res.list
        this.errorTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
