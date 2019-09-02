<template>
  <!-- 保养总览 -->
  <div :class="isMobile?'':'p-10'">
    <!-- 移动端 -->
    <div v-if="isMobile">
      <div class="fixed">
        <el-pagination
          id="mobile-pagination"
          background
          layout="prev, jumper, next, total"
          :page-size="10"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix flexbox">
            <div>设备名称:{{ item.name }}</div>
            <el-tag class="text-r" :type="item.isPlan? 'primary' : 'danger'" disable-transitions>{{ item.isPlan ? "按计划完成" : "未按计划完成" }}</el-tag>
          </div>
          <div class="text item">
            <el-row class="text-r">
              <el-button type="primary" size="mini" @click="toMaintainPlanPage( item )">查看保养计划</el-button>
            </el-row>
            <group>
              <cell title="设备类型" :value="item.model"></cell>
              <cell title="最近一次保养时间" :value="item.lastPMTime"></cell>
              <cell title="下次保养时间" :value="item.nextPMTime"></cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;">
          <el-table-column label="序号" fixed width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.model }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最近一次保养时间" width="160px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastPMTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下次保养时间" width="160px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.nextPMTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否按计划完成保养" width="160px" align="center">
            <template slot-scope="scope">
              <el-tag class="text-r" :type="scope.row.isPlan? 'primary' : 'danger'" disable-transitions>{{ scope.row.isPlan ? "是" : "否" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toAddMaintainPlanPage( scope.row )">添加保养计划</el-button>
              <el-button type="primary" size="mini" @click="toMaintainPlanPage( scope.row )">查看保养计划</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :hide-on-single-page="true"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getMaimtainOverview } from '@/api/maintainModule/index.js'
import { parseTime } from '@/utils/index'
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    },
    // 授权头
    headers() {
      return {
        Authorization: this.$store.getters.authorization
      }
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
      // 当前页的表格数据
      tableData: []
    }
  },
  created() {
    this.getMaimtainOverview()
  },
  methods: {
    // 跳转到任务页面
    getMaimtainOverview() {
      getMaimtainOverview(this.currentPage, this.pageSize).then(res => {
        const tableData = res.list
        tableData.forEach(item => {
          // 下次保养时间超过当前时间，则是按计划完成，否则是未按计划完成
          item.isPlan = Date.parse(item.nextPMTime) > Date.parse(parseTime(new Date()))
        })
        this.tableData = tableData
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // pageSize改变时触发
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getMaimtainOverview()
    },
    // 页数改变时触发
    handleCurrentChange(val) {
      this.getMaimtainOverview()
    },
    // 跳转到添加保养页面
    toAddMaintainPlanPage(row) {
      this.$router.push({
        path: '/maintainModule/addMaintainPlan',
        query: { id: row.id, name: row.name }
      })
    },
    // 跳转到查看保养页面
    toMaintainPlanPage(row) {
      this.$router.push({
        path: '/maintainModule/maintainPlan',
        query: { id: row.id, name: row.name }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/mobileStyle.scss";
.text /deep/ .weui-cells {
  font-size: 14px;
}
p /deep/ label.vux-label {
  font-weight: 350;
}
</style>
