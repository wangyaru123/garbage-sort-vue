<template>
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
          @size-change="getCompanyByPage"
          @current-change="getCompanyByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
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
        <el-button type="primary" size="small" round @click="addClick">添加公司</el-button>
        <el-table :data="tableData" border stripe class="mt-10">
          <el-table-column label="序号" fixed width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公司名称" fixed align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="法人" fixed align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.legalPerson}}</span>
            </template>
          </el-table-column>
          <el-table-column label="业务范围" align="center" min-width="200px">
            <template slot-scope="scope">
              <span>{{ scope.row.businessScope}}</span>
            </template>
          </el-table-column>
          <el-table-column label="成立日期" width="180px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.establishmentDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="业务性质" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.natureOfBusiness }}</span>
            </template>
          </el-table-column>
          <el-table-column label="安装地址" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.location}}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册资本" align="center" width="180px">
            <template slot-scope="scope">
              <span>{{ scope.row.registeredCapital}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="160px">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150px" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.adminId!==1" type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getCompanyByPage"
          @current-change="getCompanyByPage"
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
        <el-form-item label="公司名称：">
          <el-input v-model="dialogData.companyName"></el-input>
        </el-form-item>
        <el-form-item label="业务范围：">
          <el-input v-model="dialogData.businessScope"></el-input>
        </el-form-item>
        <el-form-item label="成立日期:">
          <el-date-picker v-model="dialogData.establishmentDate" value-format="yyyy-MM-DD 00:00:00" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="负责人:">
          <el-input v-model="dialogData.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="业务性质:">
          <el-input v-model="dialogData.natureOfBusiness"></el-input>
        </el-form-item>
        <el-form-item label="安装地址:">
          <el-input v-model="dialogData.location"></el-input>
        </el-form-item>
        <el-form-item label="注册资本:">
          <el-input v-model="dialogData.registeredCapital"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="dialogData.remarks"></el-input>
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
import { getCompanyByPage, getCompanyById, addCompany, updateCompany, deleteCompany } from '@/api/ucenter/company.js'

export default {
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  data() {
    return {
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 新增还是编辑
      dialogAction: [],
      // 弹框显示
      dialogVisible: false,
      // 弹框数据
      dialogData: {}
    }
  },
  created() {
    this.getCompanyByPage()
  },
  methods: {
    // 获取公司列表
    getCompanyByPage() {
      getCompanyByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err))
    },
    // 根据id获取公司信息
    getCompanyById(adminId) {
      getCompanyById(adminId).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err))
    },
    // 新增公司
    addCompany() {
      addCompany(this.dialogData).then(res => {
        this.dialogVisible = false
        this.$message.success('添加成功')
        this.getCompanyByPage()
      }).catch(err => this.$message.error(err))
    },
    // 更新当前公司的信息
    updateCompany() {
      updateCompany(this.dialogData.companyId, this.dialogData).then(res => {
        this.dialogVisible = false
        this.$message.success('修改成功')
        this.getCompanyByPage()
      }).catch(err => this.$message.error(err))
    },
    // 删除单条已提交报警信息
    deleteCompany(id) {
      deleteCompany(id).then(res => {
        this.$message.success('删除成功')
        this.getCompanyByPage()
      }).catch(err => this.$message.error(err))
    },
    // 添加用户信息
    addClick() {
      this.dialogAction = 'add'
      this.dialogVisible = true
      this.dialogData = {}
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogAction = 'edit'
      this.dialogVisible = true
      this.getCompanyById(row.companyId)
    },
    // 点击确定按钮,保存用户信息
    submitClick() {
      if (this.dialogAction === 'add') this.addCompany()
      else this.updateCompany()
    },
    // 点击取消，隐藏弹窗
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteCompany(row.companyId))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
