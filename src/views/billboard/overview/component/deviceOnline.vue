<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">设备在线</div>
      <div class="data">
        <el-row class="data-style">
          <el-col :span="12" class="school">汇博立宁职业培训学校 </el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="success">在线</el-tag>
            <span>&nbsp; 4</span>
          </el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="danger">离线</el-tag>
            <span>&nbsp; 1</span>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="12" class="school">广州机电职业技术学院</el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="success">在线</el-tag>
            <span>&nbsp; 3</span>
          </el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="danger">离线</el-tag>
            <span>&nbsp; 2</span>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="12" class="school">杭州科技职业技术学院</el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="success">在线</el-tag>
            <span>&nbsp; 5</span>
          </el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="danger">离线</el-tag>
            <span>&nbsp; 0</span>
          </el-col>
        </el-row>
        <el-row class="data-style">
          <el-col :span="12" class="school">苏州工业职业技术学院</el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="success">在线</el-tag>
            <span>&nbsp; 4</span>
          </el-col>
          <el-col :span="6" class="text-c">
            <el-tag size="mini" effect="dark" type="danger">离线</el-tag>
            <span>&nbsp; 1</span>
          </el-col>
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
  border-bottom: 1px solid #124667;
  // height: 35px;
  margin: 0px 0px;
  padding: 5px 0px;
  .school {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
