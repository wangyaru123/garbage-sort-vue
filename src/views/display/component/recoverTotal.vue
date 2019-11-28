<template>
  <div class="main-style">
    <!-- <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>-->
    <div class="content">
      <div class="title">各类回收物累计量</div>
      <div :id="chartId" class="chart-style"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  data() {
    return {
      chartId: 'recoverTotalEchart',
      options: {
        title: {
          text: '',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}' + 'kg' + ' ({d}%)'
        },
        color: ['#409EFF', '#BDD947', '#15DFCC', '#878BBC'],
        grid: {
          left: '3%',
          right: '4%',
          top: '3%',
          bottom: '3%',
          containLabel: true
        },
        // backgroundColor: '#001F32',
        // stillShowZeroSum: false,
        series: [
          {
            name: '今日统计',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '50%'],
            data: [
              { name: '纸类制品', value: 1540 },
              { name: '金属制品', value: 1090 },
              { name: '布料制品', value: 3720 },
              { name: '塑料制品', value: 2540 }
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
  // background-color: #001e31;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: inset 0px 0px 4px 0px #00ffff;
}
.chart-style {
  width: 100%;
  height: 70%;
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
