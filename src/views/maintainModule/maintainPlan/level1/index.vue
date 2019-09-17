<template>
  <!-- 保养父计划 -->
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
          @size-change="getPlanDataByPage"
          @current-change="getPlanDataByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="mt-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix flexbox">
            <div>设备名称:{{ item.equipmentName }}</div>
            <el-button type="primary" size="mini" @click="toChildPlan( item )">查看子计划</el-button>
          </div>
          <div class="text item">
            <group>
              <cell title="保养等级" :value="item.maintainLevel"></cell>
              <cell title="计划时间" :value="item.planTime"></cell>
              <cell title="点检人" :value="item.checkerName"></cell>
              <cell title="确认人" :value="item.confirmorName"></cell>
              <cell title="子计划个数" :value="item.totalNum ||0"></cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button type="primary" round size="mini" @click="addPlan">添加保养计划</el-button>
        <span class="ml-20">设备名称：</span>
        <el-select v-model="equipmentId" placeholder="请选择" size="small" :disabled="!isSelectByCondition" @change="getPlanDataByPage">
          <el-option v-for="item in deviceNameList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
        </el-select>
        <!-- <span class="ml-20">保养等级：</span>
        <el-select v-model="level" placeholder="请选择" size="small" :disabled="!isSelectByCondition" @change="getPlanDataByPage">
          <el-option v-for="item in maintainLevelList" :key="item.level" :value="item.level" :label="item.decs"></el-option>
        </el-select>-->
        <el-checkbox class="float-r check-style" v-model="isSelectByCondition" @change="getPlanDataByPage">是否按照条件查询</el-checkbox>
      </el-row>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-5">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" width="180px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.equipmentName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养等级" width="80px" align="center">
            <template slot-scope="scope">
              <span>{{ maintainLevelList[scope.row.maintainLevel-1].desc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划时间" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.isEdit">
                <el-date-picker
                  style="width:150px"
                  size="mini"
                  v-model="scope.row.planTime"
                  type="date"
                  value-format="yyyy-MM-dd 00:00:00"
                  placeholder="选择日期"
                ></el-date-picker>
                <el-button type="success" size="mini" @click="editPlanTimeOk(scope.row)">确定</el-button>
                <el-button type="danger" size="mini" @click="editPlanTimeCancel(scope.row)">取消</el-button>
              </div>
              <div v-else>
                <span>{{scope.row.planTime|dateFormat('YYYY-MM-DD')}}</span>
                <el-button class="ml-10" type="info" size="mini" @click="editPlanTimeTrigger(scope.row)">修改</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="点检人" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.checkerName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="确认人" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.confirmorName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="子计划个数" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.totalNum ||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="查看子计划" width="100px" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toChildPlan( scope.row )">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getPlanDataByPage"
          @current-change="getPlanDataByPage"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
      <!-- 添加计划弹框 -->
      <el-dialog :visible.sync="planDialogVisible" title="请填写" class="width-20">
        <el-form label-position="right" label-width="150px" :model="planDialogData">
          <el-form-item label="设备名称：">
            <el-select v-model="planDialogData.equipmentId" placeholder="请选择" size="small">
              <el-option v-for="item in deviceNameList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备保养类型：">
            <el-select v-model="planDialogData.categoryId" placeholder="请选择" size="small" @change="getCycleData">
              <el-option v-for="item in categoryList" :key="item.categoryId" :value="item.categoryId" :label="item.category"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保养等级：">
            <el-select v-model="planDialogData.maintainLevel" placeholder="请选择" size="small" @change="getCycleData">
              <el-option v-for="item in maintainLevelList" :key="item.level" :value="item.level" :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保养周期：">
            <el-select v-model="planDialogData.timeSpan" placeholder="请选择" size="small">
              <el-option v-for="item in maintainCycleList" :key="item.maintainCycle" :value="item.desc" :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="周期间隔：">
            <el-input v-model="planDialogData.timeInterval"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：">
            <el-date-picker v-model="planDialogData.startTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="次数：">
            <el-input v-model="planDialogData.num"></el-input>
          </el-form-item>
          <el-form-item label="点检人：">
            <el-select v-model="planDialogData.checkerId" placeholder="请选择" size="small">
              <el-option v-for="item in personList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="确认人：">
            <el-select v-model="planDialogData.confirmorId" placeholder="请选择" size="small">
              <el-option v-for="item in personList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <div class="text-c">
            <el-button type="primary" size="medium" @click="addSubmitClick">确定</el-button>
            <el-button type="info" size="medium" @click="addCancel">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPlanDataByPage, addPlanData, getPlanTime, deletePlanData } from '@/api/maintainModule/plan/level1.js'
import { getDeviceNameList } from '@/api/deviceModule/index.js'
import { getCategoryList, getCycleData } from '@/api/maintainModule/rules/level1.js'
import { getAllUserInfo } from '@/api/ucenter/userInfo.js'

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
      // 是否按照条件来筛选
      isSelectByCondition: false,
      // 下拉选择框设备id
      equipmentId: '',
      // 设备列表
      deviceNameList: [],
      // 类别列表
      categoryList: [],
      // 下拉选择框选择等级
      level: '',
      // 等级列表
      maintainLevelList: [
        { level: 1, desc: '一级' },
        { level: 2, desc: '二级' },
        { level: 3, desc: '三级' }
      ],
      // 保养周期列表
      maintainCycleList: [
        { maintainCycle: 'year', desc: '年' },
        { maintainCycle: 'month', desc: '月' },
        { maintainCycle: 'day', desc: '日' }
      ],
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 添加计划弹框显隐
      planDialogVisible: false,
      // 添加计划弹框数据
      planDialogData: {},
      // 编辑弹框显隐
      editDialogVisible: false,
      // 编辑回显数据
      editDialogData: {},
      // 所有人列表
      personList: []
    }
  },
  created() {
    this.getPlanDataByPage()
    this.getDeviceNameList()
    this.getCategoryList()
    this.getAllUserInfo()
  },
  methods: {
    // api
    // 获取设备名称列表
    getDeviceNameList() {
      getDeviceNameList().then(res => {
        this.deviceNameList = res
      }).catch(err => this.$message.error(err))
    },
    // 获取设备保养类型列表
    getCategoryList() {
      getCategoryList().then(res => {
        this.categoryList = res
      }).catch(err => this.$message.error(err))
    },
    // 获取周期数据
    getCycleData() {
      const params = {
        category: this.categoryList.filter(item => item.categoryId === this.planDialogData.categoryId)[0].category,
        level: this.planDialogData.maintainLevel
      }
      if (params.category && params.level) {
        getCycleData(params).then(res => {
          if (res.length === 1) {
            this.planDialogData.timeSpan = res[0].timeSpan
            this.planDialogData.timeInterval = res[0].timeInterval
          }
        }).catch(err => this.$message.error(err))
      }
    },
    // 获取所有人的信息
    getAllUserInfo() {
      getAllUserInfo().then(res => {
        this.personList = res
      }).catch(err => this.$message.error(err))
    },
    // 获取表格数据
    getPlanDataByPage() {
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        if (this.level) params.level = this.level
      } else {
        this.equipmentId = ''
        this.level = ''
      }
      getPlanDataByPage(this.currentPage, this.pageSize, params).then(res => {
        res.list.forEach(element => {
          element.isEdit = false
          element.planTimeTmp = ''
        })
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 添加计划
    addTableData() {
      this.planDialogData.num = parseInt(this.planDialogData.num)
      this.planDialogData.category = this.categoryList.filter(item => item.categoryId === this.planDialogData.categoryId)[0].category
      this.planDialogData.equipmentName = this.deviceNameList.filter(item => item.equipmentId === this.planDialogData.equipmentId)[0].equipmentName
      this.planDialogData.checkerName = this.personList.filter(item => item.id === this.planDialogData.checkerId)[0].name
      this.planDialogData.confirmorName = this.personList.filter(item => item.id === this.planDialogData.confirmorId)[0].name
      addPlanData(this.planDialogData).then(res => {
        this.$message.success('添加成功')
        this.getPlanDataByPage()
      }).catch(err => this.$message.error(err))
    },
    // 编辑计划
    getPlanTime(id, time) {
      const params = { time: time }
      getPlanTime(id, params).then(res => {
        this.$message.success('修改时间成功')
        this.getPlanDataByPage()
      }).catch(err => this.$message.error(err))
    },
    // 删除计划
    deleteTableData(id) {
      deletePlanData(id).then(res => {
        this.$message.success('删除成功')
        this.getPlanDataByPage()
      }).catch(err => this.$message.error(err))
    },
    // 修改计划时间
    editPlanTimeOk(row) {
      if (row.planTime == null) {
        this.$message.info('请输入时间')
        return
      }
      this.getPlanTime(row.parentPlanRecordId, row.planTime)
      row.isEdit = false
    },
    editPlanTimeTrigger(row) {
      row.isEdit = true
      row.planTimeTmp = row.planTime
    },
    editPlanTimeCancel(row) {
      row.isEdit = false
      row.planTime = row.planTimeTmp
    },
    // 点击添加按钮，弹框显示，并回显数据
    addPlan(row) {
      this.planDialogVisible = true
      this.planDialogData = { equipmentId: '', categoryId: '', maintainLevel: '', timeSpan: '', timeInterval: '', startTime: '', num: '', checkerId: '', confirmorId: '' }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.editDialogVisible = true
      this.getPlanTime(row.parentPlanRecordId, row.planTime)
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(row.parentPlanRecordId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 添加计划弹框提交
    addSubmitClick() {
      this.planDialogVisible = false
      this.addTableData()
    },
    // 添加计划弹框取消
    addCancel() {
      this.planDialogVisible = false
      this.planDialogData = { equipmentId: '', categoryId: '', maintainLevel: '', timeSpan: '', timeInterval: '', startTime: '', num: '', checkerId: '', confirmorId: '' }
    },
    // 修改计划弹框提交
    editSubmitClick() {
      this.editDialogVisible = false
      this.editTableData()
    },
    // 修改计划弹框取消
    editCancel() {
      this.editDialogVisible = false
      this.editDialogData = {}
    },
    // 查看子计划
    toChildPlan(row) {
      this.$router.push({
        path: '/maintainModule/childPlan',
        query: { row: row }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../../../styles/mobileStyle.scss";
.text /deep/ .weui-cells {
  font-size: 14px;
}
p /deep/ label.vux-label {
  font-weight: 350;
}
.check-style {
  height: 32px;
  line-height: 32px;
}
</style>
