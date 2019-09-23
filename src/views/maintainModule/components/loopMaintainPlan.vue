<template>
  <!-- 添加循环保养计划 -->
  <el-row>
    <el-col :span="20" :offset="2">
      <el-row class="p-10 text-c">
        <el-col :span="8">距离今天天数</el-col>
        <el-col :span="4">循环次数</el-col>
        <el-col :span="12">备注</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="p-10">
          <el-input v-model="maintainData.distanceTime"></el-input>
        </el-col>
        <el-col :span="4" class="p-10">
          <el-input v-model="maintainData.pmNumber"></el-input>
        </el-col>
        <el-col :span="12" class="p-10">
          <el-input v-model="maintainData.remarks"></el-input>
        </el-col>
      </el-row>
      <el-row class="p-10 text-c">
        <el-button type="primary" size="small" @click="submit">提交</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { addLoopMaintainPlan } from '@/api/maintainModule/addMaintainPlan.js'

export default {
  props: ['id'],
  data() {
    return {
      // 要添加的保养计划数据
      maintainData: { distanceTime: 1, pmNumber: 1, remarks: '' }
    }
  },
  methods: {
    // 提交
    submit() {
      addLoopMaintainPlan(this.id, this.maintainData).then(res => {
        this.$message.success('提交成功')
        this.maintainData = { distanceTime: 1, pmNumber: 1, remarks: '' }
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}

</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>

<style lang="scss" >
.el-table__expanded-cell[class*="cell"] {
  padding: 10px;
}
</style>
