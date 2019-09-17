<template>
  <div class="total-layout">
    <div class="title">“1+X”工业机器人应用编程</div>
    <div class="content">
      <el-col :lg="5" :md="5" :sm="5" class="content-layout">
        <div class="item-h33 p-10">
          <device-info></device-info>
        </div>
        <div class="item-h33 p-10">
          <device-state></device-state>
        </div>
        <div class="item-h33 p-10">
          <parameter></parameter>
        </div>
      </el-col>
      <el-col :lg="14" :md="14" :sm="14" class="content-layout">
        <div class="item-h50">
          <el-col :lg="12" :md="12" :sm="12" class="h100 p-10">
            <operation-ratio></operation-ratio>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" class="h100 p-10">
            <use-duration></use-duration>
          </el-col>
        </div>
        <div class="item-h50 p-10">
          <robot-info></robot-info>
        </div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="5" class="content-layout">
        <div class="item-h33 p-10">
          <device-location></device-location>
        </div>
        <div class="item-h33 p-10">
          <device-alarm></device-alarm>
        </div>
        <div class="item-h33 p-10">
          <box-info></box-info>
        </div>
      </el-col>
    </div>
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
}
.content {
  height: calc(100vh - 80px);
  color: white;
  .content-layout {
    height: 100%;
  }
}
.item-h33 {
  height: 33.3%;
}
.item-h50 {
  height: 50%;
}
.h100 {
  height: 100%;
}
</style>
