<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">报警详情</div>
      <div class="data">
        <el-row v-for="index in 2" :key="index" class="data-style">
          <div>
            <span class="school">浙江**大学{{index}}</span>
            <span class="float-r device-num">xxxx-xxxx-xxxx</span>
          </div>
          <div>
            <span>报警内容：</span>
            <span class="float-r alarm-content">机器人通信异常</span>
          </div>
          <div>
            <span>发生时间：</span>
            <span class="float-r">2019-08-06 14:56:13</span>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.main-style {
  // background-color: #001e31;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: inset 0 0 4px 0 #00ffff;
}
.corner {
  position: absolute;
  width: 25px;
  height: 25px;
}
/*.top-left-corner {
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
.data {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 30px);
  width: 100%;
}
.data-style {
  border-bottom: 1px solid #124667;
  margin: 0px 20px;
  padding-top: 5px;
  color: #9b9e9b;
}
.school {
  color: #0d8eff;
}
.device-num {
  color: #0cca0b;
}
.alarm-content {
  color: white;
}
</style>
