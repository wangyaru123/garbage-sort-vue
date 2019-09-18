<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title"></div>
      <div :id="chartId" class="chart-style"></div>
      <div class="data">
        <!--<div class="data-style">
          <span class="data-name">设备总数：</span>
          <span class="data-value">20</span>
        </div>-->
        <!--<div class="data-style">
          <span class="data-name">在线设备：</span>
          <span class="data-value">7</span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
export default {
  data() {
    return {
      chartId: 'gaugeRight',
      options: {
        title: {
        //   text: '速率'
          textStyle: {
            color: '#fff'
          }
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
            type: 'gauge',
            center: ['50%', '66%'],
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 18
              }
            },
            title: {
              textStyle: {
                color: '#13fbf2'
              }
            },
            data: [{ value: 50, name: '完成率' }],
            axisLine: {
              lineStyle: {
                color: [ // 表盘颜色
                  [0.3, '#13fbf2'], // 0-30%处的颜色
                  [0.7, '#5bf22c'], // 30%-70%处的颜色
                  [1, '#ff5c37'] // 70%-100%处的颜色
                ],
                width: 4 // 这个是修改宽度的属性
              }
            },
            splitLine: { // 分割线样式（及10、20等长线样式）
              show: false, // 不显示大的分割线
              length: 10,
              lineStyle: { // 属性lineStyle控制线条样式
                width: 1
              }
            },
            pointer: {
              width: 4, // 指针的宽度
              length: '90%', // 指针长度，按照半圆半径的百分比
              shadowColor: '#ccc', // 默认透明
              shadowBlur: 5
            },
            axisLabel: { // 文字样式（及“10”、“20”等文字样式）
              // show: false, // 隐藏刻度
              color: '#fff',
              distance: -26 // 文字离表盘的距离
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
    //box-shadow:0 0 5px #00ffff;
  }
  .corner {
    position: absolute;
    width: 25px;
    height: 25px;
  }
  /*
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
  }*/
  .content {
    width: 100%;
    height: 100%;
    padding: 10px;
    .title {
      font-size: 20px;
      height: 30px;
      padding-left: 10px;
      color: #dee3e6;
      // background: -webkit-linear-gradient(left, #00d1fa, #064975, #001e31);
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
    width: 100%
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
