<template>
  <!-- 盒子信息表 -->
  <div :class="isMobile?'':'p-10'">
    <!-- 移动端 -->
    <div v-if="isMobile">
      <div>
        <el-card class="box-card m-5" v-for="(item,index) in tableData" :key="index">
          <div slot="header" class="flexbox" @click="toDetailPage( item.name )">
            <div>{{item.name}}</div>
            <el-tag class="text-r" :type="item.boxStatus ? 'primary' : 'danger'" disable-transitions>{{ item.boxStatus ? "在线" : "离线" }}</el-tag>
          </div>
          <div @click="toDetailPage( item.name )">
            <div class="text item">启动时间：{{item.startTime}}</div>
            <div class="text item">固件版本：{{item.version}}</div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- PC端- -->
    <div v-else>
      <el-row>
        <el-table :data="tableData" border stripe style="width:100%;">
          <el-table-column label="序号" fixed width="50px" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="盒子名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="启动时间" width="200px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动时间" width="200px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.activeTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="固件版本" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.version}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100px" align="center">
            <template slot-scope="scope">
              <el-tag
                class="text-r"
                :type="scope.row.boxStatus ? 'primary' : 'danger'"
                disable-transitions
              >{{ scope.row.boxStatus ? "在线" : "离线" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toDetailPage( scope.row.name )">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data() {
    return {
      // 当前页的表格数据
      tableData: []
    }
  },
  created() {
    this.openWebSocket()
  },
  beforeDestroy() {
    this.closeWebSocket()
  },
  methods: {
    // 跳转到任务页面
    toDetailPage(name) {
      this.$router.push({
        path: '/boxInfoModule/boxDetailInfo',
        query: { name: name }
      })
    },
    openWebSocket() {
      // 建立连接对象
      const socket = new this.$sockjs(process.env.VUE_APP_WS_BOX)
      // 获取STOMP子协议的客户端对象
      this.stompClient = this.$stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = {
        Authorization: this.$store.getters.authorization
      }
      this.stompClient.connect(headers, () => {
        console.log(`开启websocket并已连接，服务器地址：${process.env.VUE_APP_WS_BOX}，订阅的主题为：${process.env.VUE_APP_TOPIC_BOX}`)
        this.stompClient.subscribe(process.env.VUE_APP_TOPIC_BOX, msg => {
          // console.log(JSON.parse(msg.body))
          this.tableData = JSON.parse(msg.body)
        })
      }, error => {
        console.log('fail : ' + error)
      })
    },
    closeWebSocket() {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('关闭websocket')
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/mobileStyle.scss";
</style>
