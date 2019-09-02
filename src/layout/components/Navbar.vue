<template>
  <div>
    <div class="navbar">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

      <breadcrumb class="breadcrumb-container" />

      <div class="right-menu">
        <div class="right-menu-item" @click="noticeClick" v-if="navbarNotice">
          <el-badge :is-dot="isDot" class="badgeClass">
            <span class="iconfont icon-notice"></span>
          </el-badge>
        </div>
        <el-dropdown class="avatar-container" :style="{top:(navbarNotice?'-15px':'')}" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatarImg" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <router-link to="/ucenter/loginUserInfo">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item>
              <span style="display:block;" @click="editPassword">修改密码</span>
            </el-dropdown-item>
            <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
            </a>-->
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="请修改密码" :modal-append-to-body="false">
      <el-form label-position="right" label-width="100px" :model="dialogData" :rules="formRule">
        <el-form-item label="当前密码：">
          <el-input v-model="dialogData.oldPassword">{{ dialogData.oldPassword }}</el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="dialogData.newPassword">{{ dialogData.newPassword }}</el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="dialogData.retypePassword">{{ dialogData.retypePassword }}</el-input>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitPassword">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkPassword, editPassword } from '@/api/ucenter/passwardInfo.js'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import avatarImg from '@/assets/avatar.jpg'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  props: ['navbarNotice'],
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // 是否有新通知
    isDot() {
      return this.$store.getters.isDot
    },
    // 用户id
    userId() {
      return this.$store.state.user.accessTokenDecode.id
    }
  },
  data() {
    return {
      // 头像图片
      avatarImg,
      // 修改密码弹窗
      dialogVisible: false,
      // 弹窗密码数据
      dialogData: { oldPassword: '', newPassword: '', retypePassword: '' },
      formRule: {
        oldPassword: [
          { required: true, message: '必填' }
        ],
        newPassword: [
          { required: true, message: '必填' }
        ],
        retypePassword: [
          { required: true, message: '必填' }
        ]
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 点击通知图标,跳转到通知页面,红点消失
    noticeClick() {
      this.$router.push({
        path: '/noticeModule/noticeInfo'
      })
    },
    // 修改密码
    editPassword() {
      this.dialogVisible = true
    },
    submitPassword() {
      console.log(this.userId)
      console.log(this.dialogData)
      const checkParams = {
        id: this.userId,
        password: this.dialogData.oldPassword
      }
      // 旧密码检验
      checkPassword(this.userId, checkParams).then(res => {
        // 提交新密码
        editPassword(this.userId, this.dialogData)
          .then(result => {
            this.$message.success('修改成功')
            this.dialogVisible = false
            // 修改成功后立即退出
            this.logout()
          })
          .catch(error => this.$message.error(error))
      }).catch(err => this.$message.error(err))
    },
    // 点击取消，隐藏弹窗,清空图片缓存
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
      this.fileList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 0;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.icon-notice {
  font-size: 20px;
}
.badgeClass {
  height: 20px;
  line-height: 20px;
}
</style>
