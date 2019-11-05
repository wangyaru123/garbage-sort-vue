<template>
  <!-- 预约培训 -->
  <div class="p-10">
    <el-row>
      <span>请选择学校：</span>
      <el-select v-model="schoolId" placeholder="请选择" size="small" @change="changeSchool">
        <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
      </el-select>
    </el-row>
    <el-row class="mt-10">
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{date, data}">
          <div class="con-div">
            <div class="left">
              <span>{{ data.day.split('-').slice(1).join('-') }}</span>
              <h4 v-if="getItemStatus(date)===2">培训</h4>
            </div>
            <div class="right">
              <el-tag
                v-for="(period,index) in getItemPeriod(date)"
                :key="index"
                :type="index===1?'warning':'primary'"
                @click="toBookPage(period,date)"
              >{{period}}</el-tag>
            </div>
          </div>
        </template>
      </el-calendar>
    </el-row>
  </div>
</template>

<script>
import { getSchoolList, getSchoolById } from '@/api/ucenter/school.js'
import { getTrainsPlan } from '@/api/examAndTrainModule/bookTrain.js'

export default {
  data() {
    return {
      // 日历数据
      value: new Date(),
      // 学校id
      schoolId: '',
      // 学校列表
      schoolList: [],
      // 学校计划数据
      trainsPlanData: []
    }
  },
  created() {
    this.getSchoolList()
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
    // 改变学校时，重新请求学校单条信息和整月计划
    changeSchool() {
      this.getSchoolById()
      this.getTrainsPlan()
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
        return JSON.parse(tmp.periodName)
      } else {
        return []
      }
    },
    // 跳转到详情页
    toBookPage(period, date) {
      const schoolName = this.schoolList.find(item => item.schoolId === this.schoolId).schoolName
      this.$router.push({
        path: '/examAndTrainModule/trainDetails',
        query: { schoolId: this.schoolId, schoolName: schoolName, period: period, day: this.$dayjs(date).format('YYYY-MM-DD') }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.con-div {
  width: 100%;
  height: 100%;
  display: flex;
}
.con-div div {
  flex: 1;
}
.con-div /deep/ .left h4 {
  margin: 0;
}
.con-div /deep/ .left span {
  display: inline-block;
  line-height: 32px;
}
.con-div /deep/ .right .el-tag {
  display: block;
  width: 45px;
  height: 22px;
  margin-top: 5px;
  line-height: 22px;
}
</style>
