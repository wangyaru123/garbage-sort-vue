<template>
  <el-table :data="tableData" style="width: 100%" @expand-change="updataState">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="提交时间" :style="{width:(isMobile?'100%':'50%')}">
            <span>{{ props.row.subTime }}</span>
          </el-form-item>
          <el-form-item label="故障时间" :style="{width:(isMobile?'100%':'50%')}">
            <span>{{ props.row.faultTime }}</span>
          </el-form-item>
          <el-form-item label="故障区域" :style="{width:(isMobile?'100%':'50%')}">
            <span>{{ props.row.faultRegion }}</span>
          </el-form-item>
          <el-form-item label="维修费用" :style="{width:(isMobile?'100%':'50%')}">
            <span>{{ props.row.maintainCost }}</span>
          </el-form-item>
          <el-form-item label="报警描述" :style="{width:(isMobile?'100%':'50%')}">
            <span>{{ props.row.alarmDescription }}</span>
          </el-form-item>
          <el-form-item label="报警图片" :style="{width:(isMobile?'100%':'50%')}">
            <img
              v-for="(img,index) in props.row.alarmImg"
              :src="img"
              :key="index"
              class="img-style-small"
              alt="无图片"
              @click="clickImg(img)"
            >
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="故障时间" prop="faultTime" v-if="!isMobile"></el-table-column>
    <el-table-column label="故障区域" prop="faultRegion" v-if="!isMobile"></el-table-column>
    <el-table-column label="报警描述" prop="alarmDescription"></el-table-column>
    <el-table-column label="操作">
      <el-button type="primary" size="medium" @click="itemClick">去处理</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import { updataState } from '@/api/noticeModule.js'

export default {
  props: ['tableData', 'type', 'isMobile'],
  data() {
    return {
      clickNum: 0
    }
  },
  methods: {
    // 点击去添加维修信息按钮
    itemClick() {
      this.$emit('clickToMaintain')
    },
    // 点击放大图片
    clickImg(img) {
      this.$emit('clickImg', img)
    },
    // 更新已读状态
    updataState(row, expandedRows) {
      this.clickNum++
      // 如果是在维度列表位置，并且是第一次点击，则更新为已读状态，其他情况不更新
      if (this.type === 'unread' && this.clickNum === 1) {
        updataState(row.subNotificationId).then(res => {
          // console.log('更新成功')
        }).catch(err => this.$message.error(err))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>

<style lang="scss" >
.el-table__expanded-cell[class*="cell"] {
  padding: 10px;
}
</style>
