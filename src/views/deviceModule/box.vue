<template>
  <!-- 设备管理表 -->
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
          :current-page="currentPage"
        ></el-pagination>
        <div class="page-size">每页10条</div>
      </div>
      <div class="pt-40" id="padding-card-13">
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox font-size-13 text-gray">
            <div>{{item.boxCode}}</div>
            <div class="text-r">{{ item.category}}</div>
          </div>
          <div class="text item flexbox">
            <div style="width:100%">
              <div class="flexbox mt-5">
                数据键名:
                <div>{{item.dataKey}}</div>
              </div>
              <div class="flexbox mt-5">
                是否绑定:
                <div>
                  <el-tag :type="item.isBind?'':'danger'">{{ item.isBind?'是':'否'}}</el-tag>
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
        <el-button type="primary" size="small" round @click="addRow" v-if="addAuth">添加盒子</el-button>
        <el-table :data="tableData" border stripe style="width:100%;" class="mt-10">
          <el-table-column label="序号" fixed="left" width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="盒子编码" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.boxCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据键名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.dataKey }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否绑定" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isBind?'':'danger'">{{ scope.row.isBind?'是':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" align="center" v-if="updateAuth || deleteAuth">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.boxId )" v-if="updateAuth"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row.boxId )" v-if="deleteAuth"></el-button>
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
    <!-- 编辑盒子信息弹框 -->
    <el-dialog :visible.sync="editDialogVisible" title="请填写盒子信息(*是必填项)" class="editDialog">
      <el-form label-position="right" label-width="120px" :model="dialogData" ref="ruleForm">
        <el-row>
          <el-form-item label="盒子编码：" :rules="{ required: true, message: '请输入盒子编码', trigger: 'blur' }">
            <el-input v-model="dialogData.boxCode"></el-input>
          </el-form-item>
          <el-form-item label="生产时间：" :rules="{ required: true, message: '请输入生产时间', trigger: 'blur' }">
            <el-date-picker v-model="dialogData.productionTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="数据键名：">
            <el-input v-model="dialogData.dataKey"></el-input>
          </el-form-item>
        </el-row>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="editSubmitClick">确定</el-button>
          <el-button type="info" size="medium" @click="editCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getBoxesInfoByPage, getBoxesInfoById, editBoxesInfoById, addBoxesInfo, deleteBoxesInfoById } from '@/api/deviceModule/box.js'
import { parseTime } from '@/utils/index'

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
    // 添加权限
    addAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('equipment_add')
    },
    // 修改权限
    updateAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('equipment_update')
    },
    // 删除权限
    deleteAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('equipment_delete')
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
      // 编辑报警信息弹框显示
      editDialogVisible: false,
      // 弹框回显报警信息数据
      dialogData: {},
      // 设置弹窗是添加还是编辑
      dialogAction: 'add',
      // 放大图片
      imgDialogVisible: false,
      // 放大图片
      dialogImageUrl: [],
      // 上传图片列表
      fileList: [],
      // 设备id
      boxId: '',
      // 学校列表
      schoolList: [],
      // 是否绑定列表
      isBindList: [{ isBind: 0, desc: '未绑定' }, { isBind: 1, desc: '已绑定' }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // api
    // 根据page,size获取当前表格数据
    fetchData() {
      getBoxesInfoByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id回显数据
    getDialogData(id) {
      const params = { id: id }
      getBoxesInfoById(params).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加设备信息
    addTableData() {
      this.editDialogVisible = false
      addBoxesInfo(this.dialogData).then(res => {
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 保存修改的报警信息
    editTableData() {
      this.editDialogVisible = false
      editBoxesInfoById(this.dialogData.boxId, this.dialogData).then(res => {
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除单条已提交报警信息
    deleteTableData(id) {
      deleteBoxesInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 页面操作
    // 点击添加按钮，弹框显示
    addRow() {
      this.dialogAction = 'add'
      this.editDialogVisible = true
      this.fileList = []
      // 初始化弹窗数据
      this.dialogData = {
        boxCode: '',
        dataKey: '',
        productionTime: parseTime(new Date())
      }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(id) {
      this.dialogAction = 'edit'
      this.editDialogVisible = true
      this.getDialogData(id)
    },
    // 修改设备信息，点击确定按钮
    editSubmitClick() {
      if (this.dialogAction === 'add') this.addTableData()
      else this.editTableData()
    },
    // 编辑报警信息弹框,点击取消，隐藏弹窗
    editCancel() {
      this.editDialogVisible = false
      this.dialogData = {}
    },
    // 确认删除
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(id))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mobileStyle.scss";

.editDialog /deep/ .el-dialog {
  width: 30%;
}
.editDialog /deep/ .el-input__inner {
  max-width: 200px;
}
.editDialog /deep/ .el-date-editor.el-input {
  max-width: 200px;
}
</style>
