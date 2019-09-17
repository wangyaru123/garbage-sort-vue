<template>
  <div class="total-layout">
    <div class="title">“1+X”工业机器人应用编程</div>
    <div class="content">
      <el-col :lg="5" :md="5" :sm="5" class="content-layout">
        <div class="item pb-10">
          <device-profile></device-profile>
        </div>
        <div class="item pt-10">
          <device-online></device-online>
        </div>
      </el-col>
      <el-col :lg="14" :md="14" :sm="14" class="content-layout">
        <device-map></device-map>
      </el-col>
      <el-col :lg="5" :md="5" :sm="5" class="content-layout">
        <div class="item pb-10">
          <device-alarm-stat></device-alarm-stat>
        </div>
        <div class="item pt-10">
          <device-alarm-detail></device-alarm-detail>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import deviceMap from './component/deviceMap'
import deviceOnline from './component/deviceOnline'
import deviceProfile from './component/deviceProfile'
import deviceAlarmStat from './component/deviceAlarmStat'
import deviceAlarmDetail from './component/deviceAlarmDetail'

export default {
  components: {
    deviceMap,
    deviceOnline,
    deviceAlarmStat,
    deviceProfile,
    deviceAlarmDetail
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
    padding: 10px;
  }
}
.item {
  height: 50%;
}
</style>
