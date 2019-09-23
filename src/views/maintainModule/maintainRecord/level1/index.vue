<template>
  <!-- 保养父记录 -->
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
          @size-change="getRecordDataByPage"
          @current-change="getRecordDataByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="mt-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix flexbox">
            <div>设备名称:{{ item.equipmentName }}</div>
            <el-button type="primary" size="mini" @click="toChildRecord( item )">查看子记录</el-button>
          </div>
          <div class="text item">
            <group>
              <cell title="保养等级" :value="item.maintainLevel"></cell>
              <cell title="保养时间" :value="item.executionTime"></cell>
              <cell title="完成率" :value="(100*item.completeNum / item.totalNum ||0)+'%'"></cell>
              <cell title="保养结果" :value="item.result"></cell>
              <cell title="子记录个数" :value="item.totalNum"></cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <span>设备名称：</span>
        <el-select v-model="equipmentId" placeholder="请选择" size="small" :disabled="!isSelectByCondition" @change="getRecordDataByPage">
          <el-option v-for="item in deviceNameList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
        </el-select>
        <!-- <span class="ml-20">保养等级：</span>
        <el-select v-model="level" placeholder="请选择" size="small" :disabled="!isSelectByCondition" @change="getRecordDataByPage">
          <el-option v-for="item in maintainLevelList" :key="item.level" :value="item.level" :label="item.decs"></el-option>
        </el-select> -->
        <el-checkbox class="float-r check-style" v-model="isSelectByCondition" @change="getRecordDataByPage">是否按照条件查询</el-checkbox>
      </el-row>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-5">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.equipmentName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养等级" align="center" width="80px">
            <template slot-scope="scope">
              <span>{{ maintainLevelList[scope.row.maintainLevel-1].desc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.executionTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="完成率" align="center" width="100px">
            <template slot-scope="scope">
              <span>{{ calculateFinishPercent(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="保养结果" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.result"
                placeholder="请选择"
                size="mini"
                @change="changeResult(scope.row)"
                :disabled="parentAdduserPageAuth || parentConfirmorPageAuth || Boolean(scope.row.verifyResult)"
              >
                <el-option v-for="item in resultList" :key="item.result" :value="item.result" :label="item.desc"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="子记录个数" align="center" width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.totalNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="查看子记录" align="center" width="100px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toChildRecord( scope.row )">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="确认人确认" width="100px" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" v-if="Boolean(scope.row.verifyResult)" disabled>已确认</el-button>
              <el-button
                v-else
                type="primary"
                size="mini"
                @click="confirmRow( scope.row )"
                :disabled="parentAdduserPageAuth || parentCheckerPageAuth || scope.row.totalNum==0"
              >确认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getRecordDataByPage"
          @current-change="getRecordDataByPage"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getRecordDataByConfirmor, getRecordDataByChecker, getRecordDataByAdduser, editResult, confirmRecord } from '@/api/maintainModule/record/level1.js'
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
    },
    // 添加人权限
    parentAdduserPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('parent_adduser_page')
    },
    // 点检人权限
    parentCheckerPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('parent_checker_page')
    },
    // 确认人权限
    parentConfirmorPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('parent_confirmor_page')
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
      // 下拉选择框选择等级
      level: '',
      // 等级列表
      maintainLevelList: [
        { level: 1, desc: '一级' },
        { level: 2, desc: '二级' },
        { level: 3, desc: '三级' }
      ],
      // 结果列表
      resultList: [
        { result: 1, desc: '良好' },
        { result: 2, desc: '不良' },
        { result: 3, desc: '不良改善完成' },
        { result: 4, desc: '停止運行' }
      ],
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
    this.getRecordDataByPage()
    this.getDeviceNameList()
  },
  methods: {
    // api
    // 获取设备名称列表
    getDeviceNameList() {
      getDeviceNameList().then(res => {
        this.deviceNameList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页多条件查询所有的父计划在确认人的角色
    getRecordDataByConfirmor() {
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        if (this.level) params.level = this.level
      } else {
        this.equipmentId = ''
        this.level = ''
      }
      getRecordDataByConfirmor(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页多条件查询所有的父计划在点检人的角色
    getRecordDataByChecker() {
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        if (this.level) params.level = this.level
      } else {
        this.equipmentId = ''
        this.level = ''
      }
      getRecordDataByChecker(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页多条件查询所有的父计划在添加计划人的角度
    getRecordDataByAdduser() {
      const params = {}
      if (this.isSelectByCondition) {
        if (this.equipmentId) params.equipmentId = this.equipmentId
        if (this.level) params.level = this.level
      } else {
        this.equipmentId = ''
        this.level = ''
      }
      getRecordDataByAdduser(this.currentPage, this.pageSize, params).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加
    editResult(id, result) {
      const params = { result: result }
      editResult(id, params).then(res => {
        this.$message.success('添加结果成功')
        this.getRecordDataByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 确认人确认
    confirmRecord(id) {
      confirmRecord(id).then(res => {
        this.$message.success('确认成功')
        this.getRecordDataByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 页面操作
    // 页面展示
    getRecordDataByPage() {
      if (this.parentAdduserPageAuth) {
        this.getRecordDataByAdduser()
        return
      }
      if (this.parentCheckerPageAuth) {
        this.getRecordDataByCheckerId()
        return
      }
      if (this.parentConfirmorPageAuth) this.getRecordDataByConfirmId()
    },
    // 计算稼动率
    calculateFinishPercent(row) {
      if (row.completeNum && row.totalNum) {
        const temp = 100 * row.completeNum / row.totalNum
        return temp.toFixed(1) + '%'
      }
      return '0%'
    },
    // 添加结果
    changeResult(row) {
      this.editResult(row.parentPlanRecordId, row.result)
    },
    // 点击添加按钮，弹框显示，并回显数据
    addPlan(row) {
      this.dialogVisible = true
      this.dialogData = {}
    },
    // 点击确认按钮，弹框显示，并回显数据
    confirmRow(row) {
      this.confirmRecord(row.parentPlanRecordId)
    },
    // 弹框提交
    submitClick() {
      this.dialogVisible = false
      if (this.act === 'add') this.addTableData()
      else this.editTableData()
    },
    // 弹框取消
    cancel() {
      this.dialogVisible = false
    },
    // 查看子计划
    toChildRecord(row) {
      this.$router.push({
        path: '/maintainModule/childRecord',
        query: { id: row.parentPlanRecordId, equipmentName: row.equipmentName, maintainLevel: row.maintainLevel, isConfirm: row.verifyResult }
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
