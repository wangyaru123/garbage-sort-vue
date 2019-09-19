<template>
  <div :id="chartId" style="width:100%;height:240px"></div>
</template>

<script>
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
          text: '仪表盘'
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        // toolbox: {
        //   feature: {
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        series: [
          {
            name: '业务指标',
            min: 0,
            max: 100,
            type: 'gauge',
            splitNumber: 20, // 分割20份
            center: ['50%', '55%'],
            detail: {
              formatter: '自动',
              textStyle: {
                fontSize: 18,
                fontFamily: 'Microsoft YaHei'
              }
            },
            data: [{ value: 84, name: '运行模式' }], // 16 手动，50 自动，84 远程
            axisLine: {
              lineStyle: {
                color: [ // 表盘颜色
                  [0.3, '#91c7ae'], // 0-30%处的颜色
                  [0.7, '#63869e'], // 30%-70%处的颜色
                  [1, '#c23531'] // 70%-100%处的颜色
                ],
                width: 10 // 这个是修改宽度的属性
              }
            },
            splitLine: { // 分割线样式（及10、20等长线样式）
              show: false, // 不显示大的分割线
              length: 10,
              lineStyle: { // 属性lineStyle控制线条样式
                width: 2
              }
            },
            axisTick: { // 细分刻度线样式（及短线样式）
              length: 0
            },
            pointer: {
              width: 4, // 指针的宽度
              length: '90%', // 指针长度，按照半圆半径的百分比
              shadowColor: '#ccc', // 默认透明
              shadowBlur: 5
            },
            axisLabel: { // 文字样式（及“10”、“20”等文字样式）
              // show: false, // 隐藏刻度
              color: 'black',
              distance: -38, // 文字离表盘的距离
              formatter: function(v) {
                switch (v + '') {
                  case '15' : return '手动'
                  case '50' : return '等待自动'
                  case '85' : return '自动'
                }
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
    updateDataChart(data) {
      this.options.series[0].data[0].value = data
      this.options.series[0].data[0].name = '运行模式'
      this.options.series[0].detail.formatter = (data === 16 ? '手动' : data === 50 ? '等待自动' : '自动')
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

