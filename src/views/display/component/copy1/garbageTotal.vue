<template>
  <div class="main-style">
    <div style="font-size: 20px;height: 40px;line-height: 40px;padding-left: 25px;">各类垃圾今日量</div>
    <div :id="chartId" class="chart-style"></div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  data() {
    return {
      chartId: 'garbageTotalEchart',
      options: {
        color: ['#3398DB'],
        backgroundColor: '#001F32',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['可回收物', '有害垃圾', '厨余垃圾', '其他垃圾'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            lineStyle: {
              color: '#e6e6e6'
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [623, 146, 243, 235],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'insideTop',
                  textStyle: {
                    color: '#fff',
                    fontSize: 16
                  }
                }
              }
            }
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
  width: 100%;
  height: 100%;
  background: url("../../../assets/displaybg.png");
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
