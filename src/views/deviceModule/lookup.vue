<template>
  <div class="p-10">
    <el-select v-model="schoolId" size="small" placeholder="请选择" @change="schoolChange">
      <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
    </el-select>
    <el-row class="mt-10">
      <el-col :span="8">
        <el-card>
          <img :src="aImg" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import aImg from '@/assets/A.jpg'
import bImg from '@/assets/B.jpg'

export default {
  data() {
    return {
      aImg,
      bImg,
      schoolId: 1,
      schoolList: [{ schoolId: 1, schoolName: '学校1' }, { schoolId: 2, schoolName: '学校2' }]
    }
  },
  methods: {
    schoolChange() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
