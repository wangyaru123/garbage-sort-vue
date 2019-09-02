<template>
  <!-- 个人资料表 -->
  <div :class="isMobile?'p-10':'p-10'">
    <el-form label-position="right" label-width="80px" :model="userData" :class="isMobile?'mt-10':''">
      <el-form-item label="姓名：">
        <el-input v-model="userData.name"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="userData.sex" placeholder="请选择" size="small">
          <el-option v-for="item in sexList" :key="item.sex" :value="item.sex" :label="item.sexName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码:">
        <el-input v-model="userData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="固定电话:">
        <el-input v-model="userData.telephone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="userData.email"></el-input>
      </el-form-item>
      <div :class="isMobile?'':'mt-50'" class="text-c">
        <el-button type="primary" size="medium" @click="submitClick">修改</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getUserNoSenInfoById, updateUserInfoByUser } from '@/api/ucenter/userInfo.js'

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
    },
    // 获取用户是获取敏感信息还是非敏感信息
    userId() {
      return this.$store.state.user.accessTokenDecode.id
    }
  },
  data() {
    return {
      userData: {},
      // 性别列表
      sexList: [{ sex: 1, sexName: '女' }, { sex: 0, sexName: '男' }]
    }
  },
  created() {
    // 组件创建完后获取第一页数据
    this.getData()
  },
  methods: {
    // 根据id获取非敏感信息
    getData() {
      getUserNoSenInfoById(this.userId).then(res => {
        this.userData = res
        this.userData.sex = Number(this.userData.sex)
      }).catch(err => this.$message.error(err))
    },
    // 点击确定按钮,保存用户信息
    submitClick() {
      updateUserInfoByUser(this.userData.adminId, this.userData).then(res => {
        this.$message.success('修改成功')
        this.getData()
      }).catch(err => this.$message.error(err))
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/mobileStyle.scss";
</style>
