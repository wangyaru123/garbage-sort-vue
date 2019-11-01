<template>
  <!-- 预约详情页 -->
  <div class="p-10">
    <el-row>
      <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
    </el-row>
    <el-row class="mt-10">
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox" style="margin-left:0;">
          <div class="left-div">
            浙江xxx大学
          </div>
          <div class="right-div"></div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox">
          <div class="left-div">
            <span class="iconfont icon-speed"></span>
          </div>
          <div class="right-div"></div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox">
          <div class="left-div">
            <span class="iconfont icon-project"></span>
          </div>
          <div class="right-div"></div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox" style="margin-right:0;">
          <div class="left-div">
            <span class="iconfont icon-code"></span>
          </div>
          <div class="right-div"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 学校id
      schoolId: ''
    }
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.con-div {
  width: 100%;
  height: 100%;
}
.flexbox /deep/ .el-card__body{
  display: flex;
}
.left-div {
  flex: 1;
  text-align: left;
}
.right-div {
  width: 46px;
  height: 46px;
  background-color: #409eff;
}
</style>
