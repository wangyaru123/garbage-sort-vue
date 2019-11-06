<template>
  <!-- 日历表 -->
  <div :class="isMobile?'':'p-10'">
    <!-- 移动端 -->
    <div v-if="isMobile">
      <div></div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-calendar v-model="today" :range="['2019-06-24', '2019-08-24']">
        <template slot="dateCell" slot-scope="{date, data}" :data="planData">
          <div class="con-div">{{ data.day.split('-').slice(1).join('-') }} {{compare(date)}}</div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script>
import { getMonthPlan } from '@/api/maintainModule/monthPlan.js'
import { parseTime } from '@/utils/index'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  data() {
    return {
      today: new Date(),
      count: 0,
      planData: [
        // { '2019-07-15': 'xxx' ，data:【{}，{}】},
        // { '2019-07-25': 'xxx' }
        {
          equipmentId: 0,
          equipmentModel: 'string',
          equipmentName: 'string',
          planId: 0,
          pmNumber: 0,
          
          preventiveTime: '2019-07-15',
          remarks: 'string',
          status: true
        },
        {
          equipmentId: 0,
          equipmentModel: 'string',
          equipmentName: 'string',
          planId: 0,
          pmNumber: 0,
          preventiveTime: '2019-07-25',
          remarks: 'string',
          status: true
        }
      ]
    }
  },
  created() {
    // this.getMonthPlan()
  },
  methods: {
    getMonthPlan() {
      console.log(parseTime(new Date()))
      getMonthPlan(parseTime(new Date())).then(res => {
        const planData = res
        planData.forEach(item => {
          // 下次保养时间超过当前时间，则是按计划完成，否则是未按计划完成
          const isPlan = Date.parse(item.preventiveTime) > Date.parse(parseTime(new Date()))
          item.color = isPlan ? '#F56C6C' : '#67C23A'
        })
        this.planData = planData
      }).catch(err => this.$message.error(err.toString()))
    },
    compare(date) {
      const tmp = this.planData.filter(item => this.$dayjs(item.preventiveTime).set('hour', 8).set('minute', 0).set('second', 0).isSame(date))
      if (tmp && tmp.length !== 0) {
        return JSON.stringify(tmp[0].remarks)
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/mobileStyle.scss";
.con-div {
  width: 100%;
  height: 100%;
}
</style>
