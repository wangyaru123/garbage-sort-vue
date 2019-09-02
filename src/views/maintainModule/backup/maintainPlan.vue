<template>
  <!-- 查看保养计划 -->
  <div class="p-10">
    <el-row>
      <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
      <span>设备名称:{{$route.query.name}}</span>
    </el-row>
    <el-row>
      <el-timeline>
        <el-timeline-item
          placement="top"
          v-for="(item, index) in maintainData"
          :key="index"
          :type="item.type"
          :color="item.color"
          :timestamp="item.preventiveTime"
        >
          <el-card class="elcard-p-0" v-if="!isMobile">
            <el-row :gutter="10">
              <el-col :span="2" class="text-c">
                <div class="index-div">
                  <h2 class="m-0">{{index+1}}</h2>
                </div>
              </el-col>
              <el-col :span="22">
                <el-row>
                  <p class="lineHeight-28 mt-10">备注：{{item.remarks}}</p>
                </el-row>
                <el-row>
                  <el-col :span="16" class="mb-10">
                    <p class="lineHeight-28">距离设备开启时间：{{item.distanceDeviceEnableTime}}天</p>
                  </el-col>
                  <el-col :span="8">
                    <el-button v-if="item.addBtnShow" type="success" circle icon="el-icon-plus" size="mini" @click="addMaintainInfo( item )"></el-button>
                    <el-button v-if="item.orderBtnShow" type="info" circle icon="el-icon-s-order" size="mini" @click="showMaintainInfo( item )"></el-button>
                    <el-button v-if="item.editBtnShow" type="primary" circle icon="el-icon-edit" size="mini" @click="editMaintainInfo( item )"></el-button>
                    <el-button v-if="item.deleteBtnShow" type="danger" circle icon="el-icon-delete" size="mini" @click="deleteMaintainInfo( item )"></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
          <el-card v-else>
            <el-row>
              <el-col :span="12" class="text-l">
                <el-button circle size="mini" type="primary"> &nbsp;{{index+1}}&nbsp; </el-button>
              </el-col>
              <el-col :span="12" class="text-r">
                <el-button v-if="item.orderBtnShow" type="info" circle icon="el-icon-s-order" size="mini" @click="showMaintainInfo( item )"></el-button>
              </el-col>
            </el-row>
            <el-row>
              <p class="lineHeight-28 mt-10">备注：{{item.remarks}}</p>
            </el-row>
            <el-row>
              <p class="lineHeight-28">距离设备开启时间：{{item.distanceDeviceEnableTime}}天</p>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-row>
    <el-pagination
      :class="isMobile?'mt-10 text-c':'mt-10 text-r'"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      :layout="isMobile?'total, prev, next, jumper':'total, sizes, prev, pager, next, jumper'"
      :total="total"
    ></el-pagination>
    <!-- 修改保养信息弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写保养信息">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="时间：" class="picker">
          <el-date-picker
            v-model="dialogData.preventiveTime"
            :picker-options="pickerOptions"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
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
import { getPage, getMaimtainPlanByPage, getMaimtainPlanById, updateMaimtainInfoById, deleteMaimtainInfoById } from '@/api/maintainModule/maintainPlan.js'
import { parseTime } from '@/utils/index'

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
      pageSize: 5,
      // 保养数据
      maintainData: [],
      // 修改保养信息弹框是否显示
      dialogVisible: false,
      // 修改保养信息数据
      dialogData: {},
      // 今天之前时间的禁用
      pickerOptions: { disabledDate: time => time.getTime() < Date.now() }
    }
  },
  created() {
    // 获取今天日期数据所在页码位置
    this.getPage()
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.push({
        path: '/maintainModule/index'
      })
    },
    // pageSize改变时触发
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getMaimtainPlanByPage()
    },
    // 页数改变时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMaimtainPlanByPage()
    },
    // 查询今天对应的保养计划对应的页码
    getPage() {
      getPage(this.$route.query.id, this.pageSize)
        .then(res => {
          // 设置今天日期数据所在页码位置
          this.currentPage = res
          // 请求保养数据
          this.getMaimtainPlanByPage()
        })
        .catch(err => this.$message.error(err))
    },
    // 获取保养数据
    getMaimtainPlanByPage() {
      getMaimtainPlanByPage(this.$route.query.id, this.currentPage, this.pageSize).then(res => {
        const maintainData = res.list
        maintainData.forEach(item => {
          // 计划时间在当前时间之前还是之后，true为之后，false为之前
          const aroundToday = Date.parse(item.preventiveTime) > Date.parse(parseTime(new Date()))
          // status为true,表示已保养，颜色为灰色,status为false，表示未保养
          if (item.status) {
            // 查看保养按钮显示，不管保养计划时间在当前时间之前还是之后
            item.orderBtnShow = true
          } else {
            // 添加保养按钮显示，不管保养计划时间在当前时间之前还是之后
            item.addBtnShow = true
            // 计划时间在当前时间之后(true)，则为绿色,可删除和编辑； 计划时间在当前时间之前(false),则为红色
            if (aroundToday) {
              item.color = '#67C23A'
              item.editBtnShow = true
              item.deleteBtnShow = true
            } else item.color = '#F56C6C'
          }
        })
        this.maintainData = maintainData
        this.total = res.total
        // console.log(this.maintainData)
      }).catch(err => this.$message.error(err))
    },
    // 跳转到添加保养文档记录页面
    addMaintainInfo(row) {
      this.$router.push({
        path: '/maintainModule/addMaintainRecord',
        query: { id: row.id, name: this.$route.query.name, action: 'add' }
      })
    },
    // 跳转到查看保养文档记录页面
    showMaintainInfo(row) {
      this.$router.push({
        path: '/maintainModule/addMaintainRecord',
        query: { id: row.id, name: this.$route.query.name, action: 'edit' }
      })
    },
    // 编辑保养信息
    editMaintainInfo(row) {
      this.dialogVisible = true
      getMaimtainPlanById(row.id)
        .then(res => { this.dialogData = res })
        .catch(err => this.$message.error(err))
    },
    // 确定编辑保养信息
    submitClick() {
      updateMaimtainInfoById(this.dialogData.pmPlanId, this.dialogData)
        .then(res => {
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.getMaimtainPlanByPage()
        })
        .catch(err => this.$message.error(err))
    },
    cancel() {
      this.dialogVisible = false
    },
    deleteMaimtainInfoById(id) {
      deleteMaimtainInfoById(id).then(res => {
        this.$message.success('删除成功')
        this.getMaimtainPlanByPage()
      }).catch(err => this.$message.error(err))
    },
    // 删除保养信息
    deleteMaintainInfo(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteMaimtainInfoById(row.id))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style lang="scss" scoped>
.lineHeight-28 {
  line-height: 28px;
}
.index-div {
  width: 100%;
  height: 76px;
  // margin-right: 10px;
  line-height: 76px;
  vertical-align: middle;
  color: #fff;
  background-color: #409eff;
}
.index-div h2 {
  height: 76px;
  line-height: 76px;
}
.elcard-p-0 /deep/ .el-card__body {
  padding: 0;
}
</style>
