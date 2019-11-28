<template>
  <!-- 系统用户信息 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加用户</el-button>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="卡号" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.ic}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" fixed align="center" min-width="130px">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.roles" :key="item.id" class="ml-5 mr-5">{{ item.name}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.email}}</span>
        </template>
      </el-table-column>-->
      <!-- <el-table-column label="所属项目" fixed="right" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{itemList.find(i=>{i.id===scope.row.itemId}).name}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="状态" fixed="right" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status?'success':'danger'">{{scope.row.status?'启用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="250px" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.id!==1" type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.id )">信息</el-button>
          <el-button v-if="scope.row.id!==1" type="success" size="mini" icon="el-icon-edit" @click="editRole( scope.row.id )">角色</el-button>
          <el-button v-if="scope.row.id!==1" type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row.id )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getUserInfoByPage"
      @current-change="getUserInfoByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写会员信息">
      <el-form label-position="right" label-width="140px" :model="dialogData" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="dialogData.username"></el-input>
        </el-form-item>
        <el-form-item label="卡号：" prop="ic">
          <el-input v-model="dialogData.ic"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="dialogData.email"></el-input>
        </el-form-item>
        <el-form-item label="所属项目:" prop="itemId">
          <el-select v-model="dialogData.itemId" placeholder="请选择" size="small">
            <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 绑定角色 -->
    <el-dialog :visible.sync="rolesVisible" title="请选择角色" class="width-20">
      <el-form label-position="right" label-width="60px" :model="rolesDialogData">
        <el-form-item label="角色：">
          <el-select multiple v-model="userRolesData" placeholder="请选择" size="small">
            <el-option v-for="item in rolesList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="bindingRolesSubmit(rolesDialogData.id)">确定</el-button>
          <el-button type="info" size="medium" @click="bindingRolesCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfoByPage, getUserInfoById, addUser, editUser, deleteUserInfoById, getAllRoles, bindingRoles, getUserRoles } from '@/api/sysCenter/users.js'
import { getAllItem } from '@/api/sysCenter/item.js'

export default {
  data() {
    return {
      // 查询条件
      itemId: '',
      // table所有数据
      tableData: [
        // { userId: 1, username: 'wangyi', name: '王一', role: 1, mobile: '15076541233', email: '2434243562@163.com', sex: 0, address: '浙江杭州', itemId: 1 },
        // { userId: 2, username: 'zhangshan', name: '张山', role: 2, mobile: '15076541231', email: '2434243561@163.com', sex: 0, address: '安徽合肥', itemId: 2 }
      ],
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
      dialogData: { userId: '', username: '', name: '', mobile: '', email: '', sex: 0, address: '', itemId: '' },
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
        itemId: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ]
      },
      // 绑定角色弹框
      rolesVisible: false,
      // 角色列表
      rolesList: [],
      // 用户的角色回显信息
      rolesDialogData: {},
      // 角色列表
      userRolesData: []
    }
  },
  mounted() {
    this.getAllItem()
    this.getAllRoles()
    this.getUserInfoByPage()
    // Promise.all([this.getAllItem(), this.getAllRoles()]).then(res => {
    //   this.getUserInfoByPage()
    // })
  },
  methods: {
    // 获取角色列表
    getAllRoles() {
      getAllRoles().then(res => {
        this.rolesList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取项目列表
    getAllItem() {
      getAllItem().then(res => {
        this.itemList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页查询用户信息
    getUserInfoByPage() {
      getUserInfoByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id查询用户信息
    getUserInfoById(id) {
      getUserInfoById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加用户
    addUser() {
      addUser(this.dialogData).then(res => {
        this.$message.success('添加成功')
        this.getUserInfoByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑用户
    editUser() {
      editUser(this.userId, this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getUserInfoByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除用户
    deleteUserInfoById(id) {
      deleteUserInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.getUserInfoByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加会员按钮
    addClick() {
      this.dialogVisible = true
      this.dialogAction = 'add'
      this.dialogData = { id: '', username: '', name: '', mobile: '', email: '', itemId: '' }
    },
    // 用户信息弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      // 验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogAction === 'add') this.addUser()
          else this.editUser()
          this.getUserInfoByPage()
          this.dialogData = {}
        } else {
          this.$message.error('填写错误，添加失败')
          return false
        }
      })
    },
    // 用户信息弹框的取消按钮
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    // 编辑用户信息按钮
    editRow(id) {
      this.dialogVisible = true
      this.dialogAction = 'edit'
      this.getUserInfoById(id)
      this.userId = id
    },
    // 编辑角色
    editRole(id) {
      this.roleDialogVisible = true
      this.rolesDialogData.id = id
      getUserRoles(id).then(res => {
        this.rolesVisible = true
        this.userRolesData = res.map(item => item.id)
      }).catch(err => this.$message.error(err.toString()))
    },
    // 绑定角色
    bindingRolesSubmit(id) {
      bindingRoles(id, this.userRolesData).then(res => {
        this.rolesVisible = false
        this.getUserInfoByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 取消
    bindingRolesCancel() {
      this.rolesVisible = false
    },
    // 删除一行
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteUserInfoById(id))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
