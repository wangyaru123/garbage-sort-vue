<template>
  <el-container class="login-container">
    <el-main class="p-0">
      <!-- 标题行 -->
      <el-row class="title-container title-layout">
        <h3 class="title">映蓝环保后台管理系统</h3>
      </el-row>
      <!-- 内容行 -->
      <el-row type="flex" align="center" class="content-layout">
        <!-- 登录卡片 -->
        <el-col :lg="8" :md="8" :sm="24" :offset="8">
          <el-card shadow="alaways" class="login-layout">
            <div slot="header">
              <h4 class="text-c">欢迎登录</h4>
            </div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
              <el-form-item prop="username">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="用户名"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  prefix-icon="el-icon-lock"
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="登录密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                >
                  <span slot="suffix" class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-input>
              </el-form-item>
              <el-row type="flex" justify="center" class="mt-20">
                <el-col :span="24" class="text-c">
                  <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">立即登录</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 动态列表
      workStatusList: [
        { date: '2019-09-24', title: '工业机器人应用编程“1+X”证书制度试点工作...' },
        { date: '2019-09-04', title: '教育部第二批工业机器人应用编辑“1+X”证书...' }
      ],
      policyFilesList: [
        { date: '2019-06-28', title: '开展1+X证书制度试点加快培养复合型技术技能人才' },
        { date: '2019-07-01', title: '国家职业教育改革实施方案' },
        { date: '2019-07-09', title: '关于在院校实施“学历证书+若干职业技能等级...' },
        { date: '2019-07-28', title: '教育部等四部门印发《关于在院样实施“学历证书...' }
      ],
      annoucementList: [
        { date: '2019-10-18', title: '关于召开工业机器 人应用编程1+X试点实施工作...' },
        { date: '2019-09-03', title: '关于召开工业机器 人应用编程“1+X”证书制...' }
      ]
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$router.push({ path: this.redirect || '/' })
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(err => {
            this.loading = false
            this.$message.error(err.toString())
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      // TODO:跳转至注册页面
      // location.href = process.env.VUE_APP_REGISTER_URL
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background: url("../../assets/login-bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  background-position: center;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 32px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.title-layout {
  margin: 100px auto 0px;
  width: 100%;
  max-width: 1200px;
}
.content-layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-layout /deep/ .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  display: none;
}

.content-layout /deep/ .el-tabs--left .el-tabs__active-bar.is-left {
  left: 0;
  right: auto;
}
.content-layout /deep/ .el-tabs__item {
  color: #fff;
}
.content-layout /deep/ .el-tabs--left .el-tabs__item.is-left:hover {
  color: #0099ff;
  background: rgba($color: #0099ff, $alpha: 0.1);
}
.content-layout /deep/ .el-tabs__item.is-active {
  color: #0099ff;
  background: rgba(64, 158, 255, 0.2);
}
.content-layout /deep/ .el-tabs--left .el-tabs__header.is-left {
  margin-right: 1px;
}
.content-layout /deep/ .el-tabs__content {
  height: 100%;
  background: rgba(255, 255, 255, 0.078);
  border: 1px solid rgba(121, 121, 121, 0.5);
  color: #e4e4e4;
  padding: 18px 24px;
  .news-line {
    margin-bottom: 10px;
    .news-title:hover {
      color: #b3d8ff;
    }
    .news-date {
      text-align: right;
    }
  }
}
.login-layout {
  width: 100%;
  // max-width: 500px;
  margin: 0 auto;
}
.footer {
  font-size: 14px;
  text-align: center;
  color: white;
  line-height: 60px;
  padding: 0;
}
</style>
