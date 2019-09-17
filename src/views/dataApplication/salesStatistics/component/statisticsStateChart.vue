<template>
  <div :id="chartId" style="width:100%;height:160px" :class="isMobile"></div>
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
            data: ['江苏省', '辽宁省', '甘肃省', '青海省', '江西省', '四川省', '云南省', '海南省', '广西省', '广东省', '河南省', '河北省', '山东省', '陕西省', '山西省', '浙江省', '黑龙江省'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 0,
              margin: 10,
              textStyle: {
                fontSize: ''
              }
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
            data: [10, 30, 29, 19, 35, 5, 52, 100, 88, 50, 30, 14, 80, 35, 5, 15, 60]
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
    if (this.$store.state.app.isMobile) {
      this.setMobileOption() // 更新手机端显示
    }
  },
  created() {
  },
  computed: {
    isMobile() {
      if (this.$store.state.app.isMobile) {
        this.setMobileOption()
      } else {
        // this.setPcOption()
      }
      return this.$store.state.app.isMobile
    }
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
    setMobileOption() { // 更新手机端显示
      this.options.xAxis[0].axisLabel.rotate = 45
      this.options.xAxis[0].axisLabel.margin = 5
      this.options.xAxis[0].axisLabel.textStyle.fontSize = 9
      this.chart.setOption(this.options)
    },
    setPcOption() { // 更新pc端显示
      this.options.xAxis[0].axisLabel.rotate = 0
      this.options.xAxis[0].axisLabel.margin = 10
      this.options.xAxis[0].axisLabel.textStyle.fontSize = 12
      this.chart.setOption(this.options)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

