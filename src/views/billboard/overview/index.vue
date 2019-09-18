<template>
  <div :class="isMobile? 'total-layout-mobile':'total-layout'">
    <div class="title">
      <img v-if="!isMobile" src="../../../assets/billboard/h1Posco.png" class="pl-10 float-l" alt />
      <span class="title-name">“1+X”工业机器人应用编程</span>
      <img v-if="!isMobile" src="../../../assets/billboard/homeIcon.png" class="go-back" alt @click="goBack" title="返回首页"/>
    </div>
    <el-row class="content">
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item pb-10">
          <device-profile></device-profile>
        </div>
        <div class="item pt-10">
          <device-online></device-online>
        </div>
      </el-col>
      <el-col :lg="14" :md="24" :sm="24" class="content-layout">
        <device-map></device-map>
      </el-col>
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item pb-10">
          <device-alarm-stat></device-alarm-stat>
        </div>
        <div class="item pt-10">
          <device-alarm-detail></device-alarm-detail>
        </div>
      </el-col>
    </el-row>
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
  background: #002035;
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
  padding: 10px;
}
.item {
  height: 50%;
}

.total-layout-mobile {
  background-color: #002035;
  min-height: 100vh;
  width: 100%;
  color: white;
  .content-layout {
    height: 100vh;
    padding: 10px;
  }
}
</style>
