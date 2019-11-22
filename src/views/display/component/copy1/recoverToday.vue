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
      chartId: 'recoverTodayEchart',
      options: {
        title: {
          text: '',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}' + 'kg' + ' ({d}%)'
        },
        color: ['#F9A459', '#BDD947', '#51D297', '#878BBC'],
        backgroundColor: '#001F32',
        // stillShowZeroSum: false,
        series: [
          {
            name: '今日统计',
            type: 'pie',
            radius: ['35%', '60%'],
            center: ['50%', '50%'],
            data: [
              { name: '纸类制品', value: 154 },
              { name: '金属制品', value: 109 },
              { name: '布料制品', value: 572 },
              { name: '塑料制品', value: 154 }
            ],
            label: {
              normal: {
                formatter: '{b|{b}}\n{hr|}\n{c|{c}}kg',
                rich: {
                  c: {
                    lineHeight: 20,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '',
                    width: '100%',
                    margin: -20,
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    lineHeight: 20,
                    fontSize: '24rem',
                    align: 'center'
                  }
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(128, 128, 128, 0.5)'
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
