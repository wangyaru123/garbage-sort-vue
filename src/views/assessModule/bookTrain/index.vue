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
          <div class="con-div" @click="toBook">
            {{ data.day.split('-').slice(1).join('-') }}
            <el-tag v-if="getItemStatus(date)===1" type="success">考核</el-tag>
            <el-tag v-if="getItemStatus(date)===2" type="primary">培训</el-tag>
            <el-tag v-for="(period,index) in getItemPeriod(date)" :key="index" type="primary">{{period}}</el-tag>
          </div>
        </template>
      </el-calendar>
    </el-row>
  </div>
</template>

<script>
import { getSchoolList, getSchoolById } from '@/api/ucenter/school.js'
import { getTrainsPlan } from '@/api/assessModule/bookTrain.js'

export default {
  data() {
    return {
      // 日历数据
      value: new Date(),
      // 学校id
      schoolId: '',
      // 学校列表
      schoolList: [],
      // 时段列表
      periodNameList: [],
      // 学校计划数据
      trainsPlanData: []
    }
  },
  created() {
    this.getSchoolList()
    this.getPeriodNameList()
  },
  methods: {
    // 获取学校列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
        // 设置第一项选中
        this.schoolId = this.schoolList[0].schoolId
        this.getSchoolById()
        this.getTrainsPlan()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取单条学校信息
    getSchoolById() {
      getSchoolById(this.schoolId).then(res => {
        this.sort = res.sort
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取整月计划
    getTrainsPlan() {
      const monthTime = this.$dayjs().format('YYYY-MM')
      const params = { schoolId: this.schoolId, monthTime: monthTime }
      getTrainsPlan(params).then(res => {
        this.trainsPlanData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 回显考核培训标志
    getItemStatus(date) {
      const tmp = this.trainsPlanData.find(item => this.$dayjs(item.time).set('hour', 8).set('minute', 0).set('second', 0).isSame(date))
      if (tmp) {
        return tmp.status
      } else {
        return ''
      }
    },
    // 获取每一项时段
    getItemPeriod(date) {
      const tmp = this.trainsPlanData.find(item => this.$dayjs(item.time).set('hour', 8).set('minute', 0).set('second', 0).isSame(date))
      if (tmp) {
        return tmp.periodName
      } else {
        return []
      }
    },
    // 跳转到详情页
    toBook() {
      this.$router.push({
        path: '/assessModule/Book',
        query: { id: this.schoolId }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.con-div {
  width: 100%;
  height: 100%;
}
.con-div /deep/ .el-tag {
  display: block;
  width: 45px;
  margin-left: 50px;
}
</style>
