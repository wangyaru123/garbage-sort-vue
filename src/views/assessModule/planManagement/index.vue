<template>
  <!-- 计划管理 -->
  <div class="p-10">
    <el-row>
      <span>请选择学校：</span>
      <el-select v-model="schoolId" placeholder="请选择" size="small">
        <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
      </el-select>
    </el-row>
    <el-row class="mt-10">
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{date, data}">
          <div class="con-div" @click="setdialogVisible">{{ data.day.split('-').slice(1).join('-') }}</div>
        </template>
      </el-calendar>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="请修改计划">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="学校名称：">
          <span v-if="schoolId">{{schoolList.find(item=>item.schoolId===schoolId).schoolName}}</span>
        </el-form-item>
        <el-form-item label="类别：">
          <el-tag type="primary" v-if="dialogData.sort!==2">考核点</el-tag>
          <el-tag type="success" v-if="dialogData.sort!==1">培训点</el-tag>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="dialogData.status" v-for="item in statusList" :key="item.status" :label="item.status">{{item.desc}}</el-radio>
        </el-form-item>
        <el-form-item label="时段：">
          <el-radio v-model="dialogData.periodId" v-for="item in periodNameList" :key="item.periodId" :label="item.periodId">{{item.periodName}}</el-radio>
        </el-form-item>
        <el-form-item label="开启预约：">
          <el-switch v-model="dialogData.toOpen" active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="开始预约时间：">
          <el-date-picker v-model="dialogData.bookStartTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束预约时间：">
          <el-date-picker v-model="dialogData.bookEndTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSchoolList } from '@/api/ucenter/school.js'
import { getPeriodNameList, getSchoolPlan, updateSchoolPlan } from '@/api/assessModule/planManagement.js'
import dayjs from 'dayjs'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  data() {
    return {
      // 日历数据
      value: new Date(),
      // 学校id
      schoolId: '',
      // 学校列表
      schoolList: [],
      // 时段列表
      periodNameList: [],
      // 学校计划数据
      schoolPlanData: [],
      // 弹框显示
      dialogVisible: false,
      // 弹框数据
      dialogData: [],
      // 类别列表
      sortList: [{ sort: 1, desc: '考核点' }, { sort: 2, desc: '培训点' }, { sort: 3, desc: '即是考核点又是培训点' }],
      // 状态列表
      statusList: [{ status: 1, desc: '空闲' }, { status: 2, desc: '培训' }, { status: 3, desc: '考核' }]
    }
  },
  created() {
    this.getSchoolList()
    this.getPeriodNameList()
    this.getSchoolPlan()
  },
  methods: {
    // 获取学校列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取时段列表
    getPeriodNameList() {
      getPeriodNameList().then(res => {
        this.periodNameList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取整月计划
    getSchoolPlan() {
      const monthTime = dayjs().format('YYYY-MM')
      const params = { schoolId: this.schoolId, monthTime: monthTime }
      getSchoolPlan(params).then(res => {
        this.schoolPlanData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 更新单条计划
    updateSchoolPlan() {
      updateSchoolPlan(this.schoolId, this.dialogData).then(res => {
        this.$message.success('修改成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据点击的类别设置状态
    setStatusList() {
      if (this.dialogData.sort === 1) {
        this.statusList = [{ status: 0, desc: '空闲' }, { status: 1, desc: '考核' }]
      } else if (this.dialogData.sort === 2) {
        this.statusList = [{ status: 0, desc: '空闲' }, { status: 2, desc: '培训' }]
      } else {
        this.statusList = [{ status: 0, desc: '空闲' }, { status: 1, desc: '考核' }, { status: 2, desc: '培训' }]
      }
    },
    // 点击日历，弹出弹框
    setdialogVisible() {
      this.dialogVisible = true
      this.dialogData = {
        sort: 1,
        status: 1,
        periodId: 1,
        toOpen: true,
        bookStartTime: '',
        bookEndTime: ''
      }
      this.setStatusList()
    },
    // 点击确定按钮
    submitClick() {
      this.dialogVisible = false
      // this.updateSchoolPlan()
    },
    // 点击取消，隐藏弹窗
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.con-div {
  width: 100%;
  height: 100%;
}
</style>
