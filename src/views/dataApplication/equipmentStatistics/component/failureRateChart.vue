<template>
  <div :id="chartId" style="width:100%;height:220px"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
require('echarts/theme/macarons') // echarts theme
// const animationDuration = 6000

export default {
  // 父组件传入的属性值
  props: {
    chartId: null,
    titleName: null
  },
  data() {
    return {
      yAxis: [],
      chart: null,
      options: {
        title: {
          text: this.titleName,
          left: 'center'
        },
        color: ['#3398DB'],
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        // },
        grid: {
          left: 40,
          right: 10,
          top: 30,
          bottom: 30
        },
        xAxis: [
          {
            type: 'category',
            data: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00',
              '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
              '20:00', '21:00', '22:00', '23:00', '24:00'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 1
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '记录显示',
            type: 'bar',
            barWidth: '50%',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 10, 0, 0]
          }, {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#508DFF'
                }, {
                  offset: 1,
                  color: '#26C5FE'
                }])
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
    this.doResizeChart()
  },
  created() {
  },
  beforeDestroy() {
    this.closeResize()
  },
  methods: {
    // 初始化图表
    initChart() {
      this.chart = this.$echarts.init(document.getElementById(this.chartId))
      this.chart.setOption(this.options)
    },
    // 图表自适应处理
    doResizeChart() {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    // 关闭图表自适应
    closeResize() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    // 更新图表中的数据
    updateDataChart(data, time) {
      this.options.series[0].data = data
      this.options.xAxis[0].data = time
      this.chart.setOption(this.options)
    },
    // 清除图表数据
    clearChartData() {
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

