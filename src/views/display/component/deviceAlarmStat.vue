<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">报警统计</div>
      <div :id="chartId" class="chart-style"></div>
      <div class="data">
        <div class="data-style">
          <span class="data-name">报警总数：</span>
          <span class="data-value">86</span>
        </div>
        <div class="data-style">
          <span class="data-name">今日报警：</span>
          <span class="data-value">13</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  data() {
    return {
      chartId: 'overviewDeviceAlarmEchart',
      options: {
        grid: {
          top: 20,
          left: 40,
          right: 15,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7'],
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
        series: [{
          data: [12, 20, 15, 8, 7, 11, 13],
          type: 'bar'
        }]
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
  height: 70%;
}
.data {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: calc(30% - 30px);
}
.data-style {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.data-name {
  font-size: 16px;
  margin-left: 20px;
  color: #9b9e9b;
}
.data-value {
  font-size: 20px;
  margin-right: 20px;
}
</style>
