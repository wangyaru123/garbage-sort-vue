<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">机器人关节角度</div>
      <div :id="chartId" class="chart-style"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  data() {
    return {
      // ***** xxy ************************
      clearTimeSet: '', // 定时器
      // ***** xxy ************************
      chartId: 'overviewRobotInfoEchart',
      // 图标中数据个数
      totalNumber: 30,
      options: {
        grid: {
          top: 30,
          left: 40,
          right: 15,
          bottom: 60
        },
        legend: {
          // orient: 'vertical',
          top: 'bottom',
          left: 'center',
          textStyle: {
            color: 'grey'
          },
          data: [
            { name: '1', icon: 'circle' },
            { name: '2', icon: 'circle' },
            { name: '3', icon: 'circle' },
            { name: '4', icon: 'circle' },
            { name: '5', icon: 'circle' },
            { name: '6', icon: 'circle' }
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
          // padding: [5, 10]
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#535d69'
            }
          }
        },
        series: [
          {
            name: '1',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            itemStyle: {
              color: 'yellow'
            },
            data: []
          },
          {
            name: '2',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            itemStyle: {
              color: 'blue'
            },
            data: []
          },
          {
            name: '3',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            itemStyle: {
              color: 'gray'
            },
            data: []
          },
          {
            name: '4',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            itemStyle: {
              color: 'red'
            },
            data: []
          },
          {
            name: '5',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            itemStyle: {
              color: 'orange'
            },
            data: []
          },
          {
            name: '6',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            itemStyle: {
              color: 'green'
            },
            data: []
          }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
    this.initChart()
    this.updateResize()
    this.setTime()
  },
  beforeDestroy() {
    this.closeResize()
    clearInterval(this.clearTimeSet)
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  watch: {
    //  手机端的时候，默认isMobile是false，在变化时尺寸没有修改，则图表不会自适应
    isMobile(newValue, oldValue) {
      if (this.chart) {
        this.chart.resize()
      }
    }
  },
  methods: {
    // ******* xxy ************************************************
    setTime() {
      this.clearTimeSet = setInterval(() => {
        this.chart.setOption(this.options)
      }, 500)
    },
    // ******* xxy ************************************************
    initChart() {
      for (let i = 0; i < 300; i++) {
        this.options.xAxis.data.push(this.$dayjs().subtract(300 - i, 'second').format('HH:mm:ss:SSS'))
        this.options.series[0].data.push(0)
        this.options.series[1].data.push(0)
        this.options.series[2].data.push(0)
        this.options.series[3].data.push(0)
        this.options.series[4].data.push(0)
        this.options.series[5].data.push(0)
      }
      this.chart = this.$echarts.init(document.getElementById(this.chartId))
      this.chart.setOption(this.options)
    },
    // 更新图表中的数据
    updateDataChart(data, time) {
      if (!this.chart) return
      if (data == null) return
      if (this.options.xAxis.data.length < 300) {
        this.options.xAxis.data.push(time)
      } else {
        this.options.xAxis.data.shift()
        this.options.xAxis.data.push(time)
      }
      for (let i = 0; i < 6; i++) {
        if (this.options.series[i].data.length < 300) {
          this.options.series[i].data.push(data[i])
        } else {
          this.options.series[i].data.shift()
          this.options.series[i].data.push(data[i])
        }
        // this.chart.setOption(this.options)
      }
      // this.chart.dispose()
    },
    //  自动适配宽度
    updateResize() {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) this.chart.resize()
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    // 关闭自适应事件
    closeResize() {
      window.removeEventListener('resize', this.__resizeHanlder)
      if (!this.chart) return
      this.chart.dispose()
      this.chart = null
    }
  }
}
</script>

<style lang="scss" scoped>
.main-style {
  background-color: #001e31;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: inset 0px 0px 4px 0px #00ffff;
}
.corner {
  position: absolute;
  width: 25px;
  height: 25px;
}
.top-left-corner {
  top: -1px;
  left: -1px;
  border-left: 3px solid #009fff;
  border-top: 3px solid #009fff;
}
.top-right-corner {
  top: -1px;
  right: -1px;
  border-right: 3px solid #009fff;
  border-top: 3px solid #009fff;
}
.bottom-left-corner {
  bottom: -1px;
  left: -1px;
  border-left: 3px solid #009fff;
  border-bottom: 3px solid #009fff;
}
.bottom-right-corner {
  bottom: -1px;
  right: -1px;
  border-right: 3px solid #009fff;
  border-bottom: 3px solid #009fff;
}

.content {
  width: 100%;
  height: 100%;
  padding: 10px;
  .title {
    font-size: 20px;
    height: 30px;
    padding-left: 10px;
    color: #dee3e6;
    background: -webkit-linear-gradient(left, #00d1fa, #064975, #001e31);
  }
}
.chart-style {
  width: 100%;
  height: calc(100% - 30px);
}
</style>
