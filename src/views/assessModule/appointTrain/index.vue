<template>
  <!-- 预约培训 -->
  <div class="p-10">
    <el-row>
      <span>请选择学校：</span>
      <el-select v-model="schoolId" placeholder="请选择" size="small">
        <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
      </el-select>
    </el-row>
    <el-row class="mt-10">
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{date, data}">
          <div class="con-div" @click="setdialogVisible">{{ data.day.split('-').slice(1).join('-') }}</div>
        </template>
      </el-calendar>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 日历数据
      value: new Date(),
      // 学校id
      schoolId: '',
      // 学校列表
      schoolList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.con-div {
  width: 100%;
  height: 100%;
}
</style>
