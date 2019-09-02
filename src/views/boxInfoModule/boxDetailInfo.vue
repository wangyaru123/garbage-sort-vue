<template>
  <!-- 盒子信息表 -->
  <div class="p-10">
    <el-row>
      <el-button class="m-5" icon="iconfont icon-back" circle size="mini" @click="back"></el-button>
      <span>盒子名称:{{$route.query.name}}</span>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="(item,index) in taskData" :key="index">
        <el-card class="box-card m-5">
          <div class="left-div">
            <div class="device-name">{{item.name}}</div>
            <div class="mt-5">
              <span class="text-gray">活动时间:</span>
              {{item.activeTime}}
            </div>
            <div class="mt-5">
              <span class="text-gray">采集耗时:</span>
              {{item.captureSpendTime}}
            </div>
            <div class="mt-5">
              <!-- <span class="iconfont icon-success"></span> -->
              <span class="text-gray">成功次数:</span>
              {{item.success}}
            </div>
            <div class="mt-5">
              <!-- <span class="iconfont icon-fail"></span> -->
              <span class="text-gray">失败次数:</span>
              {{item.failed}}
            </div>
            <div class="mt-5">
              <span class="text-gray">设备描述:</span>
              {{item.description}}
            </div>
          </div>
          <div class="right-div">
            <span :class="item.deviceStatus?'iconfont icon-deviceSuccess':'iconfont icon-deviceFail'"></span>
            <div v-if="!item.deviceStatus">{{item.stopTime}}小时</div>
            <!-- <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" :width="width" :height="width">
                <circle cx="100" cy="100" :r="100 - border / 2" fill="none" opacity="0.8" :stroke="item.color" :stroke-width="item.color"></circle>
                <circle
                  cx="100"
                  cy="100"
                  :r="85 - border / 2"
                  :fill="item.color"
                  transform="rotate(270,100,100)"
                  :stroke="item.color"
                  :stroke-width="border"
                ></circle>
            </svg>-->
          </div>
        </el-card>
      </el-col>
    </el-row>
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
  // props: {
  //   width: {
  //     type: Number,
  //     default: 60
  //   },
  //   border: {
  //     type: Number,
  //     default: 8
  //   },
  //   fontSize: {
  //     type: Number,
  //     default: 30
  //   }
  // },
  created() {
    this.openWebSocket()
  },
  beforeDestroy() {
    this.closeWebSocket()
  },
  data() {
    return {
      // 当前页的表格数据
      taskData: []
    }
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1)
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
        console.log(`开启websocket并已连接，服务器地址：${process.env.VUE_APP_TOPIC_PER_BOX}/${this.$route.query.name}，订阅的主题为：${process.env.VUE_APP_TOPIC_BOX}`)
        this.stompClient.subscribe(`${process.env.VUE_APP_TOPIC_PER_BOX}/${this.$route.query.name}`, msg => {
          this.taskData = JSON.parse(msg.body)
        })
      }, error => {
        console.log('fail' + error)
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

<style lang="scss" scoped>
.left-div {
  flex: 3;
}
.right-div {
  width: 46px;
  text-align: center;
}
.device-name {
  font-size: 18px;
  font-weight: bold;
}
.flexbox {
  display: flex;
}
.flexbox div {
  flex: 1;
}
</style>

<style lang="scss">
.box-card .el-card__body {
  padding: 10px;
  display: flex;
  font-size: 14px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
</style>
