<template>
  <!-- 计划管理 -->
  <div class="p-10">
    <el-row>
      <span>请选择学校：</span>
      <el-select v-model="schoolId" placeholder="请选择" size="small" @change="changeSchool">
        <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName"></el-option>
      </el-select>
    </el-row>
    <el-row class="mt-10">
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{date, data}">
          <div class="con-div" @click="setdialogVisible(getItemData(date),date)">
            {{ data.day.split('-').slice(1).join('-') }}
            <el-tag v-if="getItemStatus(date)===1" type="success">考核</el-tag>
            <el-tag v-if="getItemStatus(date)===2" type="primary">培训</el-tag>
          </div>
        </template>
      </el-calendar>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="请修改计划">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="学校名称：">
          <span v-if="schoolId">{{schoolList.find(item=>item.schoolId===schoolId).schoolName}}</span>
        </el-form-item>
        <el-form-item label="类别：">
          <el-tag type="success" v-if="sort!==2">考核点</el-tag>
          <el-tag type="primary" v-if="sort!==1">培训点</el-tag>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="dialogData.status" v-for="item in statusList" :key="item.status" :label="item.status">{{item.desc}}</el-radio>
        </el-form-item>
        <el-form-item label="开启预约：">
          <el-switch v-model="dialogData.toOpen" active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="开始预约时间：">
          <el-date-picker v-model="dialogData.bookStartTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束预约时间：">
          <el-date-picker v-model="dialogData.bookEndTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
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
import { getSchoolList, getSchoolById } from '@/api/ucenter/school.js'
import { getPeriodNameList, getSchoolPlan, addSchoolPlan, updateSchoolPlan } from '@/api/assessModule/planManagement.js'

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
      sort: 1,
      // 学校列表
      schoolList: [],
      // 时段列表
      periodNameList: [],
      // 学校计划数据
      schoolPlanData: [],
      // 弹框显示
      dialogVisible: false,
      // 添加计划还是编辑计划
      action: 'add',
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
  },
  methods: {
    // 获取学校列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
        // 设置第一项选中
        this.schoolId = this.schoolList[0].schoolId
        this.getSchoolById()
        this.getSchoolPlan()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取单条学校信息
    getSchoolById() {
      getSchoolById(this.schoolId).then(res => {
        this.sort = res.sort
        this.setStatusList()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取时段列表
    getPeriodNameList() {
      getPeriodNameList().then(res => {
        this.periodNameList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 改变学校时，重新请求学校单条信息和整月计划
    changeSchool() {
      this.getSchoolById()
      this.getSchoolPlan()
    },
    // 获取整月计划
    getSchoolPlan() {
      const monthTime = this.$dayjs().format('YYYY-MM')
      const params = { schoolId: this.schoolId, monthTime: monthTime }
      getSchoolPlan(params).then(res => {
        this.schoolPlanData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 回显考核培训标志
    getItemStatus(date) {
      const tmp = this.schoolPlanData.find(item => this.$dayjs(item.time).set('hour', 8).set('minute', 0).set('second', 0).isSame(date))
      if (tmp) {
        return tmp.status
      } else {
        return ''
      }
    },
    // 获取每一项数据
    getItemData(date) {
      const tmp = this.schoolPlanData.find(item => this.$dayjs(item.time).set('hour', 8).set('minute', 0).set('second', 0).isSame(date))
      if (tmp) return tmp
      else return ''
    },
    // 添加单条计划
    addSchoolPlan() {
      addSchoolPlan(this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getSchoolPlan()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 更新单条计划
    updateSchoolPlan() {
      updateSchoolPlan(this.dialogData.schoolPlanId, this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getSchoolPlan()
      }).catch(err => {
        if (err === '已经开启预约不得修改，修改请在预约开放时段前即使修改！') this.getSchoolPlan()
        this.$message.error(err.toString())
      })
    },
    // 根据点击的类别设置状态
    setStatusList() {
      if (this.sort === 1) {
        this.statusList = [{ status: 1, desc: '考核' }, { status: 0, desc: '空闲' }]
      } else if (this.sort === 2) {
        this.statusList = [{ status: 2, desc: '培训' }, { status: 0, desc: '空闲' }]
      } else {
        this.statusList = [{ status: 1, desc: '考核' }, { status: 2, desc: '培训' }, { status: 0, desc: '空闲' }]
      }
    },
    // 点击日历，弹出弹框
    setdialogVisible(data, date) {
      this.dialogVisible = true
      // 如果data不为空，则是编辑
      if (data) {
        this.action = 'edit'
        this.dialogData = data
        console.log(this.dialogData)
      } else {
        // 如果data为空，则是添加
        this.action = 'add'
        const schoolName = this.schoolList.find(item => item.schoolId === this.schoolId).schoolName
        const time = this.$dayjs(date).format('YYYY-MM-DD 00:00:00')
        this.dialogData = {
          status: this.statusList[0].status,
          toOpen: true,
          bookStartTime: this.$dayjs(date).format('YYYY-MM-DD 00:00:00'),
          bookEndTime: this.$dayjs(date).format('YYYY-MM-DD 00:00:00'),
          time: time,
          schoolId: this.schoolId,
          schoolName: schoolName
        }
        console.log(this.dialogData)
      }
    },
    // 比较两个日期
    compareDate(begintime, endtime) {
      // 把字符串格式转换为日期类
      const startTime = new Date(Date.parse(begintime))
      const endTime = new Date(Date.parse(endtime))
      // 进行比较
      return (startTime > endTime)
    },
    // 点击确定按钮
    submitClick() {
      const isDateError = this.compareDate(this.dialogData.bookStartTime, this.dialogData.bookEndTime)
      if (isDateError) {
        this.$message.error('开始预约时间不能超过结束预约时间')
      } else {
        this.dialogVisible = false
        if (this.action === 'add') this.addSchoolPlan()
        else this.updateSchoolPlan()
        // 清空数据
        this.dialogData = {}
      }
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
.con-div /deep/ .el-tag {
  display: block;
  width: 45px;
  margin-left: 50px;
}
</style>
