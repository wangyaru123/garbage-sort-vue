<template>
  <div :class="isMobile? 'total-layout-mobile':'total-layout'">
    <div class="title">
      <img v-if="!isMobile" src="../../../assets/billboard/h1Posco.png" class="pl-10 float-l" alt />
      <span class="title-name">“1+X”工业机器人应用编程</span>
      <img v-if="!isMobile" src="../../../assets/billboard/homeIcon.png" class="go-back" alt @click="goBack" title="返回首页" />
    </div>
    <el-row class="content">
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item-h33 p-10">
          <device-info></device-info>
        </div>
        <div class="item-h22 p-10">
          <device-state></device-state>
        </div>
        <div class="item-h44 p-10">
          <parameter></parameter>
        </div>
      </el-col>
      <el-col :lg="14" :md="24" :sm="24" class="content-layout">
        <el-col :lg="12" :md="24" :sm="24" class="p-10" :class="isMobile? 'item-h33':'item-h50'">
          <operation-ratio></operation-ratio>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24" class="p-10" :class="isMobile? 'item-h33':'item-h50'">
          <use-duration></use-duration>
        </el-col>
        <el-col :lg="24" :md="24" :sm="24" class="p-10" :class="isMobile? 'item-h33':'item-h50'">
          <robot-info></robot-info>
        </el-col>
      </el-col>
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item-h33 p-10">
          <device-location></device-location>
        </div>
        <div class="item-h22 p-10">
          <box-info></box-info>
        </div>
        <div class="item-h44 p-10">
          <device-alarm></device-alarm>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import boxInfo from './component/boxInfo'
import deviceAlarm from './component/deviceAlarm'
import deviceInfo from './component/deviceInfo'
import deviceLocation from './component/deviceLocation'
import deviceState from './component/deviceState'
import operationRatio from './component/operationRatio'
import parameter from './component/parameter'
import robotInfo from './component/robotInfo'
import useDuration from './component/useDuration'

export default {
  components: {
    boxInfo,
    deviceAlarm,
    deviceInfo,
    deviceLocation,
    deviceState,
    operationRatio,
    parameter,
    robotInfo,
    useDuration
  },
  data() {
    return {

    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style lang="scss" scoped>
.total-layout {
  background-color: #002035;
  height: 100vh;
  width: 100vw;
  color: white;
}
.title {
  height: 80px;
  width: 100%;
  text-align: center;
  line-height: 80px;
  font-size: 28px;
  color: #00ffcc;
  border-bottom: 1px solid #009fff;
  .title-name {
    background: radial-gradient(center, #00adcf, #02263e, #002035);
    background: -webkit-radial-gradient(center, #00adcf, #02263e, #002035);
  }
}
.go-back {
  height: 40px;
  width: 40px;
  margin: 20px;
  float: right;
  cursor: pointer;
}
.content {
  min-height: calc(100vh - 80px);
  color: white;
}

.content-layout {
  height: calc(100vh - 80px);
}
.item-h33 {
  height: 33.3%;
}
.item-h22 {
  height: 22.2%;
}
.item-h44 {
  height: 44.4%;
}
.item-h50 {
  height: 50%;
}
.h100 {
  height: 100%;
}
.total-layout-mobile {
  background-color: #002035;
  min-height: 100vh;
  width: 100%;
  color: white;
  .content-layout {
    min-height: 150vh;
    padding: 10px;
  }
}
</style>
