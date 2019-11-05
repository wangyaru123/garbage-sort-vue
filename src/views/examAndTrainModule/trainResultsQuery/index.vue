<template>
  <!-- 查看培训结果 -->
  <div :class="isMobile?'':'p-10'">
    <div v-if="isMobile">
      <div class="fixed">
        <el-pagination
          id="mobile-pagination"
          background
          layout="prev, jumper, next, total"
          :page-size="10"
          :total="total"
          @size-change="getBookList"
          @current-change="getBookList"
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
        <span>开始时间：</span>
        <el-date-picker v-model="condition.bookStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        <span>结束时间：</span>
        <el-date-picker v-model="condition.bookEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        <span>学校：</span>
        <el-select v-model="condition.schoolName" placeholder="请选择" size="small">
          <el-option v-for="item in schoolList" :key="item.schoolId" :value="item.schoolName" :label="item.schoolName"></el-option>
        </el-select>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="getBookList"></el-button>
      </el-row>
      <el-table :data="tableData" border stripe class="mt-10">
        <el-table-column label="序号" fixed width="50px" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备编号" fixed align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.deviceCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="预约时间" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.bookTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否参加培训" align="center" width="120px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isTrained?'success':'danger'">{{ scope.row.isTrained?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.actualStartTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.actualEndTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训时长" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.lengthOfTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt-10 text-r"
        background
        @size-change="getBookList"
        @current-change="getBookList"
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
import { getTrainBookList } from '@/api/examAndTrainModule/bookQuery'

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
      // 学校列表
      schoolList: [],
      // 条件
      condition: {
        'bookStartTime': '',
        'bookEndTime': '',
        'schoolName': ''
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
    getBookList() {
      getTrainBookList(this.currentPage, this.pageSize, this.condition).then(res => {
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
