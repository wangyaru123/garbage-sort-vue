<template>
  <!-- 会员积分 -->
  <div class="p-10">
    <span>所属项目：</span>
    <el-select v-model="serachParams.id" placeholder="请选择" size="small" @change="getMemberPointsByPage">
      <el-option value="0" label="请选择"></el-option>
      <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
    </el-select>
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
      <el-table-column label="累计积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.earnPoints||0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.costPoints||0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currentPoints||0}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属项目" fixed="right" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{itemList.find(i=>i.id===scope.row.id).name}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" fixed="right" width="130px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.userId )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getMemberPointsByPage"
      @current-change="getMemberPointsByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写卡号信息">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="添加积分：" prop="points">
          <el-input-number v-model="dialogData.points" controls-position="right"></el-input-number>
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
import { getMemberPointsByPage } from '@/api/memberCenter/point.js'
import { addMemberPoints } from '@/api/memberCenter/pointsDetails.js'
import { getAllItem } from '@/api/sysCenter/item.js'

export default {
  data() {
    return {
      // 查询条件
      userId: '',
      // table所有数据
      tableData: [
        // { id: 1, username: 'wangyi', name: '王一', mobile: '15076541233', totalPoints: 100, consumePoints: 50, currentPoints: 50, id: 1 },
        // { id: 2, username: 'zhangshan', name: '张山', mobile: '15076541231', totalPoints: 90, consumePoints: 40, currentPoints: 50, id: 2 }
      ],
      // 项目列表
      itemList: [],
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 查询条件,id是项目id，condition是姓名或手机号
      serachParams: { id: '' },
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 弹框回显报警信息数据
      dialogData: { points: 1 }
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
        this.getMemberPointsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页查询信息
    getMemberPointsByPage() {
      getMemberPointsByPage(this.currentPage, this.pageSize, this.serachParams).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加会员积分
    addMemberPoints() {
      const params = {
        behavior: '人工行为',
        userId: this.userId,
        points: this.dialogData.points
      }
      addMemberPoints(params).then(res => {
        this.$message.success('添加成功')
        this.getMemberPointsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      this.addMemberPoints()
      this.dialogData = {}
    },
    // 弹框的取消按钮
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    // 编辑
    editRow(userId) {
      this.dialogVisible = true
      this.dialogData = this.tableData.find(item => item.userId === userId)
      console.log(this.dialogData)
      this.dialogData.points = 1
      this.userId = userId
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
