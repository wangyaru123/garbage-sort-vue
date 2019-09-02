<template>
  <!-- 数据应用首页 -->
  <div :class="isMobile?'p-5':'p-10'">
    <el-row :gutter="5">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="(item,index) in overviewData" :key="index">
        <el-card>
          <div slot="header" class="flexbox" @click="toStatePage">
            <div>{{item.name}}</div>
            <el-tag class="text-r" :type="item.status ? 'primary' : 'danger'" disable-transitions>{{ item.status ? "在线" : "离线" }}</el-tag>
            <el-tag
              class="text-r"
              style="margin-left:5px;"
              :type="item.status ? 'primary' : 'danger'"
              disable-transitions
            >{{ item.status ? "正常" : "异常" }}</el-tag>
          </div>
          <div class="box-card">
            <div class="left-div" @click="toStatePage">
              <div>故障次数</div>
              <div>
                <span class="font-25">{{item.count}}</span>次
              </div>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="right-div" @click="toStatePage">
              <div>当日产量</div>
              <div>
                <span class="font-25">{{item.output}}</span>件
              </div>
            </div>
          </div>
          <div @click="toStatePage" class="chart-div">
            <circle-chart :chartId="'circleChart'+item.id" titleName="稼动率" :chartData="item.chartData"></circle-chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CircleChart from './component/circleChart'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    },
    // 授权头
    headers() {
      return {
        Authorization: this.$store.getters.authorization
      }
    }
  },
  components: {
    CircleChart
  },
  data() {
    return {
      // 当前页的表格数据
      overviewData: [
        { id: 1, name: '单柜1', status: true, count: 1, output: 20, chartData: [{ name: 'a', value: 10 }, { name: 'b', value: 90 }] },
        { id: 2, name: '单柜2', status: true, count: 1, output: 20, chartData: [{ name: 'a', value: 40 }, { name: 'b', value: 60 }] },
        { id: 3, name: '单柜3', status: true, count: 1, output: 20, chartData: [{ name: 'a', value: 50 }, { name: 'b', value: 50 }] }
      ]
    }
  },
  methods: {
    toStatePage() {
      this.$router.push({
        path: '/dataApplication/stateInfo'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 3em;
  padding: 10px;
  display: flex;
  font-size: 14px;
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
.box-card /deep/ .el-divider--vertical {
  height: 4em;
}
.el-card__header {
  padding: 10px 15px;
}
.left-div {
  flex: 1;
}
.right-div {
  flex: 1;
  text-align: center;
}
.flexbox {
  display: flex;
}
.flexbox div {
  flex: 1;
  height: 32px;
  line-height: 32px;
}
.chart-div {
  margin-top: 5em;
}
</style>
