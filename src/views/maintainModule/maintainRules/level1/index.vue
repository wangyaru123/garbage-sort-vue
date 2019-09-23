<template>
  <!-- 保养规则 -->
  <div>
    <div v-if="isMobile">
      <group style="margin-top:-20px">
        <el-row class="m-5 ml-10">
          <span class="text-r sub-title">设备保养类型：</span>
          <el-select v-model="categoryClickIndex" placeholder="请选择" size="small" @change="categoryItemClick(categoryClickIndex)">
            <el-option v-for="(item,index) in categoryList" :key="item.categoryId" :value="index" :label="item.category"></el-option>
          </el-select>
        </el-row>
        <!-- <el-row class="mt-5 mb-5 ml-10">
          <span class="text-r sub-title">设备保养等级：</span>
          <el-select v-model="levelClickIndex" placeholder="请选择" size="small" @change="levelItemClick(levelClickIndex)">
            <el-option v-for="(item,index) in maintainLevelList" :key="item.maintainLevel" :value="index" :label="item.desc"></el-option>
          </el-select>
        </el-row> -->
        <cell title="保养周期" :value="timeSpan"></cell>
        <cell title="周期间隔" :value="timeInterval"></cell>
      </group>
      <el-card class="m-0 mt-10" :body-style="{ padding: '10px'}" v-for="(item,index) in checkData" :key="index">
        <div slot="header" class="clearfix">
          <div>
            <b>{{ item.checkItemName }}</b>
          </div>
        </div>
        <div class="text item">
          <group label-width="70px">
            <cell title="点检内容" align-items="flex-start">{{item.content}}</cell>
            <cell title="点检标准" align-items="flex-start">{{item.inspectionStandard}}</cell>
            <cell title="点检目的" align-items="flex-start">{{item.purpose}}</cell>
            <cell title="点检班次" align-items="flex-start">
              <template v-for="(duty,index) in item.dutys">
                <div :key="index">
                  <span class="float-l">{{duty.dutyName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="float-r">{{duty.dutyTime}}</span>
                </div>
              </template>
            </cell>
          </group>
        </div>
      </el-card>
    </div>
    <div v-else class="p-10">
      <el-row :gutter="10">
        <!-- 左边--类别与保养等级 -->
        <el-col :span="4" class="text-c">
          <el-card class="el-divider-m10 h-100">
            <div class="h-50">
              <h3>设备保养类型</h3>
              <el-divider></el-divider>
              <div
                v-for="(item,index) in categoryList"
                :key="index"
                class="pt-10"
                :class="index===categoryClickIndex?'selected-bg':''"
                @click="categoryItemClick(index)"
              >
                <a>{{item.category}}</a>
                <el-divider></el-divider>
              </div>
            </div>
            <!-- <div class="h-30">
              <h3>设备保养等级</h3>
              <el-divider></el-divider>
              <div
                v-for="(item,index) in maintainLevelList"
                :key="index"
                class="pt-10"
                :class="index===levelClickIndex?'selected-bg':''"
                @click="levelItemClick(index)"
              >
                <a>{{item.desc}}</a>
                <el-divider></el-divider>
              </div>
            </div> -->
          </el-card>
        </el-col>
        <!-- 中间--点检项目 -->
        <el-col :span="14">
          <el-card>
            <el-row class="el-input-w100">
              <span class="title">周期设置</span>
              <span class="ml-20">保养周期：</span>
              <el-select v-model="timeSpan" placeholder="请选择" size="small" class="w-100">
                <el-option v-for="item in maintainCycleList" :key="item.maintainCycle" :value="item.desc" :label="item.desc"></el-option>
              </el-select>
              <span class="ml-20">周期间隔：</span>
              <el-input-number v-model="timeInterval" :min="1" :max="30" size="small"></el-input-number>
              <el-button type="primary" size="small" @click="saveCheckDataClick" class="float-r" :disabled="!canDeviceCycleSave">保存</el-button>
            </el-row>
          </el-card>
          <el-card class="h-100-83 mt-10">
            <el-row class="mb-10">
              <span class="title">规则设置</span>
              <el-button class="float-r" type="primary" size="small" @click="addRow">添加点检项目</el-button>
            </el-row>
            <h3 v-if="checkData.length===0" class="text-c text-gray h-40 mt-50-p">请添加保养项目</h3>
            <el-table
              v-else
              :data="checkData"
              border
              highlight-current-row
              @row-click="rowClick"
              class="mt-5 rules-table"
              :max-height="tableHight"
            >
              <el-table-column label="序号" width="50px" type="index" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="点检项目" align="center">
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
              <el-table-column label="操作" width="70px" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 添加保养项目弹框 -->
            <el-dialog :visible.sync="dialogVisible" title="添加点检项目" class="width-20">
              <el-form label-position="right" label-width="100px" :model="dialogData">
                <el-form-item label="点检项目：">
                  <el-select v-model="dialogData.checkId" placeholder="请选择" size="small" @change="getCheckInfo(dialogData.checkId)">
                    <el-option v-for="item in checkItemList" :key="item.checkId" :value="item.checkId" :label="item.checkItemName"></el-option>
                  </el-select>
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
                  <el-button type="primary" size="medium" @click="submitAddCheckItem">确定</el-button>
                  <el-button type="info" size="medium" @click="cancelAddCheckItem">取消</el-button>
                </div>
              </el-form>
            </el-dialog>
          </el-card>
        </el-col>
        <!-- 右边--班次 -->
        <el-col :span="6">
          <el-card class="h-100">
            <h3>项目班次</h3>
            <div class="mb-10">
              <span>点检项目名称：</span>
              <span>
                <strong>{{itemRulesName}}</strong>
              </span>
            </div>
            <el-row class="text-c">
              <el-col :span="8">
                <span class="sub-title">班次</span>
              </el-col>
              <el-col :span="11" :offset="1">
                <span class="sub-title">班次时间</span>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" size="small" circle icon="el-icon-plus" @click="addDuty"></el-button>
              </el-col>
            </el-row>
            <el-row v-for="(item,index) in dutyList" :key="index" class="mt-5 text-c">
              <el-col :span="8">
                <el-input size="small" v-model="item.dutyName"></el-input>
              </el-col>
              <el-col :span="11" :offset="1" class="el-date-editor-w100">
                <!-- arrow-control -->
                <el-time-picker size="small" v-model="item.dutyTime" format="HH:mm:ss" value-format="HH:mm:ss" placeholder="任意时间点"></el-time-picker>
              </el-col>
              <el-col :span="4">
                <el-button type="danger" size="small" circle icon="el-icon-minus" @click="removeDuty(index)"></el-button>
              </el-col>
            </el-row>
            <el-row class="text-c mt-50-p">
              <el-button type="primary" size="small" :disabled="!canDutySave" @click="saveDutyDataClick">保存</el-button>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getCategoryList, getCheckItemList, getCheckInfo, getCycleData, getCheckData, saveMaintainCycle, addCheckItem, saveDutyData, deleteCheckData } from '@/api/maintainModule/rules/level1.js'
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
    },
    // 项目的时间班次能否保存
    canDutySave() {
      if (this.itemRulesId < 0) return false
      // console.log(this.dutyList.length)
      const length = this.dutyList.length
      if (length === 0) return false
      for (let i = 0; i < length - 1; i++) {
        // console.log(this.dutyList[i].dutyName)
        // console.log(this.dutyList[i].dutyTime)
        if (this.dutyList[i].dutyName === '') return false
        if (this.dutyList[i].dutyTime === '') return false
      }
      return true
    },
    canDeviceCycleSave() {
      if (this.timeSpan === '') return false
      if (this.timeInterval === '') return false
      return true
    },
    tableHight() {
      return document.body.clientHeight - 250
    }
  },
  data() {
    return {
      // 设备保养类型选中项
      categoryClickIndex: 0,
      // 列表名称
      category: '',
      // 类别列表
      categoryList: [],
      // 保养等级选中项
      levelClickIndex: 0,
      // 等级列表
      maintainLevelList: [
        { maintainLevel: 1, desc: '一级' },
        { maintainLevel: 2, desc: '二级' },
        { maintainLevel: 3, desc: '三级' }
      ],
      // 保养周期选中项
      timeSpan: '',
      // 保养周期列表
      maintainCycleList: [
        { maintainCycle: 'year', desc: '年' },
        { maintainCycle: 'month', desc: '月' },
        { maintainCycle: 'day', desc: '日' }
      ],
      // 保养周期
      timeInterval: '',
      // 选中的点检项目id
      checkId: 0,
      // 点检项目列表
      checkItemList: [],
      // 保养项目表格数据
      checkData: [],
      // 选中的规则id
      itemRulesId: -1,
      itemRulesName: '',
      // 班次列表
      dutyList: [{ dutyName: '', dutyTime: '' }],
      // 添加保养项目弹框
      dialogVisible: false,
      // 弹框数据
      dialogData: {}
    }
  },
  created() {
    this.getCategoryList()
    this.getCheckItemList()
  },
  methods: {
    // api
    // 获取设备保养类型列表
    getCategoryList() {
      getCategoryList().then(res => {
        this.categoryList = res
        this.getCycleData()
        this.getCheckData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取点检项目列表
    getCheckItemList() {
      getCheckItemList({ maintainLevel: this.maintainLevelList[this.levelClickIndex].maintainLevel }).then(res => {
        this.checkItemList = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据点检项目id查询内容
    getCheckInfo(id) {
      getCheckInfo(id).then(res => {
        this.dialogData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取周期数据
    getCycleData() {
      const params = {
        category: this.categoryList[this.categoryClickIndex].category,
        level: this.maintainLevelList[this.levelClickIndex].maintainLevel
      }
      getCycleData(params).then(res => {
        if (res.length > 0) {
          this.timeSpan = res[0].timeSpan
          this.timeInterval = res[0].timeInterval
        } else {
          this.timeSpan = ''
          this.timeInterval = ''
        }
      }).catch(err => this.$message.error(err.toString()))
    },
    // 获取点检表格数据
    getCheckData() {
      const params = {
        category: this.categoryList[this.categoryClickIndex].category,
        level: this.maintainLevelList[this.levelClickIndex].maintainLevel
      }
      getCheckData(params).then(res => {
        this.checkData = res
      }).catch(err => this.$message.error(err.toString()))
    },
    // 保存周期
    saveMaintainCycle() {
      const params = {
        category: this.categoryList[this.categoryClickIndex].category,
        maintainLevel: this.levelClickIndex + 1,
        timeSpan: this.timeSpan,
        timeInterval: this.timeInterval
      }
      saveMaintainCycle(params).then(res => {
        this.$message.success('保存成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加点检项目
    addCheckItem() {
      const params = {
        category: this.categoryList[this.categoryClickIndex].category,
        checkId: this.dialogData.checkId,
        checkItemName: this.dialogData.checkItemName,
        content: this.dialogData.content,
        inspectionStandard: this.dialogData.inspectionStandard,
        maintainLevel: this.levelClickIndex + 1,
        purpose: this.dialogData.purpose
      }
      addCheckItem(params).then(res => {
        this.$message.success('添加成功')
        this.getCheckData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除点检项目
    deleteCheckData(itemRulesId) {
      deleteCheckData(itemRulesId).then(res => {
        this.$message.success('删除成功')
        this.getCheckData()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 保存班次
    saveDutyData() {
      saveDutyData(this.itemRulesId, this.dutyList).then(res => {
        this.getCheckData()
        this.$message.success('保存成功')
      }).catch(err => this.$message.error(err.toString()))
    },
    // 页面操作
    // 点击设备保养类型
    categoryItemClick(index) {
      this.categoryClickIndex = index
      this.getCycleData()
      this.getCheckData()
      this.resetDutyInfo()
    },
    // 点击保养等级
    levelItemClick(index) {
      this.levelClickIndex = index
      this.getCycleData()
      this.getCheckData()
      this.getCheckItemList()
      this.resetDutyInfo()
    },
    resetDutyInfo() {
      this.itemRulesId = -1
      this.itemRulesName = ''
      this.dutyList = [{ dutyName: '', dutyTime: '' }]
    },
    // 点检项目单行点击
    rowClick(row, column, event) {
      console.log(row)
      this.itemRulesId = row.itemRulesId
      this.itemRulesName = row.checkItemName
      this.dutyList = row.dutys.map(item => item)
      if (this.dutyList.length === 0) this.dutyList = [{ dutyName: '', dutyTime: '' }]
    },
    // 点击添加按钮，弹框显示，并回显数据
    addRow(row) {
      this.dialogVisible = true
      this.dialogData = { content: '', inspectionStandard: '', purpose: '' }
    },
    // 点击保存按钮，保存点检项目
    saveCheckDataClick() {
      this.saveMaintainCycle()
    },
    // 点击保存按钮，保存班次
    saveDutyDataClick() {
      this.saveDutyData()
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteCheckData(row.itemRulesId))
        .catch(() => this.$message.info('取消删除'))
    },
    // 点击加号，添加一行班次数据
    addDuty() {
      this.dutyList.push({ dutyName: '', dutyTime: '' })
    },
    // 点击减号，删除一行班次数据
    removeDuty(rowIndex) {
      this.dutyList.splice(rowIndex, 1)
      if (this.dutyList.length === 0) this.dutyList.push({ dutyName: '', dutyTime: '' })
    },
    // 弹框提交
    submitAddCheckItem() {
      this.dialogVisible = false
      this.addCheckItem()
      this.getCycleData()
    },
    // 弹框取消
    cancelAddCheckItem() {
      this.dialogVisible = false
      this.dialogData = { checkId: 1, content: '', inspectionStandard: '', purpose: '' }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider-m10 /deep/ .el-divider--horizontal {
  margin: 10px 0 0 0;
}
.w-100 {
  width: 100px;
}
// .el-input-w100 {
//   height: 32px;
//   line-height: 32px;
// }
.el-input-w100 /deep/ .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.el-date-editor-w100 /deep/ .el-date-editor {
  width: 100%;
}
.h-100 {
  height: calc(100vh - 80px);
}
.h-100-83 {
  height: calc(100vh - 146px);
}
.h-50 {
  height: 50vh;
}
.h-40 {
  height: 40vh;
}
.h-30 {
  height: 30vh;
}
.mt-50-p {
  margin-top: 40%;
}
.selected-bg {
  background-color: #ecf5ff;
}
.rules-table /deep/ .el-popover__reference {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text /deep/ .weui-cells {
  font-size: 14px;
}
.title {
  font-size: 1.17em;
  font-weight: bold;
  height: 32px;
  line-height: 32px;
}
.sub-title {
  line-height: 32px;
}
.text /deep/ .weui-cell__ft {
  text-align: left;
}
</style>
