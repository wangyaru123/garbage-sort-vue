<template>
  <!-- 保养子计划 -->
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
            <div>
              <b>{{ item.checkItemName }}</b>
            </div>
          </div>
          <div class="text item">
            <group>
              <cell title="保养等级" :value="item.maintainLevel"></cell>
              <cell title="计划时间" :value="item.planTime"></cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
        <el-button type="primary" round size="mini" @click="addAllCheckItemsClick">一键添加所有点检项目</el-button>
        <el-button type="primary" round size="mini" @click="addChildPlanClick">添加子计划</el-button>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-5">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="点检项目" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.checkItemName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养等级" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.maintainLevel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.planTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
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
        ></el-pagination>
      </el-row>
      <!-- 添加或编辑设备弹框 -->
      <el-dialog :visible.sync="dialogVisible" title="请填写" class="width-20">
        <el-form label-position="right" label-width="150px" :model="dialogData">
          <el-form-item label="点检项目：">
            <el-select v-model="dialogData.checkId" placeholder="请选择" size="small" @change="getDutyList">
              <el-option v-for="item in checkItemList" :key="item.checkId" :value="item.checkId" :label="item.checkItemName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班次：">
            <el-input v-model="dialogData.dutyName" v-if="dutyList.length===0"></el-input>
            <el-select v-model="dialogData.dutyName" v-else placeholder="请选择" size="small" @change="getDutyTime">
              <el-option v-for="(duty,index) in dutyList" :key="index" :value="duty.dutyName" :label="duty.dutyName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班次时间：">
            <el-time-picker arrow-control v-model="dialogData.planTime" format="HH:mm:ss" value-format="HH:mm:ss" placeholder="任意时间点"></el-time-picker>
          </el-form-item>
          <div class="text-c">
            <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
            <el-button type="info" size="medium" @click="cancel">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getChildPlanDataByPage, addAllCheckItems, addChildPlan, deleteChildPlan } from '@/api/maintainModule/plan/level1.js'
import { getCheckData } from '@/api/maintainModule/rules/level1.js'
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
    }
  },
  data() {
    return {
      // 点检项目列表
      checkItemList: [],
      // 班次列表
      dutyList: [],
      // 保养等级
      maintainLevelList: [
        { maintainLevel: 1, desc: '一级' },
        { maintainLevel: 2, desc: '二级' },
        { maintainLevel: 3, desc: '三级' }
      ],
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 弹框显隐
      dialogVisible: false,
      // 弹框数据
      dialogData: {}
    }
  },
  created() {
    this.getChildPlanDataByPage()
    this.getCheckData()
  },
  methods: {
    // api
    // 获取表格数据
    getChildPlanDataByPage() {
      getChildPlanDataByPage(this.currentPage, this.pageSize, this.$route.query.row.parentPlanRecordId).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取点检项目列表
    getCheckData() {
      const params = {
        category: this.$route.query.row.category,
        level: this.$route.query.row.maintainLevel
      }
      getCheckData(params).then(res => {
        this.checkItemList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 一键添加所有点检项目
    addAllCheckItems() {
      addAllCheckItems(this.$route.query.row.parentPlanRecordId).then(res => {
        this.$message.success('添加成功')
        this.getChildPlanDataByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加子计划
    addTableData(id) {
      const params = {
        checkId: this.dialogData.checkId,
        checkItemName: this.checkItemList.filter(item => item.checkId === this.dialogData.checkId)[0].checkItemName,
        equipmentId: this.$route.query.row.equipmentId,
        equipmentName: this.$route.query.row.equipmentName,
        maintainLevel: this.$route.query.row.maintainLevel,
        planTime: this.dialogData.planTime
      }
      addChildPlan(this.$route.query.row.parentPlanRecordId, params).then(res => {
        this.$message.success('添加成功')
        this.getChildPlanDataByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除子计划
    deleteTableData(id) {
      deleteChildPlan(id).then(res => {
        this.$message.success('删除成功')
        this.getChildPlanDataByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 页面操作
    // 返回上一页
    back() {
      this.$router.go(-1)
    },
    // pageSize改变时触发
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getChildPlanDataByPage()
    },
    // 页数改变时触发
    handleCurrentChange(val) {
      this.getChildPlanDataByPage()
    },
    // 一键添加所有点检项目
    addAllCheckItemsClick() {
      this.addAllCheckItems()
    },
    // 点击添加按钮，弹框显示，并回显数据
    addChildPlanClick(row) {
      this.dialogVisible = true
      this.dialogData = { checkId: '', dutyName: '', planTime: '' }
    },
    // 根据点检项目拉取班次
    getDutyList() {
      this.dutyList = this.checkItemList.filter(item => item.checkId === this.dialogData.checkId)[0].dutys
    },
    // 根据班次获取班次时间
    getDutyTime() {
      this.dialogData.planTime = this.dutyList.filter(item => item.dutyName === this.dialogData.dutyName)[0].dutyTime
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(row.childPlanRecordId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 弹框提交
    submitClick() {
      this.dialogVisible = false
      this.addTableData()
    },
    // 弹框取消
    cancel() {
      this.dialogVisible = false
      this.dialogData = { checkId: '', dutyName: '', planTime: '' }
    }
  }
}
</script>

<style lang="scss">
@import "../../../styles/mobileStyle.scss";
.text /deep/ .weui-cells {
  font-size: 14px;
}
p /deep/ label.vux-label {
  font-weight: 350;
}
</style>
