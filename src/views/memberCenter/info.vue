<template>
  <!-- 会员信息 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加会员</el-button>
    <span>请选择项目查看：</span>
    <el-select v-model="serachParams.id" placeholder="请选择" size="small" @change="getMemberByPage">
      <el-option :value="0" label="请选择"></el-option>
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
      <el-table-column label="邮箱" align="center" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.address}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属项目" fixed="right" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{itemList.find(i=>i.id===scope.row.itemId).name}}</span>
        </template>
      </el-table-column>-->
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
      @size-change="getMemberByPage"
      @current-change="getMemberByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写会员信息">
      <el-form label-position="right" label-width="140px" :model="dialogData" :rules="rules" ref="ruleForm">
        <el-form-item label="账户：" prop="username">
          <el-input v-model="dialogData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="mobile">
          <el-input v-model="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="dialogData.email"></el-input>
        </el-form-item>
        <el-form-item label="所属项目:" prop="projectId">
          <el-select v-model="dialogData.itemId" placeholder="请选择" size="small">
            <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址:" prop="email">
          <el-input v-model="dialogData.address"></el-input>
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
import { getMemberByPage } from '@/api/memberCenter/info.js'
import { getUserInfoById, addUser, editUser, deleteUserInfoById } from '@/api/sysCenter/users.js'
import { getAllItem } from '@/api/sysCenter/item.js'

export default {
  data() {
    return {
      // 查询条件
      projectId: '',
      // table所有数据
      tableData: [],
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
      dialogData: { userId: '', username: '', name: '', mobile: '', email: '', sex: 0, address: '', projectId: '' },
      // 性别列表
      sexList: [{ sex: 0, des: '男' }, { sex: 1, des: '女' }],
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      userId: '',
      // 查询条件,id是项目id，condition是姓名或手机号
      serachParams: { id: '' },
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入会员名', trigger: 'blur' }
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
        ]
      }
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
        this.getMemberByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页查询会员信息
    getMemberByPage() {
      getMemberByPage(this.currentPage, this.pageSize, this.serachParams).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id查询会员信息
    getUserInfoById(id) {
      getUserInfoById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加会员
    addUser() {
      this.dialogData.utype = 101002
      this.dialogData.status = true
      addUser(this.dialogData).then(res => {
        this.$message.success('添加成功')
        this.getMemberByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑会员
    editUser() {
      editUser(this.userId, this.dialogData).then(res => {
        this.$message.success('修改成功')
        this.getMemberByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除会员
    deleteUserInfoById(id) {
      deleteUserInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.getMemberByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加会员按钮
    addClick() {
      this.dialogVisible = true
      this.dialogAction = 'add'
      this.dialogData = { id: '', username: '', name: '', mobile: '', email: '', sex: 0, address: '', projectId: '' }
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      // 验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogAction === 'add') this.addUser()
          else this.editUser()
          this.getMemberByPage()
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
      this.getUserInfoById(id)
      this.userId = id
    },
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
