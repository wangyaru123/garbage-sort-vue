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
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="m-0 mt-10" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix flexbox">
            <div>{{ item.equipmentName }}</div>
            <!-- <el-button type="primary" size="mini" @click="toChildPlan( item )">查看子计划</el-button> -->
          </div>
          <div class="text item">
            <group>
              <cell title="点检项目" :value="item.checkItemName"></cell>
              <cell title="计划时间" :value="item.planTime"></cell>
              <cell title="点检人" :value="item.checkerName"></cell>
              <cell title="确认人" :value="item.confirmorName"></cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button type="primary" round size="small" @click="addPlan">添加保养计划</el-button>
        <span class="ml-20">设备名称：</span>
        <el-select v-model="equipmentId" placeholder="请选择" size="small" :disabled="!isSelectByCondition" @change="getPlanDataByPage">
          <el-option v-for="item in deviceNameList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
        </el-select>
        <span class="ml-20">选择月份：</span>
        <el-date-picker
          v-model="selectMonthTime"
          size="small"
          type="month"
          value-format="yyyy-MM-dd"
          placeholder="选择月"
          :disabled="!isSelectByCondition"
          @change="getPlanDataByPage"
        ></el-date-picker>
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
          <el-table-column label="点检项目" width="180px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.checkItemName}}</span>
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
          :page-size.sync="pageSize"
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
            <el-select v-model="planDialogData.categoryId" placeholder="请选择" size="small" @change="categoryChanged">
              <el-option v-for="item in categoryList" :key="item.categoryId" :value="item.categoryId" :label="item.category"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="点检项目：">
            <el-select v-model="planDialogData.ruleId" placeholder="请选择" size="small" @change="ruleChanged">
              <el-option v-for="item in ruleDataList" :key="item.itemRulesId" :value="item.itemRulesId" :label="item.checkItemName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保养周期：">
            <el-select v-model="planDialogData.timeSpan" placeholder="请选择" size="small">
              <el-option v-for="item in maintainCycleList" :key="item.maintainCycle" :value="item.desc" :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="周期间隔：">
            <el-input-number v-model="planDialogData.timeInterval" :min="1" :max="50" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="开始时间：">
            <el-date-picker v-model="planDialogData.startTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="次数：">
            <el-input-number v-model="planDialogData.num" :min="1" :max="50" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="点检人：">
            <el-select v-model="planDialogData.checkerId" placeholder="请选择" size="small">
              <el-option v-for="item in checkerList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="确认人：">
            <el-select v-model="planDialogData.confirmorId" placeholder="请选择" size="small">
              <el-option v-for="item in confirmerList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <div class="text-c">
            <el-button type="primary" @click="addSubmitClick">确定</el-button>
            <el-button type="info" @click="addCancel">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPlanDataByPage, addPlanData, updatePlanTimeById, deletePlanData, getRuleDataByCategory } from '@/api/maintainModule/plan/level2.js'
