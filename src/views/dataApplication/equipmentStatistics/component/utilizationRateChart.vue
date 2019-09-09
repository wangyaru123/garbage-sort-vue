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
            data: ['2008', '2009', '2010', '2011', '2012', '2013', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0
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
            data: [10, 30, 20, 39, 65, 100, 10, 30, 20, 39, 65, 100, 50]
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

