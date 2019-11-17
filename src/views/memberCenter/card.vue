<template>
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick" v-if="addUserAuth">添加用户</el-button>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" fixed align="center" v-if="sensitivePageAuth">
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
          <el-tag v-for="item in scope.row.roles" :key="item.adminRoleId" class="ml-5 mr-5">{{ item.name}}</el-tag>
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
          <span>{{ scope.row.schoolName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属项目" fixed="right" align="center" v-if="sensitivePageAuth">
        <template slot-scope="scope">
          <el-button v-if="scope.row.adminId!==1 && saveRolesAuth" type="success" size="mini" @click="bindingRolesClick( scope.row.adminId )">绑定</el-button>
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
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>