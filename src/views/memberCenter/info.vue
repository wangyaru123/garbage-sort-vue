<template>
  <!-- 用户信息 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加用户</el-button>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" fixed align="center" min-width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.mebio}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex?'女':'男'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属项目" fixed="right" align="center" v-if="sensitivePageAuth">
        <template slot-scope="scope">
          <span>{{scope.row.project}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
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
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
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
        <el-form-item label="邮箱:">
          <el-input v-model="dialogData.email"></el-input>
        </el-form-item>
        <el-form-item label="所属项目:">
          <el-select v-model="dialogData.projectId" placeholder="请选择" size="small">
            <el-option v-for="item in projectList" :key="item.projectId" :value="item.projectId" :label="item.projectName"></el-option>
          </el-select>
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
export default {
  data() {
    return {
      tableData: [
        { username: 'zhangsan', name: '张三', mebio: '15076541233', email: '2434243562@163.com', sex: 0, address: '' }
      ],
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
      userRolesData: []
    }
  },
  methods: {
    addClick() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
