<template>
  <!-- 成绩查询 -->
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
      <el-table :data="tableData" border stripe class="mt-10">
        <el-table-column label="序号" fixed width="50px" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" fixed align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="考核学校" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.testCenter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="考核设备" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.testCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="考核时间" align="center" width="180px">
          <template slot-scope="scope">
            <span>{{ scope.row.testDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="时段" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.periodName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成绩" align="center" width="120px">
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
import { getScoreByPage } from '@/api/assessModule/scoreQuery.js'

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
      tableData: []
    }
  },
  created() {
    this.getScoreByPage()
  },
  methods: {
    getScoreByPage() {
      getScoreByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/mobileStyle.scss";
</style>
