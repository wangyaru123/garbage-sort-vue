<template>
  <div>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数描述" fixed align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.machineSerialNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数说明" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.errorCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="默认值" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.suggest}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数范围" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.errorTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数值" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.errorTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.errorTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getErrorByPage"
      @current-change="getErrorByPage"
      :current-page.sync="errorCurrentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="errorPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="errorTotal"
    ></el-pagination>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
</style>
