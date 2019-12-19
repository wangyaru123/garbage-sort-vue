<template>
  <div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="序号" width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关键字" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.param }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数描述" align="center" width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.paramDes}}</span>
        </template>
      </el-table-column>
      <el-table-column label="默认值" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.defaults}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数值" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.paramValue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数范围" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.refRange}}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100px">
        <template slot-scope="scope">
          <el-button @click="setParams(scope.row.machineSerialNum)" size="mini">设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getDeviceParams"
      @current-change="getDeviceParams"
      :current-page.sync="paramsCurrentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="paramsPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paramsTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { getDeviceParams, setParam } from '@/api/deviceCenter/detile.js'

export default {
  props: ['machNo'],
  data() {
    return {
      // 表格总数据条数
      paramsTotal: 0,
      // 当前页
      paramsCurrentPage: 1,
      // 一页显示多少条数据
      paramsPageSize: 10,
      tableData: []
    }
  },
  watch: {
    machNo: function (val) {
      this.machNo = val
    }
  },
  created() {
    this.getDeviceParams()
  },
  mounted() {
    this.$on('getDeviceParams', (val) => {
      this.getDeviceParams()
    })
  },
  methods: {
    getDeviceParams() {
      const params = { machNo: this.machNo }
      getDeviceParams(this.paramsCurrentPage, this.paramsPageSize, params).then(res => {
        this.tableData = res.list
        this.paramsTotal = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    setParams() {
      const params = {
        machNo: 'U010519060000',
        kaywords: '00',
        param: 15
      }
      setParam(params).then(res => {
        this.$message.success('修改成功')
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
