<template>
  <!-- 订单信息 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加订单</el-button>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属项目" fixed="right" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.itemName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买人" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.purchaser}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买数量" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center" min-width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="130px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.id )"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row.id )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getOrderByPage"
      @current-change="getOrderByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写会员信息">
      <el-form label-position="right" label-width="140px" :model="dialogData" :rules="rules" ref="ruleForm">
        <el-form-item label="订单号：" prop="orderNum">
          <el-input v-model="dialogData.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="商品名：" prop="productName">
          <el-input v-model="dialogData.productName"></el-input>
        </el-form-item>
        <el-form-item label="商品数量：" prop="amount">
          <el-input-number v-model="dialogData.amount" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="购买人：" prop="purchaser">
          <el-input v-model="dialogData.purchaser"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="所属项目:" prop="itemId">
          <el-select v-model="dialogData.itemId" placeholder="请选择" size="small">
            <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间：" prop="time">
          <el-date-picker v-model="dialogData.time" type="datetime" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期时间"></el-date-picker>
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
import { getOrderByPage, getOrderById, addOrder, editOrder, deleteOrder } from '@/api/orderCenter/info.js'
import { getAllItem } from '@/api/sysCenter/item.js'

export default {
  data() {
    return {
      // 查询条件
      itemId: '',
      // table所有数据
      tableData: [],
      // 当前tableData数据
      currentTableData: [],
      // 项目列表
      itemList: [],
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 弹框回显报警信息数据
      dialogData: {},
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      id: '',
      // 验证规则
      rules: {
        orderNum: [
          { required: true, message: '请输入订单号', trigger: 'blur' }
        ],
        orderName: [
          { required: true, message: '请输入商品名', trigger: 'blur' }
        ],
        purchaser: [
          { required: true, message: '请输入购买者', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        time: [
          { required: true }
        ]
      }
    }
  },
  created() {
    this.getOrderByPage()
    this.getAllItem()
  },
  methods: {
    // 获取项目列表
    getAllItem() {
      getAllItem().then(res => {
        this.itemList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页
    getOrderByPage() {
      getOrderByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id查询商品信息
    getOrderById(id) {
      getOrderById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加商品
    addOrder() {
      this.dialogData.itemName = this.itemList.find(item => item.id === this.dialogData.itemId).name
      addOrder(this.dialogData).then(res => {
        this.$message.success('添加成功')
        this.getOrderByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑商品
    editOrder() {
      this.dialogData.itemName = this.itemList.find(item => item.id === this.dialogData.itemId).name
      editOrder(this.dialogData.id, this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getOrderByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除商品
    deleteOrder(id) {
      deleteOrder(id).then(res => {
        this.$message.success('删除成功')
        this.getOrderByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页
    // fechdata() {
    // let tableData = this.tableData
    // if (this.itemId) tableData = tableData.filter(item => item.itemId === this.itemId)
    // this.currentTableData = tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
    // this.total = this.currentTableData.length
    // },
    // 添加会员按钮
    addClick() {
      this.dialogVisible = true
      this.dialogAction = 'add'
      this.dialogData = {}
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      // 验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogAction === 'add') this.addOrder()
          else this.editOrder()
          this.dialogData = {}
        } else {
          this.$message.error('填写错误，添加失败')
          return false
        }
      })
    },
    // 弹框的取消按钮
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    // 编辑
    editRow(id) {
      this.dialogVisible = true
      this.dialogAction = 'edit'
      this.getOrderById(id)
    },
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteOrder(id))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
