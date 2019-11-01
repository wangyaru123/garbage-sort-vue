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
    <el-dialog :visible.sync="dialogVisible" title="请选择类别">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="学校名称：">
          <span>{{schoolId}}</span>
        </el-form-item>
        <el-form-item label="类别：">
          <el-radio v-model="dialogData.sort" v-for="item in sortList" :key="item.sort" :value="item.sort" :label="item.desc"></el-radio>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input v-model="dialogData.status"></el-input>
        </el-form-item>
        <el-form-item label="开启预约：">
          <el-switch v-model="dialogData.isOpen"></el-switch>
        </el-form-item>
        <el-form-item label="开始预约时间：">
          <el-input v-model="dialogData.startTime"></el-input>
        </el-form-item>
        <el-form-item label="结束预约时间：:">
          <el-input v-model="dialogData.endTime"></el-input>
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
      // 弹框显示
      dialogVisible: false,
      // 弹框数据
      dialogData: [],
      // 类别列表
      sortList: [{ sort: 1, desc: '考核点' }, { sort: 2, desc: '培训点' }, { sort: 3, desc: '即是考核点又是培训点' }]
    }
  },
  created() {
    this.getSchoolList()
  },
  methods: {
    // 获取公司列表
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    setdialogVisible() {
      this.dialogVisible = true
      this.dialogData = {
        sort: 1,
        status: true,
        isOpen: true,
        startTime: '',
        endTime: ''
      }
    },
    // 点击确定按钮
    submitClick() {
      this.dialogVisible = false
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
