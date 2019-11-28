<template>
  <!-- 卡号信息 -->
  <div class="p-10">
    <span>请选择项目查看：</span>
    <el-select v-model="serachParams.id" placeholder="请选择" size="small" @change="getMemberCardByPage">
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
      <el-table-column label="卡号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ic}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属项目" fixed="right" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.itemName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="130px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.id )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getMemberCardByPage"
      @current-change="getMemberCardByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写卡号信息">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="卡号：" prop="card">
          <el-input v-model="dialogData.ic"></el-input>
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
import { getMemberCardByPage, editMemberCard } from '@/api/memberCenter/card.js'
import { getAllItem } from '@/api/sysCenter/item.js'

export default {
  data() {
    return {
      // 查询条件
      projectId: '',
      // table所有数据
      tableData: [
        // { id: 1, username: 'wangyi', name: '王一', mobile: '15076541233', card: '32456234', projectId: 1 },
        // { id: 2, username: 'zhangshan', name: '张山', mobile: '15076541231', card: '32456230', projectId: 2 }
      ],
      // 项目列表
      itemList: [],
      // 查询条件
      serachParams: { id: '' },
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 弹框回显报警信息数据
      dialogData: { id: '', username: 'zhangshan', name: '张山', mobile: '15076541231', card: '', projectId: '' },
      id: ''
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
        this.getMemberCardByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页查询会员信息
    getMemberCardByPage() {
      getMemberCardByPage(this.currentPage, this.pageSize, this.serachParams).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑会员卡号
    editMemberCard() {
      const params = { ic: this.dialogData.ic }
      editMemberCard(this.id, params).then(res => {
        this.$message.success('编辑成功')
        this.getMemberCardByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      this.tableData.find(item => item.id === this.id).card = this.dialogData.card
      this.editMemberCard()
      this.dialogData = {}
    },
    // 弹框的取消按钮
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    // 编辑
    editRow(id) {
      this.dialogVisible = true
      this.dialogData = this.tableData.find(item => item.id === id)
      console.log(this.dialogData)
      this.id = id
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
