<template>
  <!-- 项目管理 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加项目</el-button>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目地址" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目简介" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.intro}}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.linkname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系邮箱" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.email}}</span>
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
      @size-change="getItemByPage"
      @current-change="getItemByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写会员信息">
      <el-form label-position="right" label-width="140px" :model="dialogData" :rules="rules" ref="ruleForm">
        <el-form-item label="项目名" prop="name">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="address">
          <el-input v-model="dialogData.address"></el-input>
        </el-form-item>
        <el-form-item label="项目简介" prop="intro">
          <el-input v-model="dialogData.intro"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkname">
          <el-input v-model="dialogData.linkname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="dialogData.email"></el-input>
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
import { getItemByPage, getItemById, addItem, editItem, deleteItem } from '@/api/sysCenter/item.js'

export default {
  data() {
    return {
      // 查询条件
      projectId: '',
      // table所有数据
      tableData: [],
      // 项目列表
      itemList: [],
      // 编辑弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 弹框数据
      dialogData: { id: '', username: '', name: '', mobile: '', email: '', sex: 0, address: '', projectId: '' },
      // 性别列表
      sexList: [{ sex: 0, des: '男' }, { sex: 1, des: '女' }],
      rolesList: [{ role: 1, des: '超级管理员' }, { role: 2, des: '系统管理员' }, { role: 3, des: '商家管理员' }],
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      id: '',
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
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
          { required: true, message: '请选择项目', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getItemByPage()
  },
  methods: {
    // 分页
    getItemByPage() {
      getItemByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id查询项目信息
    getItemById(id) {
      getItemById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加项目
    addItem() {
      addItem(this.dialogData).then(res => {
        this.$message.success('添加成功')
        this.getItemByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑项目
    editItem() {
      editItem(this.id, this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getItemByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除项目
    deleteItem(id) {
      deleteItem(id).then(res => {
        this.$message.success('删除成功')
        this.getItemByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加项目按钮
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
          if (this.dialogAction === 'add') this.addItem()
          else this.editItem()
          this.getItemByPage()
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
      this.getItemById(id)
      this.id = id
    },
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteItem(id))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
