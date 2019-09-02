<template>
  <div :id="chartId" style="height:250px;width:100%"></div>
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
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            axisTick: {
              alignWithLabel: true
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
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 390, 330, 220, 10, 52, 200]
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
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  height: 280px;
}
</style>

