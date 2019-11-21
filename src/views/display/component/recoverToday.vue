<template>
  <div class="main-style">
    <div style="font-size: 20px;height: 40px;line-height: 40px;padding-left: 25px;">各类垃圾今日量</div>
    <div class="data">
      <el-row class="data-style">
        <div>
          <span class="school">汇博立宁职业培训学校</span>
          <span class="float-r device-num">SZ-2019322</span>
        </div>
        <div>
          <span>发生时间：</span>
          <span class="float-r">{{dateTimeCurrent}}</span>
        </div>
        <div>
          <span>报警内容：</span>
          <span class="float-r alarm-content">机器人通信异常</span>
        </div>
      </el-row>
      <el-row class="data-style">
        <div>
          <span class="school">广州机电职业技术学院</span>
          <span class="float-r device-num">SZ-2019512</span>
        </div>
        <div>
          <span>发生时间：</span>
          <span class="float-r">{{dateTimeCurrent}}</span>
        </div>
        <div>
          <span>报警内容：</span>
          <span class="float-r alarm-content">机器人通信异常</span>
        </div>
      </el-row>
      <el-row class="data-style">
        <div>
          <span class="school">杭州科技职业技术学院</span>
          <span class="float-r device-num">SZ-2019122</span>
        </div>
        <div>
          <span>发生时间：</span>
          <span class="float-r">{{dateTimeCurrent}}</span>
        </div>
        <div>
          <span>报警内容：</span>
          <span class="float-r alarm-content">机器人通信异常</span>
        </div>
      </el-row>
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
    },
    dateTimeCurrent() {
      return this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.main-style {
  width: 100%;
  height: 100%;
  background: url("../../../assets/displaybg.png");
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
  margin: 0px 15px;
  padding: 5px 0px;
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
