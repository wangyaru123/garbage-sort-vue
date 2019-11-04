<template>
  <!-- 计划查询 -->
  <div :class="isMobile?'':'p-10'">
    <div v-if="isMobile">
      <div class="fixed">
        <el-pagination
          id="mobile-pagination"
          background
          layout="prev, jumper, next, total"
          :page-size="10"
          :total="total"
          @size-change="getScoreByPage"
          @current-change="getScoreByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div>{{item.schoolName}}</div>
          </div>
          <div class="text item flexbox">
            <div style="width:100%">
              <div class="flexbox mt-5">
                用户名:
                <div>{{item.userName}}</div>
              </div>
              <div class="flexbox mt-5">
                考核学校:
                <div>{{item.testCenter}}</div>
              </div>
              <div class="flexbox mt-5">
                考核设备:
                <div>{{item.testCode}}</div>
              </div>
              <div class="flexbox mt-5">
                考核时间:
                <div>{{item.testDate}}</div>
              </div>
              <div class="flexbox mt-5">
                时段:
                <div>{{item.periodName}}</div>
              </div>
              <div class="flexbox mt-5">
                成绩:
                <div>{{item.score}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else>
      <el-row class="search-row">
        <el-col :span="23">
          <span>开始时间：</span>
          <el-date-picker v-model="condition.bookStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
          <span>结束时间：</span>
          <el-date-picker v-model="condition.bookEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
          <span>学校：</span>
          <el-select v-model="condition.schoolName" placeholder="请选择" size="small">
            <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolName" :label="item.schoolName"></el-option>
          </el-select>
          <span>状态：</span>
          <el-select v-model="condition.status" placeholder="请选择" size="small">
            <el-option v-for="item in statusList" :key="item.status" :value="item.status" :label="item.desc"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getAllSchoolPlan"></el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border stripe class="mt-10">
        <el-table-column label="序号" fixed width="50px" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" fixed align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="学校" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.testCenter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动状态" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.testCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否开启预约" align="center" width="180px">
          <template slot-scope="scope">
            <span>{{ scope.row.testDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始预约时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.periodName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束预约时间" align="center" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.score }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt-10 text-r"
        background
        @size-change="getScoreByPage"
        @current-change="getScoreByPage"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getSchoolList } from '@/api/ucenter/school.js'
import { getAllSchoolPlan } from '@/api/assessModule/planQuery'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  data() {
    return {
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 表格数据
      tableData: [],
      // 状态列表
      statusList: [{ status: 1, desc: '考核' }, { status: 2, desc: '培训' }],
      // 学校列表
      schoolList: [],
      // 条件
      condition: {
        'bookStartTime': '',
        'bookEndTime': '',
        'schoolName': '',
        'status': ''
      }
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
    },
    // 查询计划
    getAllSchoolPlan() {
      getAllSchoolPlan(this.condition).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
.search-row /deep/ .el-select,
.search-row /deep/ .el-date-editor,
.search-row /deep/ .el-input__inner {
  width: 200px;
  height: 28px;
}
.search-row /deep/ .el-input__icon {
  line-height: 28px;
}
</style>
