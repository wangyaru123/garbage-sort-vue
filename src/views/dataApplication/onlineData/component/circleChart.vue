<template>
  <div>
    <div :id="chartId" class="chart-style"></div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  // 父组件传入的属性值
  props: {
    chartId: null,
    titleName: null,
    chartData: null
  },
  data() {
    return {
      chart: null,
      chartOptions: {
        title: {
          text: this.titleName,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{d}%'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['在线', '离线']
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: this.chartData,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{d}%',
                  position: 'inner'
                }
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  mounted() {
    this.initChart()
    this.updateResize()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // 初始化图表
    initChart() {
      this.chart = echarts.init(document.getElementById(this.chartId))
      this.chart.setOption(this.chartOptions)
    },
    //  自动适配宽度
    updateResize() {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    // 清除图表数据
    clearChartData() {
      this.chartOptions.xAxis.data.length = 0
      for (var i = 0; i < 6; i++) {
        this.chartOptions.series[i].data.length = 0
      }
      // 重新初始化
      for (i = 0; i < 300; i++) {
        this.chartOptions.xAxis.data.push(this.$dayjs().subtract(300 - i, 'second').format('HH:mm:ss'))
        for (var j = 0; j < 6; j++) {
          this.chartOptions.series[j].data.push(0)
        }
      }
      this.chart.setOption(this.chartOptions)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-style {
  width: 100%;
  height: 300px;
}
</style>
