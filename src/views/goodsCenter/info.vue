<template>
  <!-- 商品信息 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加商品</el-button>
    <span>请选择商品查看：</span>
    <el-select v-model="projectId" placeholder="请选择" size="small" @change="getGoodsByPage">
      <el-option :value="0" label="请选择"></el-option>
      <el-option v-for="item in projectList" :key="item.projectId" :value="item.projectId" :label="item.projectName"></el-option>
    </el-select>
    <el-table :data="currentTableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <el-image :src="scope.row.goodsImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="所需积分" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.needPoints}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属商品" align="center">
        <template slot-scope="scope">
          <span>{{projectList.find(i=>i.projectId===scope.row.projectId).projectName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="130px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.userId )"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.$index )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getGoodsByPage"
      @current-change="getGoodsByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑商品信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写会员信息">
      <el-form label-position="right" label-width="140px" :model="dialogData" :rules="rules" ref="ruleForm">
        <el-form-item label="商品名：" prop="username">
          <el-input v-model="dialogData.username"></el-input>
        </el-form-item>
        <el-form-item label="所需积分：" prop="name">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="库存:" prop="mobile">
          <el-input v-model="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="所属商品:" prop="projectId">
          <el-select v-model="dialogData.projectId" placeholder="请选择" size="small">
            <el-option v-for="item in projectList" :key="item.projectId" :value="item.projectId" :label="item.projectName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="mobile">
          <el-input v-model="dialogData.mobile"></el-input>
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
import { getGoodsByPage, getGoodsById, addGoods, editGoods, deleteGoods } from '@/api/goodsCenter/info.js'
// import img1 from '@/assets/goods/1.jpg'
// import img2 from '../../assets/goods/2.jpg'

export default {
  data() {
    return {
      // 查询条件
      projectId: '',
      // img1,
      // table所有数据
      tableData: [
        // { userId: 1, goodsName: '毛巾', goodsImg: img1, needPoints: 100, stock: 100, projectId: 1, status: '上架' },
        // { userId: 2, goodsName: '纸巾', goodsImg: img2, needPoints: 300, stock: 100, projectId: 2, status: '下架' }
      ],
      // 当前tableData数据
      currentTableData: [],
      // 商品列表
      projectList: [{ projectId: 1, projectName: '浙江试运营' }, { projectId: 2, projectName: '安徽试运营' }],
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 弹框回显报警信息数据
      dialogData: { userId: '', username: '', name: '', mobile: '', email: '', sex: 0, address: '', projectId: '' },
      // 性别列表
      sexList: [{ sex: 0, des: '男' }, { sex: 1, des: '女' }],
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      userId: '',
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }
        ],
        sex: [
          { required: true }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '请选择商品', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getGoodsByPage()
  },
  methods: {
    // 分页
    getGoodsByPage() {
      getGoodsByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id查询商品信息
    getGoodsById(id) {
      getGoodsById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加商品
    addGoods() {
      addGoods(this.dialogData).then(res => {
        this.$message.success('添加成功')
        this.getGoodsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑商品
    editGoods() {
      editGoods(this.id, this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getGoodsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除商品
    deleteGoods(id) {
      deleteGoods(id).then(res => {
        this.$message.success('删除成功')
        this.getGoodsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页
    // fetchData() {
    //  let tableData = this.tableData
    // if (this.projectId) tableData = tableData.filter(item => item.projectId === this.projectId)
    // this.currentTableData = tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
    // this.total = this.currentTableData.length
    // },
    // 添加会员按钮
    addClick() {
      this.dialogVisible = true
      this.dialogAction = 'add'
      this.dialogData = { userId: '', username: '', name: '', mobile: '', email: '', sex: 0, address: '', projectId: '' }
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      // 验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogAction === 'add') {
            const length = this.tableData.length
            this.dialogData.userId = this.tableData[length - 1].userId + 1
            this.tableData.push(this.dialogData)
          } else this.tableData.splice(this.userId - 1, 1, this.dialogData)
          this.fetchData()
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
    editRow(userId) {
      this.dialogVisible = true
      this.dialogAction = 'edit'
      this.dialogData = this.tableData.find(item => item.userId === userId)
      this.userId = userId
    },
    deleteRow(index) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.fetchData()
      }).catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
