<template>
  <!-- 实时考核预约情况 -->
  <div class="p-10">
    <el-row class="search-row">
      <span>请选择学校：</span>
      <el-select v-model="schoolId" placeholder="请选择" size="small">
        <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolName" :label="item.schoolName"></el-option>
      </el-select>
    </el-row>
    <el-row class="mt-5">
      <el-col :span="6" v-for="(item,index) in deviceData" :key="index">
        <el-card class="box-card m-5 devicebox" style="margin-left:0;">
          <div slot="header" class="clearfix">
            <span>{{item.deviceCode}}</span>
            <el-button class="tag-btn" type="text">
              <el-tag :type="item.isBook?'primary':'danger'">{{item.isBook?'培训中':'空闲中'}}</el-tag>
            </el-button>
          </div>
          <div class="body-top">
            <div class="left-div">
              <img :src="deviceImg" />
            </div>
            <div class="right-div">
              <el-row class="mt-30">
                <el-col :span="16" class="text-gray">设备类别：</el-col>
                <el-col :span="8" class="text-r">{{item.type}}类</el-col>
              </el-row>
              <el-row class="mt-5">
                <el-col :span="16" class="text-gray">设备位置号：</el-col>
                <el-col :span="8" class="text-r">{{item.seat}}号</el-col>
              </el-row>
            </div>
          </div>
          <div class="body-bottom mt-10">
            <el-row>
              <el-col :span="8" class="text-gray">学员：</el-col>
              <el-col :span="16" class="text-c">{{item.userName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="text-gray">开始时间：</el-col>
              <el-col :span="16" class="text-c">{{item.actualStartTime}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="text-gray">结束时间：</el-col>
              <el-col :span="16" class="text-c">{{item.actualEndTime}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="text-gray">运行时长：</el-col>
              <el-col :span="16" class="text-c">{{item.lengthOfTime}}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSchoolList } from '@/api/ucenter/school.js'
import deviceImg from '@/assets/device.png'

export default {
  data() {
    return {
      deviceImg,
      // 学校id
      schoolId: '',
      // 学校列表
      schoolList: [],
      // 设备列表
      deviceData: [{
        actualEndTime: '2019-11-03 02:00:00',
        actualStartTime: '2019-11-03 00:00:00',
        bookTime: null,
        deviceCode: 'HZD223-5556-221',
        deviceId: 27,
        endTime: '11:40:00',
        isBook: true,
        isTrained: false,
        lengthOfTime: '2小时',
        periodName: '上午',
        schoolId: 15,
        schoolName: '浙江大学',
        seat: 1,
        startTime: '09:00:00',
        time: '2019-11-06 00:00:00',
        trainsId: 3,
        type: 'B',
        userId: null,
        userName: '张三'
      },
      {
        actualEndTime: '2019-11-04 02:00:00',
        actualStartTime: '2019-11-04 00:00:00',
        bookTime: null,
        deviceCode: 'HZD223-5556-222',
        deviceId: 27,
        endTime: '11:40:00',
        isBook: false,
        isTrained: false,
        lengthOfTime: '2小时',
        periodName: '上午',
        schoolId: 15,
        schoolName: '浙江大学',
        seat: 2,
        startTime: '09:00:00',
        time: '2019-11-06 00:00:00',
        trainsId: 3,
        type: 'B',
        userId: null,
        userName: '李四'
      }]
    }
  },
  created() {
    this.getSchoolList()
  },
  methods: {
    // 获取学校列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
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
.devicebox /deep/ .el-card__body .body-top {
  display: flex;
}
.devicebox .body-top .left-div {
  width: 117px;
  height: 117px;
}
.devicebox .body-top .right-div {
  flex: 1;
  margin-left: 10px;
}
// 下边设备盒子样式----结束
</style>
