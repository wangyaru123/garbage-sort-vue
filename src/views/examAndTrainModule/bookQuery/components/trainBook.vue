<template>
  <div>
    <el-table :data="trainBookList" class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" fixed align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.bookTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训时间" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训时段" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.periodName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="学校" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.schoolName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备编码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['trainBookList'],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
