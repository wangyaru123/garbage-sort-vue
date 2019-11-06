<template>
  <!-- 培训预约培训详情页 -->
  <div class="p-10">
    <el-row>
      <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
    </el-row>
    <el-row class="mt-10">
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 topbox" style="margin-left:0;">
          <div class="left-div">{{schoolName}}</div>
          <div class="right-div">学校</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 topbox">
          <div class="left-div">{{params.day}}{{params.period}}</div>
          <div class="right-div">时间</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 topbox">
          <div class="left-div">{{deviceNum}}台</div>
          <div class="right-div">设备总数</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="mt-5">
        <el-card class="box-card m-5 topbox" style="margin-right:0;">
          <div class="left-div">{{unBookNum}}台</div>
          <div class="right-div">未预约数</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mt-5">
      <el-col :span="6" v-for="(item,index) in deviceData" :key="index">
        <el-card class="box-card m-5 devicebox" style="margin-left:0;">
          <div slot="header" class="clearfix">
            <span>{{item.deviceCode}}</span>
            <el-button class="tag-btn" type="text">
              <el-tag :type="item.isBook?'success':'danger'">{{item.isBook?'已预约':'未预约'}}</el-tag>
            </el-button>
          </div>
          <div class="left-div">
            <img :src="deviceImg" />
          </div>
          <div class="right-div">
            <el-row class="mt-20">
              <el-col :span="16">设备类别：</el-col>
              <el-col :span="8" class="text-r">{{item.type}}类</el-col>
            </el-row>
            <el-row class="mt-5">
              <el-col :span="16">设备位置号：</el-col>
              <el-col :span="8" class="text-r">{{item.seat}}号</el-col>
            </el-row>
            <el-button
              class="mt-20 float-r"
              type="primary"
              size="mini"
              v-if="!item.isBook"
              :disabled="bookDisabled"
              @click="toBook(item.trainsId)"
            >预约</el-button>
            <el-button class="mt-20 float-r" type="primary" size="mini" v-if="item.isBook && userId!==item.userId" disabled>已预约</el-button>
            <el-button class="mt-20 float-r" size="mini" v-if="item.isBook && userId===item.userId" @click="cancelBook(item.trainsId)">取消预约</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTrainsDetails, toBook, cancelBook } from '@/api/examAndTrainModule/bookTrain'
import deviceImg from '@/assets/device.png'

export default {
  computed: {
    // 查询全部敏感用户信息权限
    userId() {
      return this.$store.state.user.accessTokenDecode.id
    }
  },
  data() {
    return {
      deviceImg,
      // 学校名称
      schoolName: '',
      // 参数
      params: {},
      // 设备数据
      deviceData: [],
      // 设备总数
      deviceNum: 0,
      // 未培训预约数
      unBookNum: 0,
      // 预约禁用按钮
      bookDisabled: false
    }
  },
  created() {
    // 获取传的参数
    const { schoolId, schoolName, period, day } = this.$route.query
    this.schoolName = schoolName
    this.params = { schoolId: schoolId, period: period, day: day }
    this.getTrainsDetails()
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.push({
        path: '/examAndTrainModule/train',
        query: { schoolId: this.params.schoolId }
      })
    },
    // 获取培训预约情况
    getTrainsDetails() {
      getTrainsDetails(this.params).then(res => {
        console.log(res)
        this.deviceData = res
        // 设备总数
        this.deviceNum = res.length
        // 未培训预约数
        if (res.length > 0) {
          res.forEach(item => {
            if (!item.isBook) this.unBookNum++
            if (item.userId === this.userId) this.bookDisabled = true
          })
        }
      }).catch(err => this.$message.error(err.toString()))
    },
    // 预约
    toBook(trainsId) {
      const params = {
        trainsId: trainsId,
        schoolId: this.params.schoolId,
        day: this.params.day
      }
      toBook(params).then(res => {
        this.$message.success('预约成功')
        this.getTrainsDetails()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 取消预约
    cancelBook(trainsId) {
      const params = {
        trainsId: trainsId,
        schoolId: this.params.schoolId,
        day: this.params.day
      }
      cancelBook(params).then(res => {
        this.$message.success('取消预约成功')
        this.getTrainsDetails()
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
// 上边四个盒子样式----开始
.topbox /deep/ .el-card__body {
  display: flex;
  padding: 0;
}
.topbox .left-div {
  flex: 1;
  height: 65px;
  line-height: 65px;
  text-align: center;
}
.topbox .right-div {
  width: 80px;
  height: 65px;
  line-height: 65px;
  background-color: #409eff;
  color: #fff;
  text-align: center;
}
// 上边四个盒子样式----结束

// 下边设备盒子样式----开始
// 头部
.devicebox /deep/ .el-card__header {
  padding: 10px;
  height: 60px;
  line-height: 40px;
}
.tag-btn {
  float: right;
  padding: 3px 0;
}
// body
.devicebox /deep/ .el-card__body {
  display: flex;
}
.devicebox .left-div {
  width: 117px;
  height: 117px;
}
.devicebox .right-div {
  flex: 1;
  margin-left: 10px;
}
// 下边设备盒子样式----结束
</style>
