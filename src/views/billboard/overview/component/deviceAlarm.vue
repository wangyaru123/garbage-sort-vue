<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="data-content">
      <div class="title">报警统计</div>
      <div :id="chartId" class="chart-style"></div>
      <el-row type="flex" justify="space-between" class="data-style">
        <span class="data-name">报警总数：</span>
        <span class="data-value">211</span>
      </el-row>
      <el-row type="flex" justify="space-between" class="data-style">
        <span class="data-name">今日报警：</span>
        <span class="data-value">17</span>
      </el-row>
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
        color: ['#9fcee2', '#eae0ab'],
        legend: {
          orient: 'horizontal',
          left: 'center',
          top: '5%',
          textStyle: {
            color: 'white'
          },
          data: ['报警总数', '今日报警']
        },
        radius: [0, '10%'],
        series: [
          {
            name: '设备在线',
            type: 'pie',
            radius: '71%',
            center: ['45%', '60%'],
            data: [
              { value: 520, name: '报警总数' },
              { value: 310, name: '今日报警' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{d}%', // 模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontFamily: '微软雅黑',
                  fontSize: 16,
                  fontWeight: 'bolder',
                  color: 'green'
                }
              },
              emphasis: {
                show: true
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
.data-content {
  width: 100%;
  height: 100%;
  padding: 10px;
  .title{
    font-size: 22px;
  }
}
.chart-style {
  width: 100%;
  height: 70%;
}
.data-style{
  text-align: center;
}
.data-name {
  font-size: 16px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.data-value {
  font-size: 20px;
  margin-right: 20px;
}
</style>
