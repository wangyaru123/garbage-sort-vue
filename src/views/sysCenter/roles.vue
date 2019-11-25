<template>
  <!-- 权限表 -->
  <div :class="isMobile?'':'p-10'">
    <!-- 移动端 -->
    <div v-if="isMobile">
      <div id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div class="flexbox mt-5">
              <span style="width:50px">角色:</span>
              <div>{{item.name}}</div>
            </div>
          </div>
          <div class="text item flexbox">
            <div style="width:100%">
              <div class="flexbox mt-5 action-div">
                <span style="width:50px">权限:</span>
                <div>
                  <li v-for="action in item.actions" :label="action.name" :key="action.id">
                    <span>{{action.name}}</span>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button type="primary" size="small" round @click="addClick">添加角色</el-button>
        <el-table :data="tableData" border stripe class="mt-10">
          <el-table-column label="序号" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="请填写角色信息" class="dialog">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="角色：">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-tree :data="treeData" ref="tree" show-checkbox node-key="id" :default-checked-keys="checkedActions" :props="defaultProps"></el-tree>
        <div class="text-c mt-50">
          <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesInfo, addRolesInfo, getRolesInfoById, editRolesInfoById, deleteRolesInfoById, getActionsInfo, saveRolesActionsInfo } from '@/api/sysCenter/rolesInfo.js'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    },
    // 超级管理员权限
    superAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_super')
    },
    // 系统管理员权限
    adminAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin')
    }
  },
  data() {
    return {
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 角色表格数据
      tableData: [],
      // 弹框回显角色信息数据
      dialogData: {},
      // 标记当前是编辑信息还是添加信息
      dialogAction: 'add',
      // 树
      treeData: [],
      // 配置项
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // url与页面对应关系
      urlData: [
        { resourceUrl: '/ucenter', name: '用户管理' },
        { resourceUrl: '/manager', name: '用户管理' }
      ],
      // 选中的列表
      checkedActions: []
    }
  },
  created() {
    // 组件创建完后获取第一页数据
    this.fetchData()
    // 获取全部权限
    this.getActionsList()
  },
  methods: {
    // 获取当前权限表格数据
    fetchData() {
      getRolesInfo().then(res => {
        this.tableData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取全部权限列表
    getActionsList() {
      getActionsInfo().then(res => {
        res.forEach(item => {
          item.name = this.urlData.filter(i => item.resourceUrl === i.resourceUrl)[0].name
        })
        this.treeData = res
        console.log(this.treeData)
      }).catch(err => this.$message.error(err.toString()))
    },
    // // 选择框全选
    // handleCheckAllChange(val) {
    //   this.checkedActions = val ? this.actionsList.map(item => item.name) : []
    //   this.isIndeterminate = false
    // },
    // // 选择框单个选中
    // handleCheckedCitiesChange(value) {
    //   const checkedCount = value.length
    //   this.checkAll = checkedCount === this.actionsList.length
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.actionsList.length
    // },
    // 添加用户信息
    addClick() {
      this.dialogAction = 'add'
      this.dialogVisible = true
      this.dialogData = { name: '', roleCode: 'ROLECODE' }
      // 将选中的清空
      this.checkedActions = []
    },
    // 根据id获取权限
    getRolesInfoById(id) {
      getRolesInfoById(id).then(res => {
        this.dialogData = res
        this.checkedActions = res.actions.map(item => item.id)
        this.$refs['tree'].setCheckedKeys(this.checkedActions)
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogAction = 'edit'
      this.dialogVisible = true
      // 获取当前id的权限
      this.getRolesInfoById(row.id)
    },
    // 保存角色和权限关系信息
    saveRolesActionsInfo() {
      const ids = this.$refs['tree'].getCheckedKeys(true)
      saveRolesActionsInfo(this.dialogData.id, ids).then(res => {
        this.dialogVisible = false
        this.$message.success('保存成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 新增角色
    addRolesInfo() {
      addRolesInfo(this.dialogData).then(res => {
        // 后台返回生成的id,用此id去保存角色与权限的关系
        this.dialogData.id = res
        this.saveRolesActionsInfo()
        this.dialogVisible = false
      }).catch(err => this.$message.error(err.toString()))
    },
    // 修改角色信息
    editRolesInfoById() {
      editRolesInfoById(this.dialogData.id, this.dialogData).then(res => {
        this.saveRolesActionsInfo()
        this.$message.success('修改成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击确定按钮,保存角色信息
    submitClick() {
      if (this.dialogAction === 'add') this.addRolesInfo()
      else this.editRolesInfoById()
    },
    // 点击取消，隐藏弹窗
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
      this.checkedActions = []
    },
    // 删除单条已提交报警信息
    deleteTableData(id) {
      deleteRolesInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(row.id))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mobileStyle.scss";
.action-div div {
  flex: 1;
}
.action-div div li {
  color: #409eff;
  font-size: 20px;
}
.action-div div li span {
  color: #000;
  font-size: 14px;
}
.dialog /deep/ .el-tree {
  width: 60%;
  margin-left: 30%;
}
</style>
