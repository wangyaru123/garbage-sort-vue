<template>
  <!-- 设备记录 -->
  <div class="p-10">
    <span>所属项目：</span>
    <el-select v-model="projectId" placeholder="请选择" size="small" @change="fetchData">
      <el-option :value="0" label="请选择"></el-option>
      <el-option v-for="item in projectList" :key="item.projectId" :value="item.projectId" :label="item.projectName"></el-option>
    </el-select>
    <el-table :data="currentTableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备序列号" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前重量(克)" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.weight}}</span>
        </template>
      </el-table-column>
      <el-table-column label="回收类别" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.recoverCategory}}</span>
        </template>
      </el-table-column>
      <el-table-column label="投放人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产生行为" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.produceAction}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产生时间" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.produceTime}}</span>
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
    <!-- 添加或编辑会员信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写卡号信息">
      <el-form label-position="right" label-width="140px" :model="dialogData">
        <el-form-item label="卡号：" prop="card">
          <el-input v-model="dialogData.card"></el-input>
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
      // 查询条件
      projectId: '',
      // table所有数据
      tableData: [
        { name: '王一', produceAction: '设备回收', recoverCategory: '纸品', weight: 50, deviceCode: '13254683', produceTime: '2019-11-12' },
        { name: '张山', produceAction: '设备回收', recoverCategory: '玻璃', weight: 40, deviceCode: '13254681', produceTime: '2019-11-15' }
      ],
      // 当前tableData数据
      currentTableData: [],
      // 项目列表
      projectList: [{ projectId: 1, projectName: '浙江试运营' }, { projectId: 2, projectName: '安徽试运营' }],
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 弹框回显报警信息数据
      dialogData: { userId: '', username: 'zhangshan', name: '张山', mobile: '15076541231', card: '', projectId: '' },
      userId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 分页
    fetchData() {
      let tableData = this.tableData
      if (this.projectId) tableData = tableData.filter(item => item.projectId === this.projectId)
      this.currentTableData = tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
      this.total = this.currentTableData.length
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      this.tableData.find(item => item.userId === this.userId).card = this.dialogData.card
      this.fetchData()
      this.dialogData = {}
    },
    // 弹框的取消按钮
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    // 编辑
    editRow(userId) {
      this.dialogVisible = true
      this.dialogData = this.tableData.find(item => item.userId === userId)
      this.userId = userId
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
