<template>
  <div :class="isMobile? 'total-layout-mobile':'total-layout'">
    <div class="title">
      <!-- <img v-if="!isMobile" src="../../assets/yinglan.png" class="pl-10 float-l img" alt /> -->
      <img v-if="!isMobile" src="../../assets/billboard/extra.png" alt />
      <span class="title-name">垃圾分类数据看板</span>
      <img v-if="!isMobile" src="../../assets/billboard/extra.png" alt />
      <img v-if="!isMobile" src="../../assets/billboard/homeIcon.png" class="go-back" alt @click="goBack" title="返回首页" />
    </div>
    <el-row class="content">
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item pb-10">
          <garbage-total></garbage-total>
        </div>
        <div class="item pt-10">
          <garbage-today></garbage-today>
        </div>
      </el-col>
      <el-col :lg="14" :md="24" :sm="24" class="content-layout" :style="{height:(isMobile?'50vh':'')}">
        <device-map></device-map>
      </el-col>
      <el-col :lg="5" :md="24" :sm="24" class="content-layout">
        <div class="item pb-10">
          <recover-total></recover-total>
        </div>
        <div class="item pt-10">
          <recover-today></recover-today>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import deviceMap from './component/deviceMap'
import garbageTotal from './component/garbageTotal'
import garbageToday from './component/garbageToday'
import recoverTotal from './component/recoverTotal'
import recoverToday from './component/recoverToday'

export default {
  components: {
    deviceMap,
    garbageTotal,
    garbageToday,
    recoverTotal,
    recoverToday
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
    height: 120vh;
    padding: 10px;
  }
}
</style>
