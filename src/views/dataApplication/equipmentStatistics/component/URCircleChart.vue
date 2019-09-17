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
            data: [
              { name: '利用率', value: 50 }, { name: '', value: 50 }
            ],
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
    // 更新图表中的数据
    updateDataChart(data) {
      this.chartOptions.series[0].data[0] = data
      this.chartOptions.series[0].data[1] = 100 - data
      this.chart.setOption(this.chartOptions)
    },
    // 清除图表数据
    clearChartData() {
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-style {
  width: 100%;
  height: 220px;
}
</style>
