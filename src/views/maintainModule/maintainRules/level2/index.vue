<template>
  <!-- 保养父计划 -->
  <div :class="isMobile?'':'p-10'">
    <!-- 移动端 -->
    <div v-if="isMobile" class="mt-10">
      <span class="ml-10">设备类别：</span>
      <el-select v-model="categoryId" placeholder="请选择" size="mini" @change="getRuleData">
        <el-option v-for="(item,index) in categoryList" :key="index" :value="item.categoryId" :label="item.category"></el-option>
      </el-select>
      <el-card class="m-0 mt-10" :body-style="{ padding: '10px'}" v-for="(item,index) in tableData" :key="index">
        <div slot="header" class="clearfix">
          <div>
            <b>{{ item.checkItemName }}</b>
          </div>
        </div>
        <div class="text item">
          <group label-width="70px">
            <cell title="保养周期" align-items="flex-start">{{item.timeSpan}}</cell>
            <cell title="保养间隔" align-items="flex-start">{{item.timeInterval}}</cell>
            <cell title="点检内容" align-items="flex-start">{{item.content}}</cell>
            <cell title="点检标准" align-items="flex-start">{{item.inspectionStandard}}</cell>
            <cell title="点检目的" align-items="flex-start">{{item.purpose}}</cell>
          </group>
        </div>
      </el-card>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <span>设备类别：</span>
        <el-select v-model="categoryId" placeholder="请选择" size="small" @change="getRuleData">
          <el-option v-for="(item,index) in categoryList" :key="index" :value="item.categoryId" :label="item.category"></el-option>
        </el-select>
        <el-button class="float-r" type="primary" size="small" @click="addRow">添加点检项目</el-button>
      </el-row>
      <el-table :data="tableData" border highlight-current-row class="mt-10">
        <el-table-column label="序号" width="50px" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保养周期" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.timeSpan}}</span>
          </template>
        </el-table-column>
        <el-table-column label="周期间隔" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.timeInterval}}</span>
          </template>
        </el-table-column>
        <el-table-column label="点检项目" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.checkItemName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="点检内容" align="center" min-width="150px">
          <template slot-scope="scope">
            <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.content ">
              <span slot="reference">{{ scope.row.content }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="点检标准" align="center" min-width="150px">
          <template slot-scope="scope">
            <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.inspectionStandard ">
              <span slot="reference">{{ scope.row.inspectionStandard }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="点检目的" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.purpose}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170px" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加保养项目弹框 -->
      <el-dialog :visible.sync="dialogVisible" title="添加点检项目" class="width-20">
        <el-form label-position="right" label-width="100px" :model="dialogData">
          <el-form-item label="点检项目：">
            <el-select v-model="dialogData.checkId" placeholder="请选择" size="small" @change="updateRuleDialogInfo()">
              <el-option v-for="item in checkItemList" :key="item.checkId" :value="item.checkId" :label="item.checkItemName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保养周期：">
            <el-select v-model="dialogData.timeSpan" placeholder="请选择" size="small">
              <el-option v-for="item in maintainCycleList" :key="item.maintainCycle" :value="item.desc" :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="周期间隔：">
            <el-input-number v-model="dialogData.timeInterval" :min="1" :max="50" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="点检内容：">
            <el-input v-model="dialogData.content" type="textarea" readonly :autosize="{ minRows: 1, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="点检标准：">
            <el-input v-model="dialogData.inspectionStandard" type="textarea" readonly :autosize="{ minRows: 1, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="点检目的：">
            <el-input v-model="dialogData.purpose" type="textarea" readonly :autosize="{ minRows: 1, maxRows: 4}"></el-input>
          </el-form-item>
          <div class="text-c">
            <el-button type="primary" size="medium" @click="submitOptCheckItem">确定</el-button>
            <el-button type="info" size="medium" @click="cancelOptCheckItem">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCheckItemList, getCategoryList, getRuleData, getRuleDataById, addRuleData, deleteRuleData, updateRuleData } from '@/api/maintainModule/rules/level2.js'
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
      // 类别Id
      categoryId: 1,
      // 类别列表
      categoryList: [],
      // 点检项目列表
      checkItemList: [],
      // 保养周期列表
      maintainCycleList: [
        { maintainCycle: '年', desc: '年' },
        { maintainCycle: '月', desc: '月' },
        { maintainCycle: '日', desc: '日' }
      ],
      // 当前页的表格数据
      tableData: [
        {
          itemRulesId: 1,
          category: '设备类别',
          maintainLevel: 2,
          timeSpan: '月',
          timeInterval: null,
          checkId: 1,
          checkItemName: '点检项目名称',
          content: '点检内容',
          inspectionStandard: '点检标准',
          purpose: '点检目的'
        }
      ],
      // 添加计划弹框显隐
      dialogVisible: false,
      // 添加计划弹框数据
      dialogData: { equipmentId: '', categoryId: '', maintainLevel: '', timeSpan: '', timeInterval: '', startTime: '', num: '', checkerId: '', confirmorId: '' },
      operation: 'add'
    }
  },
  created() {
    this.getCheckItemList()
    this.getCategoryList()
  },
  methods: {
    // 获取点检项目列表
    getCheckItemList() {
      getCheckItemList({ maintainLevel: 2 }).then(res => {
        // console.log(res)
        this.checkItemList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取设备保养类型列表
    getCategoryList() {
      getCategoryList().then(res => {
        // console.log(res)
        this.categoryList = res
        this.getRuleData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据规则id查询内容
    getRuleDataById(id) {
      getRuleDataById(id).then(res => {
        // console.log(res)
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取规则表格数据
    getRuleData() {
      const tmp = this.categoryList.find(item => item.categoryId === this.categoryId)
      if (!tmp) return
      const condition = {
        category: tmp.category
      }
      getRuleData(condition).then(res => {
        console.log(res)
        this.tableData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 更新对话框中的规则数据
    updateRuleDialogInfo() {
      const tmp = this.checkItemList.find(item => item.checkId === this.dialogData.checkId)
      if (!tmp) return
      this.dialogData.checkItemName = tmp.checkItemName
      this.dialogData.content = tmp.content
      this.dialogData.inspectionStandard = tmp.inspectionStandard
      this.dialogData.purpose = tmp.purpose
    },
    // 添加规则数据
    addRuleData() {
      const categoryTmp = this.categoryList.find(item => item.categoryId === this.categoryId)
      if (!categoryTmp) return
      const params = {
        category: categoryTmp.category,
        checkId: this.dialogData.checkId,
        checkItemName: this.dialogData.checkItemName,
        content: this.dialogData.content,
        inspectionStandard: this.dialogData.inspectionStandard,
        purpose: this.dialogData.purpose,
        timeSpan: this.dialogData.timeSpan,
        timeInterval: this.dialogData.timeInterval,
        maintainLevel: 2
      }
      addRuleData(params).then(res => {
        this.getRuleData()
        this.$message.success('添加成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 更新规则数据
    updateRuleData() {
      const condition = {
        timeSpan: this.dialogData.timeSpan,
        timeInterval: this.dialogData.timeInterval
      }
      updateRuleData(this.dialogData.itemRulesId, condition).then(res => {
        this.getRuleData()
        this.$message.success('添加成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除规则项目
    deleteRuleData(itemRulesId) {
      deleteRuleData(itemRulesId).then(res => {
        this.getRuleData()
        this.$message.success('删除成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 点击添加按钮，弹框显示，并回显数据
    addRow() {
      this.dialogVisible = true
      this.operation = 'add'
      this.dialogData = { checkId: '', timeSpan: '日', timeInterval: 1, content: '', inspectionStandard: '', purpose: '' }
    },
    // 删除一行数据
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteRuleData(row.itemRulesId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 编辑一行数据
    editRow(row) {
      this.dialogVisible = true
      this.operation = 'edit'
      this.getRuleDataById(row.itemRulesId)
    },
    // 弹框提交
    submitOptCheckItem() {
      this.dialogVisible = false
      if (this.operation === 'add') this.addRuleData()
      else this.updateRuleData()
    },
    // 弹框取消
    cancelOptCheckItem() {
      this.dialogVisible = false
      this.dialogData = { checkId: '', timeSpan: '日', timeInterval: 1, content: '', inspectionStandard: '', purpose: '' }
      if (this.operation === 'add') this.$message.info('取消添加')
      else this.$message.info('取消编辑')
    }
  }
}
</script>

<style lang="scss">
@import "../../../../styles/mobileStyle.scss";
.text /deep/ .weui-cells {
  font-size: 14px;
}
p /deep/ label.vux-label {
  font-weight: 350;
}
.text /deep/ .weui-cell__ft {
  text-align: left;
}
// .check-style {
//   height: 32px;
//   line-height: 32px;
// }
</style>
