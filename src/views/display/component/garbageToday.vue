<template>
  <div class="main-style">
    <div style="font-size: 20px;height: 40px;line-height: 40px;padding-left: 25px;">各类垃圾今日量</div>
    <div class="data">
      <el-row class="data-style">
        <el-col :span="12" class="school">汇博立宁职业培训学校</el-col>
        <el-col :span="6" class="text-c">
          <el-tag size="mini" effect="dark" type="success">在线</el-tag>
          <span>&nbsp; 3</span>
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
          <span>&nbsp; 2</span>
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
          <span>&nbsp; 4</span>
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
          <span>&nbsp; 3</span>
        </el-col>
        <el-col :span="6" class="text-c">
          <el-tag size="mini" effect="dark" type="danger">离线</el-tag>
          <span>&nbsp; 1</span>
        </el-col>
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
