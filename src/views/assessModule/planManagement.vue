<template>
  <!-- 计划管理 -->
  <div class="p-10">
    <el-row>
      <span>请选择学校：</span>
      <el-select v-model="schoolId" placeholder="请选择" size="small">
        <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
      </el-select>
    </el-row>
    <el-row class="mt-10">
      <el-calendar v-model="value"></el-calendar>
    </el-row>
  </div>
</template>

<script>
import { getSchoolList } from '@/api/ucenter/school.js'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  data() {
    return {
      value: new Date(),
      schoolId: '',
      schoolList: []
    }
  },
  created() {
    this.getSchoolList()
  },
  methods: {
    // 获取公司列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
