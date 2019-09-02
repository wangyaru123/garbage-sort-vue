<template>
  <div id="analyseIoSequence" class="chart-style"></div>
</template>

<script>
import { debounce } from '@/utils'
export default {
  data() {
    return {
      // 总个数
      total: 80,
      number: 3,
      // 图表对象
      chart: null,
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'shadow'
          },
          showContent: false
        },
        animation: false,
        axisPointer: {
          link: { xAxisIndex: 'all' }
        },
        // dataZoom: [{
        //   type: 'inside',
        //   start: 0,
        //   end: 100
        // }, {
        //   start: 0,
        //   end: 10,
        //   handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //   handleSize: '80%',
        //   handleStyle: {
        //     color: '#fff',
        //     shadowBlur: 3,
        //     shadowColor: 'rgba(0, 0, 0, 0.6)',
        //     shadowOffsetX: 2,
        //     shadowOffsetY: 2
        //   }
        // }],
        grid: {
          left: 130,
          right: 20,
          top: 10
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4']
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          // { type: 'custom', animation: false, renderItem: this.renderItem, name: '喷枪清洗水路1', data: [0, 1, 0, 0] },
          // { type: 'custom', animation: false, renderItem: this.renderItem, name: '喷枪清洗气路', data: [1, 1, 0, 1] },
          // { type: 'custom', animation: false, renderItem: this.renderItem, name: '喷枪2开启', data: [0, 0, 1, 0] }
        ]
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    },
    chartHeight() {
      const tmp = (this.number * 25) + 'px'
      return { height: tmp }
    }
  },
  created() {
  },
  beforeDestroy() {
    this.clearResizeHandle()
  },
  mounted() {
    this.initChart()
    this.doResizeHandle()
  },
  methods: {
    //  初始化图形
    initChart() {
      this.chart = this.$echarts.init(document.getElementById('analyseIoSequence'))
      this.chart.setOption(this.options)
    },
    //  处理缩放
    doResizeHandle() {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    clearResizeHandle() {
      window.removeEventListener('resize', this.__resizeHanlder)
      if (!this.chart) return
      this.chart.dispose()
      this.chart = null
    },
    // 渲染每个单元数据
    renderItem(params, api) {
      // 高度的缩减比例
      const rate = 0.3
      // 存放所有点数据
      var points = []
      // 每个单元的宽度
      var width = api.size([0, 0])[0]
      // 每个单元的高度
      var height = api.size([0, 0])[1]
      // 获取当前点的值
      const before = api.value(1, params.dataIndex)
      // 获取下一个点的值
      const after = api.value(1, params.dataIndex + 1)
      // 获取对应点在画布上的位置
      var position = api.coord([params.dataIndex, params.seriesIndex])
      // 计算第1个点和第2个点的坐标
      var point1 = [position[0] - width / 2, position[1] + height * rate * (before ? -1 : 1)]
      var point2 = [position[0] + width / 2, position[1] + height * rate * (before ? -1 : 1)]
      points.push(point1)
      points.push(point2)
      if (!isNaN(after)) {
        // 计算第3个点的坐标
        const point3 = [point2[0], point2[1] + height * rate * 2 * (before === after ? 0 : (after ? -1 : 1))]
        points.push(point3)
      }
      let color = '#c23531'
      // if ((before === 1 && after === 0) || (before === 0 && after === 1) || (before === 1 && after === 1) || (isNaN(after) && before === 1)) color = '#67C23A'
      if ((before === 1 && after === 0) || (before === 1 && after === 1) || (isNaN(after) && before === 1)) color = '#67C23A'
      // 画对应的波形图
      return {
        type: 'polyline',
        shape: {
          points: points
        },
        style: api.style({
          fill: null,
          // stroke: api.visual('color'),
          stroke: color,
          lineWidth: 1
        })
      }
    },
    // 更新数据
    updateData(ioDatas) {
      // 更新x轴数据
      if (this.options.xAxis.data.length > this.total) this.options.xAxis.data.shift()
      this.options.xAxis.data.push(this.$dayjs().format('HH:mm:ss'))

      // 更新图表数据
      for (let i = 0, length = this.options.series.length; i < length; i++) {
        if (this.options.series[i].data.length > this.total) this.options.series[i].data.shift()
        this.options.series[i].data.push(ioDatas[i])
      }
      this.chart.setOption(this.options, { lazyUpdate: true })
    },
    // 重置图表
    resetChart(titles) {
      this.number = titles.length
      this.options.xAxis.data.length = 0
      this.options.series.length = 0
      this.options.yAxis.data.length = 0
      // 重置x轴
      for (let i = 0; i < this.total; i++) {
        this.options.xAxis.data.push(this.$dayjs().subtract(this.total - i, 'second').format('HH:mm:ss'))
      }
      // 重置y轴
      this.options.yAxis.data = titles
      // 重置图表数据
      for (let i = 0, length = titles.length; i < length; i++) {
        const data = []
        for (let j = 0; j < this.total; j++) data.push(0)
        this.options.series.push({
          type: 'custom', animation: false, renderItem: this.renderItem, name: titles[i], data: data
        })
      }
      // 在下一个异步更新周期中更新图表
      this.$nextTick(() => {
        // this.chart.resize({
        //   opts: { height: 'auto' }
        // })
        this.chart.setOption(this.options, { lazyUpdate: true })
        console.log('切换数据，图表高度为：' + this.chart.getHeight())
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.chart-style {
  width: 100%;
  height: 750px;
}
</style>
