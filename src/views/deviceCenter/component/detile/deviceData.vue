<template>
  <div>
    <el-row :gutter="10" class="deviceDataRow">
      <el-col :span="4" class="mt-10" v-for="(item,index) in deviceData" :key="index">
        <span>{{findDesc(item.recoverType)}}</span>
        <span>:</span>
        <span>{{ item.currentWeight}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getWeightcount } from '@/api/deviceCenter/detile.js'

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
      deviceData: [],
      recoverList: [
        { recoverType: '1', desc: '可回收垃圾' },
        { recoverType: '2', desc: '有害垃圾' },
        { recoverType: '3', desc: '厨余垃圾' },
        { recoverType: '4', desc: '其他垃圾' }
      ]
    }
  },
  watch: {
    machNo: function (val) {
      this.machNo = val
    }
  },
  created() {
    this.getWeightcount()
  },
  mounted() {
    this.$on('getWeightcount', (val) => {
      this.getWeightcount()
    })
  },
  methods: {
    getWeightcount() {
      const params = { machNo: this.machNo }
      getWeightcount(params).then(res => {
        this.deviceData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    findDesc(recoverType) {
      return this.recoverList.find(i => i.recoverType === recoverType).desc
    }
  }
}
</script>

<style lang="scss" scoped>
.deviceDataRow {
  padding: 50px;
}
</style>
