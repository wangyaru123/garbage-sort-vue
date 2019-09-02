<template>
  <div>
    <div :id="chartId" class="chart-style" :class="isMobile? 'h-280':'h-320'"></div>
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
    legendData: null,
    initCommunicateData: null
  },
  data() {
    return {
      chart: null,
      chartOptions: {
        title: {
          text: this.titleName,
          top: 0,
          left: 'center'
        },
        legend: {
          //   orient: 'vertical',
          top: 'bottom',
          left: 'center',
          data: this.legendData
        },
        grid: {
          top: 40,
          left: 50,
          right: 20,
          bottom: 50
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
          // padding: [5, 10]
        },
        xAxis: {
          type: 'category',
          data: []
          // axisLabel: {
          //   color: '#FFF'
          // }
        },
        // color: '#1162ad',
        yAxis: {
          type: 'value',
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: this.legendData[0],
            type: 'line',
            data: []
          },
          {
            name: this.legendData[1],
            type: 'line',
            data: []
          },
          {
            name: this.legendData[2],
            type: 'line',
            data: []
          },
          {
            name: this.legendData[3],
            type: 'line',
            data: []
          },
          {
            name: this.legendData[4],
            type: 'line',
            data: []
          },
          {
            name: this.legendData[5],
            type: 'line',
            data: []
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
      for (var i = 0; i < 300; i++) {
        this.chartOptions.xAxis.data.push(this.$dayjs().subtract(300 - i, 'second').format('HH:mm:ss'))
        this.chartOptions.series[0].data.push(0)
        this.chartOptions.series[1].data.push(0)
        this.chartOptions.series[2].data.push(0)
        this.chartOptions.series[3].data.push(0)
        this.chartOptions.series[4].data.push(0)
        this.chartOptions.series[5].data.push(0)
      }
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
    updateDataChart(data, time) {
      if (!this.chart) return
      if (data == null) return
      if (this.chartOptions.xAxis.data.length < 300) {
        this.chartOptions.xAxis.data.push(time)
      } else {
        this.chartOptions.xAxis.data.shift()
        this.chartOptions.xAxis.data.push(time)
      }
      for (var i = 0; i < 6; i++) {
        if (this.chartOptions.series[i].data.length < 300) {
          this.chartOptions.series[i].data.push(data[i])
        } else {
          this.chartOptions.series[i].data.shift()
          this.chartOptions.series[i].data.push(data[i])
        }
      }
      this.chart.setOption(this.chartOptions)
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
}
.h-320 {
  height: calc((100vh - 374px) * 0.5);
}
.h-280 {
  height: 280px;
}
</style>
