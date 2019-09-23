<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">设备信息</div>
      <div class="data">
        <el-row class="data-style">
          <el-col :span="8" type="flex" align="middle" class="bg p-5 text-c">设备编码</el-col>
          <el-col :span="16" class="text-c p-5">
            <span>{{deviceInfo.deviceNumber}}</span>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="8" class="bg text-c p-5">位置号</el-col>
          <el-col :span="16" class="text-c p-5">
            <span>11</span>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="8" class="bg text-c p-5">类别</el-col>
          <el-col :span="16" class="text-c p-5">
            <span>A</span>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="8" class="bg text-c p-5">学校</el-col>
          <el-col :span="16" class="text-c p-5">
            <span>{{deviceInfo.school}}</span>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="8" class="bg text-c p-5">安装地点</el-col>
          <el-col :span="16" class="text-c p-5">
            <span>**省**市**区**街道**号</span>
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
  props: ['deviceInfo'],
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
  margin: 0px 15px;
}
.data-style .el-col {
  height: 100%;
  line-height: 100%;
}
.bg {
  background: rgba(255, 255, 255, 0.1);
}
</style>
