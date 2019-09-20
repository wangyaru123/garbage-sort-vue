
<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">按省分布</div>
      <div :id="chartId" class="map-style"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import 'echarts/map/js/china'

var data = [
  { name: '北京', value: 9 },
  { name: '天津', value: 12 },
  { name: '上海', value: 12 },
  { name: '重庆', value: 12 },
  { name: '河北', value: 14 },
  { name: '河南', value: 15 },
  { name: '云南', value: 16 },
  { name: '辽宁', value: 18 },
  { name: '黑龙江', value: 18 },
  { name: '湖南', value: 19 },
  { name: '安徽', value: 21 },
  { name: '山东', value: 21 },
  { name: '新疆', value: 21 },
  { name: '江苏', value: 22 },
  { name: '浙江', value: 233 },
  { name: '江西', value: 24 },
  { name: '湖北', value: 24 },
  { name: '广西', value: 25 },
  { name: '甘肃', value: 25 },
  { name: '山西', value: 25 },
  { name: '内蒙古', value: 25 },
  { name: '陕西', value: 25 },
  { name: '吉林', value: 25 },
  { name: '福建', value: 26 },
  { name: '贵州', value: 26 },
  { name: '广东', value: 26 },
  { name: '青海', value: 27 },
  { name: '西藏', value: 27 },
  { name: '四川', value: 27 },
  { name: '宁夏', value: 28 },
  { name: '海南', value: 29 },
  { name: '台湾', value: 30 },
  { name: '香港', value: 30 },
  { name: '澳门', value: 31 }
]

var geoCoordMap = {
  '北京': [116.46, 40.92],
  '天津': [117.2, 39.13],
  '上海': [121.48, 31.22],
  '重庆': [106.54, 29.59],
  '河北': [114.48, 38.03],
  '河南': [113.65, 34.76],
  '云南': [102.73, 25.04],
  '辽宁': [123.38, 41.8],
  '黑龙江': [126.63, 45.75],
  '湖南': [113, 27.21],
  '安徽': [117.27, 31.86],
  '山东': [117, 36.65],
  '新疆': [87.68, 43.77],
  '江苏': [121.78, 33.04],
  '浙江': [120.19, 30.26],
  '江西': [115.89, 28.68],
  '湖北': [114.31, 30.52],
  '广西': [108.33, 22.84],
  '甘肃': [103.73, 36.03],
  '山西': [112.53, 36.87],
  '内蒙古': [111.65, 40.82],
  '陕西': [108.95, 34.27],
  '吉林': [125.35, 43.88],
  '福建': [119.3, 26.08],
  '贵州': [106.71, 26.57],
  '广东': [113.23, 23.16],
  '青海': [98.74, 36.56],
  '西藏': [91.11, 29.97],
  '四川': [103.06, 30.67],
  '宁夏': [106.27, 38.47],
  '海南': [110.35, 20.02],
  '台湾': [122.1803, 22.5630],
  '香港': [116.15, 22.15],
  '澳门': [114.5, 21.2]
}

var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}

export default {
  data() {
    return {
      chartId: 'overviewDeviceMapEchart',
      chart: null,
      chartOptions: {
        backgroundColor: '#001e31',
        title: {
          x: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        visualMap: {
          min: 0,
          max: 200,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#005e99',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#188DF0'
            }
          }
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10
            },
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.name + ' : ' + params.value[2]
                }
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
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
      this.chart.setOption(this.chartOptions)
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
.map-style {
  width: 100%;
  height: calc(100% - 30px);
  // padding: 20px;
}
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
</style>
