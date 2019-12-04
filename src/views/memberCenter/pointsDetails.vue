<template>
  <!-- 积分详情 -->
  <div class="p-10">
    <span>所属项目：</span>
    <el-select v-model="id" placeholder="请选择" size="small" @change="getPointsDetailsByPage">
      <el-option value="0" label="请选择"></el-option>
      <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
    </el-select>
    <!-- <span>积分类型：</span>
    <el-select v-model="id" placeholder="请选择" size="small" @change="getPointsDetailsByPage">
      <el-option :value="0" label="请选择"></el-option>
      <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
    </el-select>-->
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员名" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.points}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产生行为" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.behavior}}</span>
        </template>
      </el-table-column>
      <el-table-column label="回收类别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recoverType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量(克)" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.weight}}</span>
        </template>
      </el-table-column>
      <el-table-column label="机器编号" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.machineSerialNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产生时间" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getPointsDetailsByPage"
      @current-change="getPointsDetailsByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getPointsDetailsByPage } from '@/api/memberCenter/pointsDetails.js'
import { getAllItem } from '@/api/sysCenter/item.js'

export default {
  data() {
    return {
      // 查询条件
      id: '',
      // table所有数据
      tableData: [
        // { userId: 1, username: 'wangyi', name: '王一', mobile: '15076541233', points: 50, produceAction: '设备回收', recoverCategory: '纸品', weight: 50, deviceCode: '13254683', produceTime: '2019-11-12' },
        // { userId: 2, username: 'zhangshan', name: '张山', mobile: '15076541231', points: 40, produceAction: '设备回收', recoverCategory: '玻璃', weight: 40, deviceCode: '13254681', produceTime: '2019-11-15' }
      ],
      // 项目列表
      itemList: [],
      // 查询条件,id是项目id，condition是姓名或手机号
      serachParams: { id: '' },
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      userId: ''
    }
  },
  created() {
    this.getAllItem()
  },
  methods: {
    // 获取项目列表
    getAllItem() {
      getAllItem().then(res => {
        this.itemList = res
        // 默认选中第一项
        this.serachParams.id = res[0].id
        this.getPointsDetailsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页查询信息
    getPointsDetailsByPage() {
      getPointsDetailsByPage(this.currentPage, this.pageSize, this.serachParams).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
