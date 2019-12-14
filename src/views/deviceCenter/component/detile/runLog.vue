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
          <span>{{ scope.row.machineSerialNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.errorCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="报文" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.suggest}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getMachineRecordByPage"
      @current-change="getMachineRecordByPage"
      :current-page.sync="errorCurrentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="errorPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="errorTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { getMachineRecordByPage } from '@/api/deviceCenter/detile.js'

export default {
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
  mounted() {
    this.getMachineRecordByPage()
  },
  methods: {
    getMachineRecordByPage() {
      getMachineRecordByPage(this.errorCurrentPage, this.errorPageSize).then(res => {
        this.tableData = res.list
        this.errorTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
