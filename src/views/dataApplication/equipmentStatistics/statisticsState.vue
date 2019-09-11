<template>
  <div class="mt-5">
    <el-row :gutter="5">
      <!--利用率1开始-->
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <div>
              <el-select size="small" v-model="rate.model" placeholder @change="changeRateModel">
                <el-option label="年利用率" value="1"></el-option>
                <el-option label="月利用率" value="2"></el-option>
                <el-option label="日利用率" value="3"></el-option>
                <el-option label="时利用率" value="4"></el-option>
              </el-select>
              <span style="margin-left: 10px" v-if="rate.isShowYear">年：</span>
              <el-date-picker v-if="rate.isShowYear" v-model="rate.year" type="year" format="yyyy 年" placeholder="选择年" @change="changeRateYear"></el-date-picker>
              <span style="margin-left: 10px" v-if="rate.isShowMouth">月：</span>
              <el-date-picker
                v-if="rate.isShowMouth"
                v-model="rate.mouth"
                type="month"
                format="yyyy 年 MM 月"
                placeholder="选择月"
                @change="changeRateMouth"
              ></el-date-picker>
              <span style="margin-left: 10px" v-if="rate.isShowDay">日：</span>
              <el-date-picker
                v-if="rate.isShowDay"
                v-model="rate.day"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                placeholder="选择日"
                @change="changeRateDay"
              ></el-date-picker>
              <span style="margin-left: 10px" v-if="rate.isShowTime">时间：</span>
              <el-date-picker
                v-if="rate.isShowTime"
                v-model="rate.time"
                type="datetimerange"
                size="small"
                is-range
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="changeRateTime"
              ></el-date-picker>
              <el-button type="primary" size="small" @click="searchRate">查询</el-button>
            </div>
          </div>
          <el-col :span="7">
            <circle-chart chartId="circleChart" ref="ratePieChart" titleName="设备利用率"></circle-chart>
          </el-col>
          <el-col :span="17">
            <utilizationRateChart chartId="utilizationRateChart" ref="rateBarChart" titleName="设备利用率"></utilizationRateChart>
          </el-col>
        </el-card>
      </el-col>
      <!--故障率2开始-->
      <el-col :span="24">
        <el-card class="mt-5">
          <div slot="header">
            <div>
              <el-select size="small" v-model="fault.model" placeholder @change="changeFaultModel">
                <el-option label="年故障率" value="1"></el-option>
                <el-option label="月故障率" value="2"></el-option>
                <el-option label="日故障率" value="3"></el-option>
                <el-option label="时故障率" value="4"></el-option>
              </el-select>
              <span style="margin-left: 10px" v-if="fault.isShowYear">年：</span>
              <el-date-picker
                v-if="fault.isShowYear"
                v-model="fault.year"
                type="year"
                format="yyyy 年"
                placeholder="选择年"
                @change="changeFaultYear"
              ></el-date-picker>
              <span style="margin-left: 10px" v-if="fault.isShowMouth">月：</span>
              <el-date-picker
                v-if="fault.isShowMouth"
                v-model="fault.mouth"
                type="month"
                format="yyyy 年 MM 月"
                placeholder="选择月"
                @change="changeFaultMouth"
              ></el-date-picker>
              <span style="margin-left: 10px" v-if="fault.isShowDay">日：</span>
              <el-date-picker
                v-if="fault.isShowDay"
                v-model="fault.day"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                placeholder="选择日"
                @change="changeFaultDay"
              ></el-date-picker>
              <span style="margin-left: 10px" v-if="fault.isShowTime">时间：</span>
              <el-date-picker
                v-if="fault.isShowTime"
                v-model="fault.time"
                type="datetimerange"
                size="small"
                is-range
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="changeFaultTime"
              ></el-date-picker>
              <el-button type="primary" size="small" @click="searchFault">查询</el-button>
            </div>
          </div>
          <el-col :span="7">
            <circle-chart-two chartId="circleChartTwo" ref="faultPieChart" titleName="故障率"></circle-chart-two>
          </el-col>
          <el-col :span="17">
            <failureRateChart chartId="failureRateChart" ref="faultBarChart" titleName="故障率"></failureRateChart>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import utilizationRateChart from './component/utilizationRateChart'
