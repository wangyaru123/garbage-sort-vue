<template>
  <!-- 预约详情页 -->
  <div class="p-10">
    <el-row>
      <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
    </el-row>
    <el-row class="mt-10">
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox" style="margin-left:0;">
          <div class="left-div">浙江xxx大学</div>
          <div class="right-div">学校</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox">
          <div class="left-div">2019-11-4 上午</div>
          <div class="right-div">时间</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox">
          <div class="left-div">8台</div>
          <div class="right-div">设备总数</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox" style="margin-right:0;">
          <div class="left-div">4台</div>
          <div class="right-div">未预约数</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mt-10">
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox" style="margin-left:0;">
          <div slot="header" class="clearfix">
            <span>设备编号</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <el-tag type="success">已预约</el-tag>
              <el-tag type="primary">未预约</el-tag>
            </el-button>
          </div>
          <div class="left-div">
            <img src />
          </div>
          <div class="right-div">
            <div>
              <div class="float-left">设备类别：</div>
              <div class="float-right">A类</div>
            </div>
            <div>
              <div class="float-left">设备位置号：</div>
              <div class="float-right">2号</div>
            </div>
            <el-button type="primary">预约</el-button>
          </div>
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
.flexbox /deep/ .el-card__body {
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
.float-left {
  float: left;
}
.float-rigth {
  float: right;
}
</style>
