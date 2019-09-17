<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">最近7天运行时长</div>
      <div :id="chartId" class="chart-style"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  data() {
    return {
      chartId: 'overviewRobotInfoEchart',
      // 图标中数据个数
      totalNumber: 50,
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
            { name: '1轴', icon: 'circle' },
            { name: '2轴', icon: 'circle' },
            { name: '3轴', icon: 'circle' },
            { name: '4轴', icon: 'circle' },
            { name: '5轴', icon: 'circle' },
            { name: '6轴', icon: 'circle' }
          ]
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
            name: '1轴',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            data: []
          },
          {
            name: '2轴',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            data: []
          },
          {
            name: '3轴',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            data: []
          },
          {
            name: '4轴',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            data: []
          },
          {
            name: '5轴',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            data: []
          },
          {
            name: '6轴',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
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
  },
  beforeDestroy() {
    this.closeResize()
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
    initData() {
    },
    initChart() {
      for (var i = 0; i < this.totalNumber; i++) {
        this.options.xAxis.data.push(this.$dayjs().subtract(this.totalNumber - i, 'second').format('HH:mm:ss'))
        for (var j = 0; j < 6; j++) {
          this.options.series[j].data.push(Math.random() * 100)
        }
      }
      this.chart = this.$echarts.init(document.getElementById(this.chartId))
      this.chart.setOption(this.options)
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
