<template>
  <!-- 添加单次保养计划 -->
  <el-row>
    <el-col :span="20" :offset="2">
      <el-row>
        <el-col :span="10" class="text-c">距离今天天数</el-col>
        <el-col :span="10" class="text-c">备注</el-col>
      </el-row>
      <el-row v-for="(item,index) in maintainData" :key="index">
        <el-col :span="11" class="p-10">
          <el-input v-model="item.distanceTime"></el-input>
        </el-col>
        <el-col :span="11" class="p-10">
          <el-input v-model="item.remarks"></el-input>
        </el-col>
        <el-col :span="2" class="p-10">
          <el-button size="small" icon="el-icon-plus" v-if="index===0" type="primary" circle @click="addRow(index)"></el-button>
          <el-button size="small" icon="el-icon-minus" v-else type="danger" circle @click="removeRow(index)"></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" class="text-c p-10">
          <el-button type="primary" size="small" @click="submit">提交</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { addSingleMaintainPlan } from '@/api/maintainModule/addMaintainPlan.js'

export default {
  props: ['id'],
  data() {
    return {
      // 要添加的保养计划数据
      maintainData: [{ distanceTime: 1, pmNumber: 1, remarks: '' }]
    }
  },
  methods: {
    // 添加一行
    addRow(index) {
      this.maintainData.push({ distanceTime: 1, pmNumber: index + 2, remarks: '' })
    },
    // 删除一行
    removeRow(rowIndex) {
      this.maintainData.splice(this.maintainData.findIndex((item, index) => index === rowIndex), 1)
    },
    // 提交
    submit() {
      console.log(this.maintainData)
      addSingleMaintainPlan(this.id, this.maintainData).then(res => {
        this.$message.success('提交成功')
        this.maintainData = [{ distanceTime: 1, pmNumber: 1, remarks: '' }]
      }).catch(err => this.$message.error(err))
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
