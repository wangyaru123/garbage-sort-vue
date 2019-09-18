<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">设备数据</div>
      <div class="data">
        <el-row class="data-style data-style-first">
          <el-col :span="8">
            <div class="border-right">
              <p>毛坯工件</p>
              <h2>100</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="border-right">
              <p>半成品工件</p>
              <h2>10</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <p>成品工件</p>
              <h2>90</h2>
            </div>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="8">
            <div class="border-right">
              <p>速度百分比</p>
              <h2>90%</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="border-right">
              <p>操作模式</p>
              <h2>***</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <p>当前状态</p>
              <div class="circle online"></div>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row v-for="index in 6" :key="index" class="data-style">
          <el-col :span="10">浙江**大学{{index}}</el-col>
          <el-col :span="7" class="text-c">
            <el-tag size="mini" effect="dark" type="success">在线 </el-tag>
            <span>&nbsp; 5</span>
          </el-col>
          <el-col :span="7" class="text-c">
            <el-tag size="mini" effect="dark" type="danger">离线 </el-tag>
            <span>&nbsp; 5</span>
          </el-col>
        </el-row>-->
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
.data {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 30px);
  width: 100%;
}
.data-style {
  height: 50%;
  margin: 0px 15px;
  padding-top: 5px;
}
.data-style-first {
  border-bottom: 1px solid #124667;
}
.data-style .el-col {
  height: 100%;
  line-height: 100%;
  padding-top: 10%;
}
.data-style-first .el-col {
  padding-top: 20%;
}
.data-style .el-col div {
  text-align: center;
  padding: 5px;
}
.data-style .el-col .border-right {
  border-right: 1px solid #124667;
}
.circle {
  width: 20px;
  height: 20px;
  margin: 20px auto;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
.online {
  background-color: #00ffff;
  box-shadow: inset 4px 4px 4px 4px #00ffff;
}
.outline {
  background-color: #f49033;
  box-shadow: inset 4px 4px 4px 4px #f49033;
}
</style>
