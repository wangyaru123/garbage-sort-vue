<template>
  <div class="main-style">
    <!-- <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>-->
    <div class="content">
      <div class="title">各小区排名</div>
      <div :id="chartId" class="chart-style"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  data() {
    return {
      chartId: 'rankEchart',
      options: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#77b1ee'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          offset: 10,
          data: ['杭州凤起小区', '杭州高沙小区', '杭州下沙小区', '杭州云水小区', '广州龙湖小区', '苏州名苑小区'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#77b1ee'
            }
          }
        },
        series: [
          // {
          //   type: 'bar',
          //   data: [1823, 12389, 22934, 30490, 43744, 53020]
          // },
          // {
          //   type: 'bar',
          //   itemStyle: {
          //     normal: { color: 'rgba(0,0,0,0.05)' }
          //   },
          //   barGap: '-100%',
          //   barCategoryGap: '40%',
          //   data: [60000, 60000, 60000, 60000, 60000, 60000],
          //   animation: false
          // },
          {
            type: 'bar',
            barWidth: '50%',
            smooth: true,
            label: {
              normal: {
                show: true,
                position: 'right',
                offset: [2, 2],
                textStyle: {
                  color: '#F68300'
                  // fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 8,
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#3977E6' },
                    { offset: 1, color: '#0DF6C6' }
                  ]
                )
              },
              emphasis: {
                barBorderRadius: 8
              }
            },
            data: [12123, 19389, 22934, 30490, 43744, 53020]
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
  // background-color: #001e31;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: inset 0px 0px 4px 0px #00ffff;
}
.chart-style {
  width: 100%;
  height: 90%;
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
  box-shadow: inset 1px 1px 1px 0px #00ffff;
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
  // padding: 10px;
  .title {
    font-size: 20px;
    height: 30px;
    color: #dee3e6;
    text-align: center;
    // background: -webkit-linear-gradient(left, #00d1fa, #064975, #001e31);
    background: url(../../../assets/titlebg.png) no-repeat;
    // background-size: cover;
    background-position: center center;
  }
}
.data {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 30px);
  width: 100%;
}
.data-style {
  border-bottom: 1px solid #124667;
  // height: 35px;
  margin: 0px 0px;
  padding: 5px 0px;
  .school {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
