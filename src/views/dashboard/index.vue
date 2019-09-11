<template>
  <!--<div class="dashboard-container">-->
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <!--<div class="dashboard-text" v-for="(value,name,index) in accessTokenDecode" :key="index">{{name}}:{{value}}</div>-->
  <div :class="isMobile?'p-5':'p-10'">
    <el-row :gutter="5">
        <el-card class="box-card">
          <div slot="header" class="text-c">
            <h4><b>{{titleName}}</b></h4>
          </div>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" :class="isMobile?'h-auto':'h-num mb-10'">
              <img :src="machineImgRight" alt="">
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" :class="isMobile?'h-auto':'h-num mb-10'">
              <img :src="machineImg"  alt="">
        </el-col>
          <div class="bottom clearfix text-c">
            <span>{{copyRight}}</span>
          </div>
        </el-card>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import machineImg from '@/assets/machine.png'
import machineImgRight from '@/assets/machineRight.png'
export default {
  data() {
    return {
      // 头像图片
      machineImg,
      machineImgRight,
      titleName: '“1+X”工业机器人应用编程',
      copyRight: 'Copyright © 2016-2020 江苏汇博机器人技术股份有限公司   备案号：苏ICP备13048870号'
    }
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapState('user', ['accessToken', 'accessTokenDecode']),
    isMobile() {
      return this.$store.state.app.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.h-num,.h-auto{
  height: calc(100vh - 210px);
  display: flex;
  align-items: center;
  justify-content:center;
  background: #e3f3ff;
  &:first-child {
    border-right:1px solid #f5faff
  }
  img {
    width: 55%;
  }
}
.h-auto{
  height: 35vh;
}
</style>
