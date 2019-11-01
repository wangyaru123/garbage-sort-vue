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
          @size-change="getSchoolByPage"
          @current-change="getSchoolByPage"
          :current-page.sync="currentPage"
        ></el-pagination>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div>{{item.schoolName}}</div>
          </div>
          <div class="text item flexbox">
            <div style="width:100%">
              <div class="flexbox mt-5">
                法人:
                <div>{{item.legalPerson}}</div>
              </div>
              <div class="flexbox mt-5">
                业务范围:
                <div>{{item.businessScope}}</div>
              </div>
              <div class="flexbox mt-5">
                成立日期:
                <div>{{item.establishmentDate.split(" ")[0]}}</div>
              </div>
              <div class="flexbox mt-5">
                企业性质:
                <div>{{item.natureOfBusiness}}</div>
              </div>
              <div class="flexbox mt-5">
                所在位置:
                <div>{{item.location}}</div>
              </div>
              <div class="flexbox mt-5">
                注册资本:
                <div>{{item.registeredCapital}}</div>
              </div>
              <div class="flexbox mt-5">
                备注:
                <div>{{item.remarks}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-table :data="tableData" border stripe class="mt-10">
          <el-table-column label="序号" fixed width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学校名称" fixed align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.schoolName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="省" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.province}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" align="center" width="180px">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.contact }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" fixed="right" align="center" width="120px">
            <template slot-scope="scope">
              <el-tag type="primary" v-if="scope.row.status">是</el-tag>
              <el-tag type="danger" v-else>否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="类别" fixed="right" align="center" width="150px">
            <template slot-scope="scope">
              <el-tag type="primary" v-if="scope.row.sort!==2">考核点</el-tag>
              <el-tag type="success" v-if="scope.row.sort!==1">培训点</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="150px">
            <template slot-scope="scope">
              <el-button v-if="scope.row.adminId!==1" type="primary" size="mini" @click="editRow( scope.row )">编辑类别</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-10 text-r"
          background
          @size-change="getSchoolByPage"
          @current-change="getSchoolByPage"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
    <!-- 修改类别 -->
    <el-dialog :visible.sync="dialogVisible" title="请选择类别">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="类别：">
          <el-radio v-model="dialogData.sort" v-for="item in sortList" :key="item.sort" :label="item.sort">{{item.desc}}</el-radio>
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
import { getSchoolByPage, getSchoolById, updateSchoolSort } from '@/api/ucenter/school.js'

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
      // 弹框显示
      dialogVisible: false,
      // 弹框数据
      dialogData: {},
      // 类别列表
      sortList: [{ sort: 1, desc: '考核点' }, { sort: 2, desc: '培训点' }, { sort: 3, desc: '即是考核点又是培训点' }]
    }
  },
  created() {
    this.getSchoolByPage()
  },
  methods: {
    // 获取学校列表
    getSchoolByPage() {
      getSchoolByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id获取学校信息
    getSchoolById(adminId) {
      getSchoolById(adminId).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 更新当前学校的信息
    updateSchoolSort() {
      const params = { id: this.dialogData.schoolId, sort: this.dialogData.sort }
      updateSchoolSort(params).then(res => {
        this.dialogVisible = false
        this.$message.success('修改成功')
        this.getSchoolByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogVisible = true
      this.getSchoolById(row.schoolId)
    },
    // 点击确定按钮
    submitClick() {
      this.updateSchoolSort()
    },
    // 点击取消，隐藏弹窗
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/mobileStyle.scss";
</style>
