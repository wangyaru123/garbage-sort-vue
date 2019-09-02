<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar :navbarNotice="navbarNotice" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { getUserNoSenInfoById } from '@/api/ucenter/userInfo.js'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      // 向navbar组件传递是否显示通知标识
      navbarNotice: false
    }
  },
  created() {
    this.getPosition()
  },
  beforeDestroy() {
    this.closeWebSocket()
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 跳转到通知页面
    toNoticePage() {
      this.$router.push({
        path: '/noticeModule/noticeInfo'
      })
    },
    // 获取职位信息
    getPosition() {
      // 调用ucenter的查询用户非敏感信息接口
      getUserNoSenInfoById(this.$store.state.user.accessTokenDecode.id).then(res => {
        const positionId = res.positionId
        if (positionId === 5) {
          // 向navbar组件传递设置显示通知图标
          this.navbarNotice = true
          // 开启webSocket
          this.openWebSocket()
        }
      }).catch(err => this.$message.error(err))
    },
    openWebSocket() {
      // 建立连接对象
      const socket = new this.$sockjs(process.env.VUE_APP_WS)
      // 获取STOMP子协议的客户端对象
      this.stompClient = this.$stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = {
        Authorization: this.$store.getters.authorization
      }
      this.stompClient.connect(headers, () => {
        console.log('--------------------------------')
        console.log(`开启websocket并已连接，服务器地址：${process.env.VUE_APP_WS}，订阅的主题为：/user/${this.$store.state.user.accessTokenDecode.id}/maintenance`)
        this.stompClient.subscribe(`/user/${this.$store.state.user.accessTokenDecode.id}/maintenance`, msg => {
          this.$store.dispatch('notice/getUnreadNoticeData')
          const h = this.$createElement
          this.$notify({
            type: 'warning',
            duration: 0,
            message: h('a', {
              on: { click: this.toNoticePage }
            }, '您有新的维修任务')
          })
          // 如果当前位置是通知页面，则红点不显示，如果不是通知页面，红点显示
          if (this.$route.path === '/noticeModule/noticeInfo') this.$store.dispatch('notice/setIsDot', false)
          else {
            this.$store.dispatch('notice/setIsDot', true)
            console.log(this.$route.path === '/noticeModule/noticeInfo')
          }
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
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
