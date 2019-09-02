<template>
  <!-- 消息通知 -->
  <div class="p-10">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="未读消息" name="first">
        <notice-table :tableData="unreadNoticeData" type="unread" @clickToMaintain="itemClick" @clickImg="clickImg" :isMobile="isMobile"></notice-table>
        <el-pagination
          class="mt-10 mobile-pagination"
          :class="isMobile?'text-c':'text-r'"
          background
          @size-change="unreadHandleSizeChange"
          @current-change="unreadHandleCurrentChange"
          :current-page.sync="unreadCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="unreadPageSize"
          :layout="isMobile?'prev, jumper, next, total':'total, sizes, prev, pager, next, jumper'"
          :total="unreadTotal"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second">
        <notice-table :tableData="readedNoticeData" type="readed" @clickToMaintain="itemClick" @clickImg="clickImg" :isMobile="isMobile"></notice-table>
        <el-pagination
          class="mt-10 mobile-pagination"
          :class="isMobile?'text-c':'text-r'"
          background
          @size-change="readHandleSizeChange"
          @current-change="readHandleCurrentChange"
          :current-page.sync="readCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="readPageSize"
          :layout="isMobile?'prev, jumper, next, total':'total, sizes, prev, pager, next, jumper'"
          :total="readTotal"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :isMobile="isMobile"></big-img>
  </div>
</template>

<script>
import { getNoticeInfo } from '@/api/noticeModule.js'
import noticeTable from './components/noticeTable.vue'
import BigImg from '@/components/BigImg'

export default {
  data() {
    return {
      activeName: 'first',
      unreadNoticeData: [],
      readedNoticeData: [],
      showImg: false,
      // 未读消息的分页数据
      unreadTotal: 0,
      unreadCurrentPage: 1,
      unreadPageSize: 10,
      // 已读消息的分页数据
      readTotal: 0,
      readCurrentPage: 1,
      readPageSize: 10
    }
  },
  components: {
    noticeTable,
    BigImg
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
    this.$store.dispatch('notice/setIsDot', false)
    this.getUnreadNoticeData()
  },
  methods: {
    handleClick(tab, event) {
      // 如果tab.index是0,请求未读通知列表，若是1，请求已读通知列表
      if (tab.index === '0') this.getUnreadNoticeData()
      else this.getReadedNoticeData()
    },
    // 获取未读信息，传入state=false
    getUnreadNoticeData() {
      getNoticeInfo(this.unreadCurrentPage, this.unreadPageSize, false).then(res => {
        this.unreadNoticeData = res.list
        this.unreadTotal = res.total
        // console.log(this.unreadNoticeData)
      }).catch(err => this.$message.error(err))
    },
    // 获取已读信息，传入state=true
    getReadedNoticeData() {
      getNoticeInfo(this.readCurrentPage, this.readPageSize, true).then(res => {
        this.readedNoticeData = res.list
        this.readTotal = res.total
        // console.log(this.readedNoticeData)
      }).catch(err => this.$message.error(err))
    },
    // 未读消息pageSize改变时触发
    unreadHandleSizeChange(val) {
      this.unreadPageSize = val
      this.unreadcurrentPage = 1
      // console.log(this.unreadPageSize)
      this.getUnreadNoticeData()
    },
    // 未读消息页数改变时触发
    unreadHandleCurrentChange(val) {
      this.unreadcurrentPage = val
      this.getUnreadNoticeData()
    },
    // 已读消息pageSize改变时触发
    readHandleSizeChange(val) {
      this.readPageSize = val
      this.readcurrentPage = 1
      // console.log(this.readPageSize)
      this.getReadedNoticeData()
    },
    // 已读消息页数改变时触发
    readHandleCurrentChange(val) {
      this.readcurrentPage = val
      this.getReadedNoticeData()
    },
    // 跳转到维修页面
    itemClick() {
      this.$router.push({
        path: '/repairModule/repairInfo'
      })
    },
    // 组件方法:点击缩略图放大图片
    clickImg(imgUrl) {
      this.showImg = true
      // 获取当前图片地址
      this.imgSrc = imgUrl
    },
    // 点击子组件的遮罩层,取消显示
    viewImg() {
      this.showImg = false
    }
  }
}
</script>

<style lang="scss">
/* 为了将中间跳转的内容居中，重写elementUI的样式，为了不影响其他的，所以加上id */
.mobile-pagination .el-pagination__jump {
  margin-left: 0;
}
</style>
