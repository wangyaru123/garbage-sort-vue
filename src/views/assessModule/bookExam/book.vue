<template>
  <!-- 考核预约考核页 -->
  <div class="p-10">
    <el-row>
      <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
    </el-row>
    <el-row class="mt-10">
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox" style="margin-left:0;">
          <div class="left-div">{{schoolName}}</div>
          <div class="right-div">学校</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox">
          <div class="left-div">{{params.day}}{{params.period}}</div>
          <div class="right-div">时间</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox">
          <div class="left-div">{{deviceNum}}台</div>
          <div class="right-div">设备总数</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 flexbox" style="margin-right:0;">
          <div class="left-div">{{unBookNum}}台</div>
          <div class="right-div">未培训预约数</div>
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
            <el-button type="primary">考核预约</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getExamDetails } from '@/api/assessModule/bookExam'

export default {
  data() {
    return {
      // 学校名称
      schoolName: '',
      // 参数
      params: {},
      // 设备数据
      deviceData: []
    }
  },
  created() {
    const { schoolId, schoolName, period, day } = this.$route.query
    this.schoolName = schoolName
    this.params = { schoolId: schoolId, period: period, day: day }
    this.getExamDetails()
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1)
    },
    // 获取考核预约情况
    getExamDetails() {
      getExamDetails(this.params).then(res => {
        console.log(res)
        this.deviceData = res
        // 设备总数
        this.deviceNum = res.length
        // 未考核预约数
        res.forEach(item => {
          if (item.isBook) this.unBookNum++
        })
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
.flexbox /deep/ .el-card__body {
  display: flex;
  padding: 0;
}
.left-div {
  flex: 1;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.right-div {
  width: 80px;
  height: 50px;
  line-height: 50px;
  background-color: #409eff;
  color: #fff;
  text-align: center;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
</style>