import CircleChart from './component/circleChart'
import failureRateChart from './component/failureRateChart'
import circleChartTwo from './component/circleChartTwo'
import { getRateByYear, getRateByMouth, getRateByDay, getRateByTime } from '@/api/dataBox/equipmentStatistics.js'

export default {
  components: {
    utilizationRateChart,
    CircleChart,
    failureRateChart,
    circleChartTwo
  },
  data: function () {
    return {
      // 利用率
      rate: {
        model: '3',
        isShowYear: false,
        isShowMouth: false,
        isShowDay: true,
        isShowTime: false,
        year: '',
        mouth: '',
        day: '',
        time: ''
      },
      // 故障率
      fault: {
        model: '3',
        isShowYear: false,
        isShowMouth: false,
        isShowDay: true,
        isShowTime: false,
        year: '',
        mouth: '',
        day: '',
        time: ''
      },
      // *****************
      mouth_data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      day_data: ['1', '2', '3', '4', '5', '6', '7', '8', '9',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
        '30', '31'],
      time_data: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00',
        '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00', '23:00', '24:00']
      // *****************
    }
  },
  created() {
  },
  mounted: function () {
    this.getRateByDay('rateBarChart', 'ratePieChart', { date: this.getLocalTime(new Date(), 3), ioType: 'I', byteIndex: 0, bitIndex: 0 })
    this.getRateByDay('faultBarChart', 'faultPieChart', { date: this.getLocalTime(new Date(), 3), ioType: 'I', byteIndex: 0, bitIndex: 0 })
  },
  beforeDestroy() {
  },
  methods: {
    // **** 利用率 **********************************************
    changeRateModel() { // 选择模式
      if (this.rate.model === '1') {
        this.rate.isShowYear = true
        this.rate.isShowMouth = this.rate.isShowDay = this.rate.isShowTime = false
        this.rate.year = this.rate.mouth = this.rate.day = this.rate.time = ''
      } else if (this.rate.model === '2') {
        this.rate.isShowMouth = true
        this.rate.isShowYear = this.rate.isShowDay = this.rate.isShowTime = false
        this.rate.year = this.rate.mouth = this.rate.day = this.rate.time = ''
      } else if (this.rate.model === '3') {
        this.rate.isShowDay = true
        this.rate.isShowYear = this.rate.isShowMouth = this.rate.isShowTime = false
        this.rate.year = this.rate.mouth = this.rate.day = this.rate.time = ''
      } else if (this.rate.model === '4') {
        this.rate.isShowTime = true
        this.rate.isShowYear = this.rate.isShowMouth = this.rate.isShowDay = false
        this.rate.year = this.rate.mouth = this.rate.day = this.rate.time = ''
      }
    },
    changeRateYear() { // 选择年的触发
    },
    changeRateMouth() { // 选择月的触发
    },
    changeRateDay() { // 选择日的触发
    },
    changeRateTime() { // 选择时的触发
    },
    searchRate() { // 提交 rate 时间
      if (this.rate.isShowYear && this.rate.year) { // 展示年利用率
        const param = { year: this.getLocalTime(this.rate.year, 1), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        this.getRateByYear('rateBarChart', 'ratePieChart', param)
      } else if (this.rate.isShowMouth && this.rate.mouth) { // 展示月利用率
        const param = { year: this.getLocalTime(this.rate.mouth, 1), month: this.getLocalTime(this.fault.mouth, 2), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        this.getRateByMouth('rateBarChart', 'ratePieChart', param)
      } else if (this.rate.isShowTime && this.rate.time) { // 展示时利用率
        const param = { startTime: this.getLocalTime(this.rate.time[0], 0), stopTime: this.getLocalTime(this.rate.time[1], 0), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        const bar_time = [this.getLocalTime(this.rate.time[0], 0) + ' 至 ' + this.getLocalTime(this.rate.time[1], 0)]
        this.getRateByTime('rateBarChart', 'ratePieChart', param, bar_time)
      } else if (this.rate.isShowDay && this.rate.day) { // 展示日利用率
        const param = { date: this.getLocalTime(this.rate.day, 3), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        this.getRateByDay('rateBarChart', 'ratePieChart', param)
      }
    },
    // **** 故障率 **********************************************
    changeFaultModel() { // 选择模式
      if (this.fault.model === '1') {
        this.fault.isShowYear = true
        this.fault.isShowMouth = this.fault.isShowDay = this.fault.isShowTime = false
        this.fault.year = this.fault.mouth = this.fault.day = this.fault.time = ''
      } else if (this.fault.model === '2') {
        this.fault.isShowMouth = true
        this.fault.isShowYear = this.fault.isShowDay = this.fault.isShowTime = false
        this.fault.year = this.fault.mouth = this.fault.day = this.fault.time = ''
      } else if (this.fault.model === '3') {
        this.fault.isShowDay = true
        this.fault.isShowYear = this.fault.isShowMouth = this.fault.isShowTime = false
        this.fault.year = this.fault.mouth = this.fault.day = this.fault.time = ''
      } else if (this.fault.model === '4') {
        this.fault.isShowTime = true
        this.fault.isShowYear = this.fault.isShowMouth = this.fault.isShowDay = false
        this.fault.year = this.fault.mouth = this.fault.day = this.fault.time = ''
      }
    },
    changeFaultYear() { // 选择年的触发
    },
    changeFaultMouth() { // 选择月的触发
    },
    changeFaultDay() { // 选择日的触发
    },
    changeFaultTime() { // 选择时的触发
    },
    // 提交 fault 时间
    searchFault() {
      if (this.fault.isShowYear && this.fault.year) {
        const param = { year: this.getLocalTime(this.fault.year, 1), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        this.getRateByYear('faultBarChart', 'faultPieChart', param)
      } else if (this.fault.isShowMouth && this.fault.mouth) {
        const param = { year: this.getLocalTime(this.fault.mouth, 1), month: this.getLocalTime(this.fault.mouth, 2), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        this.getRateByMouth('faultBarChart', 'faultPieChart', param)
      } else if (this.fault.isShowTime && this.fault.time) {
        const param = { startTime: this.getLocalTime(this.fault.time[0], 0), stopTime: this.getLocalTime(this.fault.time[1], 0), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        const bar_time = [this.getLocalTime(this.fault.time[0], 0) + ' 至 ' + this.getLocalTime(this.fault.time[1], 0)]
        this.getRateByTime('faultBarChart', 'faultPieChart', param, bar_time)
      } else if (this.fault.isShowDay && this.fault.day) {
        const param = { date: this.getLocalTime(this.fault.day, 3), ioType: 'I', byteIndex: 0, bitIndex: 0 }
        this.getRateByDay('faultBarChart', 'faultPieChart', param)
      }
    },
    // *** 公用方法 ***************************************************************************
    // 展示年利用率
    getRateByYear(refNameBar, refNamePie, param) {
      getRateByYear(param).then(res => {
        this.$refs[refNameBar].updateDataChart(res, this.mouth_data) // bar形图
        this.$refs[refNamePie].updateDataChart(this.getRate(res)) // pie形图
      }).catch(err => this.$message.error(err))
    },
    // 展示月利用率
    getRateByMouth(refNameBar, refNamePie, param) {
      getRateByMouth(param).then(res => {
        this.$refs[refNameBar].updateDataChart(res, this.day_data.slice(0, res.length))
        this.$refs[refNamePie].updateDataChart(this.getRate(res))
      }).catch(err => this.$message.error(err))
    },
    // 展示时利用率
    getRateByTime(refNameBar, refNamePie, param, bar_time) {
      getRateByTime(param).then(res => {
        this.$refs[refNameBar].updateDataChart([res], bar_time)
        this.$refs[refNamePie].updateDataChart(res)
      }).catch(err => this.$message.error(err))
    },
    // 展示日利用率
    getRateByDay(refNameBar, refNamePie, param) {
      getRateByDay(param).then(res => {
        this.$refs[refNameBar].updateDataChart(res, this.time_data)
        this.$refs[refNamePie].updateDataChart(this.getRate(res))
      }).catch(err => this.$message.error(err))
    },
    getLocalTime(_date, tem) { // 格式化时间
      const date = _date // 时间戳为10位需乘1000，为13位则不用
      const Y = date.getFullYear() // 年
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
      const D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日
      const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
      const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
      const SS = date.getMilliseconds() // 毫秒
      if (tem === 0) return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s + ':' + SS // yyyy-mm-dd hh:mm:ss
      if (tem === 1) return parseInt(Y)
      if (tem === 2) return parseInt(M)
      if (tem === 3) return Y + '-' + M + '-' + D
    },
    getRate(data) {
      let tem = 0
      data.forEach(v => {
        tem = tem + v
      })
      return tem / data.length
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
