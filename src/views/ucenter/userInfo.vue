<template>
  <!-- 用户信息表 -->
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
          @size-change="fetchData"
          @current-change="fetchData"
          :current-page.sync="currentPage"
        ></el-pagination>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div>{{item.username}}</div>
            <div class="text-r">{{ item.name}}</div>
          </div>
          <div class="text item flexbox">
            <div style="width:100%">
              <div class="flexbox mt-5">
                性别:
                <div>{{item.sex?'女':'男'}}</div>
              </div>
              <div class="flexbox mt-5">
                手机号码:
                <div>{{item.mobile}}</div>
              </div>
              <div class="flexbox mt-5">
                固定电话:
                <div>{{item.telephone}}</div>
              </div>
              <div class="flexbox mt-5">
                邮箱:
                <div>{{item.email}}</div>
              </div>
              <div class="flexbox mt-5">
                邮箱:
                <div>{{item.companyName}}</div>
              </div>
              <div class="flexbox mt-5">
                最后登录时间:
                <div>{{item.lastLoginTime}}</div>
              </div>
              <div class="flexbox mt-5">
                是否是超级用户:
                <el-tag :type="item.isSys?'':'danger'">{{ item.isSys?'是':'否'}}</el-tag>
              </div>
              <div class="flexbox mt-5">
                是否启用:
                <el-tag :type="item.isEnable?'':'danger'">{{ item.isEnable?'是':'否'}}</el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button type="primary" size="small" round @click="addClick" v-if="addUserAuth">添加用户</el-button>
        <el-table :data="tableData" border stripe class="mt-10">
          <el-table-column label="序号" fixed width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账户" fixed align="center" v-if="sensitivePageAuth">
            <template slot-scope="scope">
              <span>{{ scope.row.username}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" fixed align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色" fixed align="center" min-width="200px">
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.roles" :key="item.adminRoleId" class="ml-5 mr-5">{{ item.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="性别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sex?'女':'男'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column label="固定电话" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.telephone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" align="center" width="180px">
            <template slot-scope="scope">
              <span>{{ scope.row.email}}</span>
            </template>
          </el-table-column>
          <el-table-column label="公司" align="center" width="180px">
            <template slot-scope="scope">
              <span>{{ scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最后登录时间" align="center" v-if="sensitivePageAuth" width="160px">
            <template slot-scope="scope">
              <span>{{ scope.row.lastLoginTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否是超级用户" align="center" v-if="sensitivePageAuth" width="120px">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isSys?'':'danger'">{{ scope.row.isSys?'是':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" align="center" v-if="sensitivePageAuth">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isEnable?'':'danger'">{{ scope.row.isEnable?'是':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="重置密码" v-if="resetPasswordAuth" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="resetPassword( scope.row.adminId )">重置</el-button>
            </template>
          </el-table-column>
          <el-table-column label="绑定角色" fixed="right" align="center" v-if="sensitivePageAuth">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.adminId!==1 && saveRolesAuth"
                type="success"
                size="mini"
                @click="bindingRolesClick( scope.row.adminId )"
              >绑定</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150px" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.adminId!==1" type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
              <el-button
                v-if="scope.row.adminId!==1 && deleteUserAuth"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteRow( scope.row )"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="fetchData"
          @current-change="fetchData"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
    <!-- 添加或编辑用户信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写用户信息">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="账户：">
          <el-input v-model="dialogData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="dialogData.sex" placeholder="请选择" size="small">
            <el-option v-for="item in sexList" :key="item.sex" :value="item.sex" :label="item.sexName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="固定电话:">
          <el-input v-model="dialogData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="dialogData.email"></el-input>
        </el-form-item>
        <el-form-item label="公司:">
          <el-select v-model="dialogData.companyId" placeholder="请选择" size="small">
            <el-option v-for="item in companyList" :key="item.companyId" :value="item.companyId" :label="item.companyName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否是超级用户:">
          <el-switch v-model="dialogData.isSys" active-color="#288AF1" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="是否启用:">
          <el-switch v-model="dialogData.isEnable" active-color="#288AF1" inactive-color="#ff4949"></el-switch>
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
            <el-option v-for="item in rolesList" :key="item.adminRoleId" :value="item.adminRoleId" :label="item.name"></el-option>
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
import { getUserNoSenInfoByPage, getUserSenInfoByPage, getUserNoSenInfoById, getUserSenInfoById, addUserInfo, updateUserInfoBySys, updateUserInfoByUser, deleteUserInfoById, resetPassword, getUserRoles, getAllRoles, bindingRoles } from '@/api/ucenter/userInfo.js'
import { getCompanyList } from '@/api/ucenter/company.js'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    },
    // 授权头
    headers() {
      return {
        Authorization: this.$store.getters.authorization
      }
    },
    // 查询全部敏感用户信息权限
    sensitivePageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_sensitive_page')
    },
    // 查询全部非敏感用户信息权限
    nosensitivePageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_nonsentive_page')
    },
    // 是否有添加用户权限
    addUserAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_add')
    },
    // 查询单条敏感用户信息权限
    sensitiveIdAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_sensitive_id')
    },
    // 更新敏感用户信息权限
    updateSysAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_update_sys')
    },
    // 删除用户信息权限
    deleteUserAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_delete')
    },
    // 重置密码
    resetPasswordAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_reset_password')
    },
    // 给用户添加角色
    saveRolesAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_save_roles')
    }
  },
  data() {
    return {
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 弹框回显报警信息数据
      dialogData: {},
      // 性别列表
      sexList: [{ sex: 1, sexName: '女' }, { sex: 0, sexName: '男' }],
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      // 绑定角色弹框
      rolesVisible: false,
      // 角色列表
      rolesList: [],
      // 用户的角色回显信息
      rolesDialogData: {},
      // 角色列表
      userRolesData: [],
      // 公司列表
      companyList: []
    }
  },
  created() {
    // 组件创建完后获取第一页数据
    this.fetchData()
    // 获取公司列表
    this.getCompanyList()
    // 获取角色列表
    if (this.saveRolesAuth) this.getAllRoles()
  },
  methods: {
    // 获取角色列表
    getAllRoles() {
      getAllRoles().then(res => {
        this.rolesList = res
      }).catch(err => this.$message.error(err))
    },
    // 获取公司列表
    getCompanyList() {
      getCompanyList().then(res => {
        this.companyList = res
      }).catch(err => this.$message.error(err))
    },
    // 获取非敏感信息列表
    getUserNoSenInfo() {
      getUserNoSenInfoByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 获取敏感信息列表
    getUserSenInfo() {
      getUserSenInfoByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 根据权限，根据page,size获取当前表格数据
    fetchData() {
      if (this.sensitivePageAuth) this.getUserSenInfo()
      else this.getUserNoSenInfo()
      this.dialogData = { adminId: null, username: '', name: '', sex: 1, mobile: '', telephone: '', email: '', lastLoginTime: '', isSys: true, isEnable: true }
    },
    // 添加用户信息
    addClick() {
      this.dialogAction = 'add'
      this.dialogVisible = true
      this.dialogData = { adminId: null, username: '', name: '', sex: 1, mobile: '', telephone: '', email: '', lastLoginTime: '', isSys: true, isEnable: true }
    },
    // 根据id获取非敏感信息
    getNoSenDialogData(adminId) {
      getUserNoSenInfoById(adminId).then(res => {
        this.dialogData = res
        this.dialogData.sex = Number(this.dialogData.sex)
      }).catch(err => this.$message.error(err))
    },
    // 根据id获取敏感信息列表
    getSenDialogData(adminId) {
      getUserSenInfoById(adminId).then(res => {
        this.dialogData = res
        this.dialogData.sex = Number(this.dialogData.sex)
      }).catch(err => this.$message.error(err))
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogAction = 'edit'
      this.dialogVisible = true
      if (this.sensitiveIdAuth) this.getSenDialogData(row.adminId)
      else this.getNoSenDialogData(row.adminId)
    },
    // 新增用户
    addUserInfo() {
      this.dialogData.companyName = this.companyList.filter(item => item.companyId === this.dialogData.companyId)[0].companyName
      addUserInfo(this.dialogData).then(res => {
        this.dialogVisible = false
        this.$message.success('添加成功')
        this.fetchData()
      }).catch(err => this.$message.error(err))
    },
    // 系统管理员更新用户信息
    updateUserInfoBySys() {
      updateUserInfoBySys(this.dialogData.adminId, this.dialogData).then(res => {
        this.dialogVisible = false
        this.$message.success('修改成功')
        this.fetchData()
      }).catch(err => this.$message.error(err))
    },
    // 更新当前用户的信息
    updateUserInfoByUser() {
      updateUserInfoByUser(this.dialogData.adminId, this.dialogData).then(res => {
        this.dialogVisible = false
        this.$message.success('修改成功')
        this.fetchData()
      }).catch(err => this.$message.error(err))
    },
    // 点击确定按钮,保存用户信息
    submitClick() {
      if (this.dialogAction === 'add') this.addUserInfo()
      else if (this.updateSysAuth) this.updateUserInfoBySys()
      else this.updateUserInfoByUser()
    },
    // 点击取消，隐藏弹窗
    cancel() {
      this.dialogVisible = false
      this.dialogData = { adminId: null, username: '', name: '', sex: 1, mobile: '', telephone: '', email: '', lastLoginTime: '', isSys: true, isEnable: true }
    },
    // 删除单条已提交报警信息
    deleteTableData(id) {
      deleteUserInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      }).catch(err => this.$message.error(err))
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(row.adminId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 重置密码
    resetPassword(id) {
      resetPassword(id).then(res => {
        this.$message.success('重置密码成功')
        this.fetchData()
      }).catch(err => this.$message.error(err))
    },
    // 根据用户id查询关联的角色信息
    bindingRolesClick(id) {
      this.rolesDialogData.id = id
      getUserRoles(id).then(res => {
        this.rolesVisible = true
        this.userRolesData = res.map(item => item.adminRoleId)
      }).catch(err => this.$message.error(err))
    },
    // 绑定角色
    bindingRolesSubmit(id) {
      bindingRoles(id, this.userRolesData).then(res => {
        this.rolesVisible = false
        this.fetchData()
      }).catch(err => this.$message.error(err))
    },
    // 取消
    bindingRolesCancel() {
      this.rolesVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mobileStyle.scss";
// 设置派发弹框的宽度为20%，因为内容很少
.width-20 /deep/ .el-dialog {
  width: 20%;
}
</style>
