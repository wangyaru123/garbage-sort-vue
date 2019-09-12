<template>
  <div class="main-layout">
    <el-row class="content">
      <el-col :span="8">
        <div class="item" v-if="userSensitivePageAuth || userNosensitivePageAuth" @click="toUserPage">
          <h1 class="text-c ver-m">用户中心</h1>
        </div>
      </el-col>
      <el-col :span="8" v-if="boxPageAuth" @click="toBoxPage">
        <div class="item">
          <h1 class="text-c ver-m">盒子信息</h1>
        </div>
      </el-col>
      <el-col :span="8" v-if="alarmPageAuth" @click="toAlarmPage">
        <div class="item">
          <h1 class="text-c ver-m">报警模块</h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item" v-if="devicePageAuth" @click="toDevicePage">
          <h1 class="text-c ver-m">设备管理</h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item" v-if="noticePageAuth" @click="toNoticePage">
          <h1 class="text-c ver-m">消息通知</h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item" v-if="fileAdminPageAuth || fileUserPageAuth" @click="toFilePage">
          <h1 class="text-c ver-m">文件管理</h1>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    // 查询用户中心权限
    userSensitivePageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_sensitive_page')
    },
    // 查询用户中心权限
    userNosensitivePageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_admin_nonsentive_page')
    },
    // 查询盒子中心权限
    boxPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('box_page')
    },
    // 查询报警中心权限
    alarmPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('alarm_info_page')
    },
    // 查询设备中心权限
    devicePageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('equipment_page')
    },
    // 查询消息中心权限
    noticePageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('maintain_message_page')
    },
    // 查询文件管理权限
    fileAdminPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('file_admin_page')
    },
    // 查询文件管理权限
    fileUserPageAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('file_user_page')
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toUserPage() {
      this.$router.push({
        path: '/ucenter/UserInfo'
      })
    },
    toBoxPage() {
      this.$router.push({
        path: '/boxInfoModule/boxInfo'
      })
    },
    toAlarmPage() {
      this.$router.push({
        path: '/alarmModule/alarmInfo'
      })
    },
    toDevicePage() {
      this.$router.push({
        path: '/deviceModule/index'
      })
    },
    toNoticePage() {
      this.$router.push({
        path: '/deviceModule/index'
      })
    },
    toFilePage() {
      if (this.fileAdminPageAuth) {
        this.$router.push({
          path: '/fileAdminModule/sys'
        })
      } else {
        this.$router.push({
          path: '/fileAdminModule/user'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 90%;
}
.el-col {
  padding: 80px 20px;
  // border: 1px solid red;
}
.item {
  height: 150px;
  line-height: 150px;
  width: 300px;
  margin:0 auto;
  background-color: rgba(164, 224, 244, 0.5);
  position: relative;
  border: 1px solid #0491ab;
  border-radius: 15px;
}
.ver-m {
  margin-top: 50px;
}
</style>
