<template>
  <!-- 保养项目 -->
  <div :class="isMobile?'':'p-10'">
    <!-- 移动端 -->
    <div v-if="isMobile">
      <div class="fixed">
        <el-pagination
          background
          layout="prev, jumper, next, total"
          :page-size="10"
          :total="total"
          @size-change="getCheckItems"
          @current-change="getCheckItems"
          :current-page.sync="currentPage"
        ></el-pagination>
        <!-- <div class="page-size">每页10条</div> -->
      </div>
      <div class="pt-40">
        <el-card class="m-0 mt-10" :body-style="{ padding: '10px'}" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="clearfix">
            <b>{{ item.checkItemName }}</b>
          </div>
          <div class="text item">
            <group label-width="70px">
              <cell title="点检内容" align-items="flex-start">{{item.content}}</cell>
              <cell title="点检标准" align-items="flex-start">{{item.inspectionStandard}}</cell>
              <cell title="点检目的" align-items="flex-start">{{item.purpose}}</cell>
            </group>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-button type="primary" round size="mini" @click="addRow">添加点检项目</el-button>
        <el-select class="ml-20" v-model="selectLevel" placeholder="请选择保养等级" size="mini" :disabled="!isSelectByLevel" @change="getCheckItems">
          <el-option v-for="item in maintainLevelList" :key="item.level" :value="item.level" :label="item.name"></el-option>
        </el-select>
        <el-checkbox class="float-r check-style" v-model="isSelectByLevel" @change="getCheckItems">是否按照保养等级查询</el-checkbox>
      </el-row>
      <el-table :data="tableData" border stripe style="width:100%;">
        <el-table-column label="序号" width="50px" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保养等级" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ maintainLevelList[scope.row.maintainLevel-1].name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.checkItemName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="点检内容" align="center" min-width="300px">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点检标准" align="center" min-width="300px">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectionStandard }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点检目的" align="center" min-width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.purpose}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt-10 text-r"
        background
        @size-change="getCheckItems"
        @current-change="getCheckItems"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 添加或编辑保养项目弹框 -->
      <el-dialog :visible.sync="dialogVisible" title="请填写" class="width-20">
        <el-form label-position="right" label-width="100px" :model="dialogData">
          <el-form-item label="保养等级：">
            <el-select v-model="dialogData.maintainLevel" placeholder="请选择保养等级" size="small" @change="getCheckItems">
              <el-option v-for="item in maintainLevelList" :key="item.level" :value="item.level" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称：">
            <el-input v-model="dialogData.checkItemName"></el-input>
          </el-form-item>
          <el-form-item label="点检内容：">
            <el-input v-model="dialogData.content" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="点检标准：">
            <el-input v-model="dialogData.inspectionStandard" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="点检目的：">
            <el-input v-model="dialogData.purpose" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
          </el-form-item>
          <div class="text-c">
            <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
            <el-button type="info" size="medium" @click="cancel">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCheckItemsByPage, getCheckItemsByPageAndLevel, getCheckItemsById, addCheckItems, updeteCheckItems, deleteCheckItems } from '@/api/maintainModule/maintainItems.js'
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  data() {
    return {
      // 是否根据等级查询点检项目
      isSelectByLevel: false,
      // 选择的保养等级
      selectLevel: 1,
      // 保养等级列表
      maintainLevelList: [
        { level: 1, name: '一级' },
        { level: 2, name: '二级' },
        { level: 3, name: '三级' }
      ],
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 当前页的表格数据
      tableData: [],
      // 弹框显隐
      dialogVisible: false,
      // 添加还是编辑标志
      act: 'add',
      // 弹框数据
      dialogData: {}
    }
  },
  created() {
    this.getCheckItems()
  },
  methods: {
    // api
    // 获取表格数据
    getCheckItems() {
      if (this.isSelectByLevel) {
        const params = { maintainLevel: this.selectLevel }
        getCheckItemsByPageAndLevel(this.currentPage, this.pageSize, params).then(res => {
          this.tableData = res.list
          this.total = res.total
        }).catch(err => this.$message.error(err))
      } else {
        getCheckItemsByPage(this.currentPage, this.pageSize).then(res => {
          this.tableData = res.list
          this.total = res.total
        }).catch(err => this.$message.error(err))
      }
    },
    // 回显api
    getDialogData(id) {
      getCheckItemsById(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err))
    },
    // 添加api
    addTableData() {
      addCheckItems(this.dialogData).then(res => {
        this.$message.success('添加成功')
        // 跳转索引到最后一个数据上
        if (this.total % this.pageSize === 0) this.currentPage = Math.ceil(this.total / this.pageSize) + 1
        else this.currentPage = Math.ceil(this.total / this.pageSize)
        this.getCheckItems()
      }).catch(err => this.$message.error(err))
    },
    // 编辑api
    editTableData() {
      updeteCheckItems(this.dialogData.checkId, this.dialogData).then(res => {
        this.$message.success('编辑成功')
        this.getCheckItems()
      }).catch(err => this.$message.error(err))
    },
    // 删除api
    deleteTableData(id) {
      deleteCheckItems(id).then(res => {
        this.$message.success('删除成功')
        // 跳转索引到最后一个数据上
        if (this.total % this.pageSize === 1) this.currentPage = Math.ceil(this.total / this.pageSize) - 1
        else this.currentPage = Math.ceil(this.total / this.pageSize)
        this.getCheckItems()
      }).catch(err => this.$message.error(err))
    },
    // 点击添加按钮，弹框显示，并回显数据
    addRow(row) {
      this.dialogVisible = true
      this.act = 'add'
      this.dialogData = {
        checkItemName: '',
        content: '',
        inspectionStandard: '',
        maintainLevel: 1
      }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.dialogVisible = true
      this.act = 'edit'
      this.getDialogData(row.checkId)
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteTableData(row.checkId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 弹框提交
    submitClick() {
      this.dialogVisible = false
      if (this.act === 'add') this.addTableData()
      else this.editTableData()
    },
    // 弹框取消
    cancel() {
      this.dialogVisible = false
      if (this.act === 'add') this.$message.info('取消添加')
      else this.$message.info('取消编辑')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/mobileStyle.scss";
.text /deep/ .weui-cells {
  font-size: 14px;
}
.text /deep/ .weui-cell__ft {
  text-align: left;
}
.check-style {
  height: 32px;
  line-height: 32px;
}
</style>