import { getAllUserInfo } from '@/api/ucenter/userInfo.js'
import { getCategoryList } from '@/api/maintainModule/rules/level1.js'
import { getDeviceNameList } from '@/api/deviceModule/index.js'

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
      // 选择的月
      selectMonthTime: new Date(),
      // 下拉选择框设备id
      equipmentId: '',
      // 设备列表
      deviceNameList: [],
      // 类别列表
      categoryList: [],
      // 保养周期列表
      maintainCycleList: [
        { maintainCycle: '年', desc: '年' },
        { maintainCycle: '月', desc: '月' },
        { maintainCycle: '日', desc: '日' }
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
      planDialogData: { equipmentId: '', categoryId: '', timeSpan: '', timeInterval: '', startTime: '', num: '', checkerId: '', confirmorId: '' },
      // 点检人列表
      checkerList: [],
      // 确认人列表
      confirmerList: [],
      // 规则数据列表
      ruleDataList: []
    }
  },
  created() {
    this.getPlanDataByPage()
    this.getDeviceNameList()
    this.getCategoryList()
    this.getCheckerUser()
  },
  methods: {
    // api
    // 获取设备名称列表
    getDeviceNameList() {
      getDeviceNameList().then(res => {
        this.deviceNameList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取设备保养类型列表
    getCategoryList() {
      getCategoryList().then(res => {
        // console.log(res, '保养类型')
        this.categoryList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取周期数据
    categoryChanged() {
      const params = {
        category: this.categoryList.find(item => item.categoryId === this.planDialogData.categoryId).category
      }
      if (params.category) {
        getRuleDataByCategory(params).then(res => {
          console.log(res)
          this.ruleDataList = res
          if (this.ruleDataList.length > 0) {
            this.planDialogData.ruleId = this.ruleDataList[0].itemRulesId
            this.planDialogData.timeSpan = this.ruleDataList[0].timeSpan
            this.planDialogData.timeInterval = this.ruleDataList[0].timeInterval
            this.planDialogData.checkId = this.ruleDataList[0].checkId
            this.planDialogData.checkItemName = this.ruleDataList[0].checkItemName
          }
        }).catch(err => this.$message.error(err.toString()))
      }
    },
    ruleChanged() {
      const tmp = this.ruleDataList.find(item => item.itemRulesId === this.planDialogData.ruleId)
      if (!tmp) return
      this.planDialogData.timeSpan = tmp.timeSpan
      this.planDialogData.timeInterval = tmp.timeInterval
      this.planDialogData.checkId = tmp.checkId
      this.planDialogData.checkItemName = tmp.checkItemName
    },
    // 获取点检人
    getCheckerUser() {
      getAllUserInfo().then(res => {
        console.log(res)
        this.checkerList = res
        this.confirmerList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取表格数据
    getPlanDataByPage() {
      // 页面展示
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        params.time = this.$dayjs(this.selectMonthTime).format('YYYY-MM')
      } else {
        this.equipmentId = ''
        this.selectMonthTime = new Date()
      }

      getPlanDataByPage(this.currentPage, this.pageSize, params).then(res => {
        res.list.forEach(element => {
          element.isEdit = false
          element.planTimeTmp = ''
        })
        console.log(res)
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加计划
    addTableData() {
      this.planDialogData.num = this.planDialogData.num
      this.planDialogData.category = this.categoryList.find(item => item.categoryId === this.planDialogData.categoryId).category
      this.planDialogData.equipmentName = this.deviceNameList.find(item => item.equipmentId === this.planDialogData.equipmentId).equipmentName
      this.planDialogData.checkerName = this.checkerList.find(item => item.id === this.planDialogData.checkerId).name
      this.planDialogData.confirmorName = this.confirmerList.find(item => item.id === this.planDialogData.confirmorId).name
      console.log(this.planDialogData)
      addPlanData(this.planDialogData).then(res => {
        this.$message.success('添加成功')
        // 添加之后定位到最后一条数据上
        if (this.total % this.pageSize === 0) this.currentPage = Math.ceil(this.total / this.pageSize) + 1
        else this.currentPage = Math.ceil(this.total / this.pageSize)
        this.getPlanDataByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑计划
    updatePlanTimeById(id, time) {
      const params = { time: time }
      updatePlanTimeById(id, params).then(res => {
        this.$message.success('修改计划时间成功')
        this.getPlanDataByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除计划
    deleteTableData(id) {
      deletePlanData(id).then(res => {
        this.getPlanDataByPage()
        this.$message.success('删除成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击添加按钮，弹框显示，并回显数据
    addPlan(row) {
      this.planDialogVisible = true
      this.planDialogData = { equipmentId: '', categoryId: '', ruleId: '', timeSpan: '', timeInterval: '', startTime: '', num: '', checkerId: '', confirmorId: '' }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editPlanTimeOk(row) {
      if (row.planTime == null) {
        this.$message.info('请输入时间')
        return
      }
      this.updatePlanTimeById(row.parentPlanRecordId, row.planTime)
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
      this.planDialogData = { equipmentId: '', categoryId: '', ruleId: '', timeSpan: '', timeInterval: '', startTime: '', num: '', checkerId: '', confirmorId: '' }
      this.$message.info('取消添加')
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
