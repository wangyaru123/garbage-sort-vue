<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><strong>{{headerName}}</strong></span>
    </div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="序号" width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <template v-if="tableType==='sensor'">
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column label="PLC地址" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.plcAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使能状态" align="center">
          <template slot-scope="scope">
            <span class="light" :class="scope.row.enable? 'open':'close'"></span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    headerName: String,
    tableData: Array,
    tableType: String
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.light {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: white;
  margin: 0px auto;
  border-radius: 50%;
}
.open {
  background: #67c23a;
}
.close {
  background: #b6b3b3;
}
.vux-table {
  width: 100%;
  line-height: 30px;
  border-radius: 5px;
}
</style>
