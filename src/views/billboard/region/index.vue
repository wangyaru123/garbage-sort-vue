<template>
  <div :class="isMobile? 'total-layout-mobile':'total-layout'">
    <div class="title">
      <img v-if="!isMobile" src="../../../assets/billboard/h1Posco.png" class="pl-10 float-l" alt />
      <img v-if="!isMobile" src="../../../assets/billboard/extra.png" alt />
      <span class="title-name">“1+X”工业机器人应用编程</span>
      <img v-if="!isMobile" src="../../../assets/billboard/extra.png" alt />
      <img v-if="!isMobile" src="../../../assets/billboard/goBack.png" class="go-back" alt @click="goBack" title="返回" />
    </div>
    <el-row class="content">
      <el-col v-for="(item,index) in cityData[city]" :key="index" :lg="12" :md="12" :sm="24" :class="isMobile?'p-10':'content-layout'">
        <school-device :info="item" :region="city"></school-device>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import schoolDevice from './component/schoolDevice'

export default {
  components: {
    schoolDevice
  },
  data() {
    return {
      cityData: {
        '苏州': [
          {
            school: '汇博立宁职业培训学校 ',
            deviceInfo: [
              { deviceNumber: 'SZ-2019322', online: true },
              { deviceNumber: 'SZ-2019311', online: true },
              { deviceNumber: 'SZ-2019314', online: true },
              { deviceNumber: 'SZ-2019359', online: false }
            ]
          },
          {
            school: '苏州工业职业技术学院',
            deviceInfo: [
              { deviceNumber: 'SZ-2019156', online: true },
              { deviceNumber: 'SZ-2019155', online: true },
              { deviceNumber: 'SZ-2019199', online: false },
              { deviceNumber: 'SZ-2019112', online: true }
            ]
          }
        ],
        '杭州': [
          {
            school: '杭州科技职业技术学院',
            deviceInfo: [
              { deviceNumber: 'SZ-2019122', online: true },
              { deviceNumber: 'SZ-2019143', online: true },
              { deviceNumber: 'SZ-2019194', online: true },
              { deviceNumber: 'SZ-2019105', online: true }
            ]
          }
        ],
        '广州': [
          {
            school: '广州机电职业技术学院',
            deviceInfo: [
              { deviceNumber: 'SZ-2019512', online: true },
              { deviceNumber: 'SZ-2019590', online: false },
              { deviceNumber: 'SZ-2019534', online: false },
              { deviceNumber: 'SZ-2019521', online: true }
            ]
          }
        ]
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    },
    city() {
      return this.$store.state.billboard.city
    }
  },
  created() {
    this.initData()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    initData() {
      this.region = this.$route.params.name
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.total-layout {
  background-color: #002035;
  height: 100vh;
  width: 100vw;
  color: white;
}
.title {
  height: 80px;
  width: 100%;
  text-align: center;
  line-height: 80px;
  font-size: 28px;
  color: #00ffcc;
  border-bottom: 1px solid #009fff;
  .title-name {
    background: radial-gradient(center, #00adcf, #02263e, #002035);
    background: -webkit-radial-gradient(center, #00adcf, #02263e, #002035);
  }
}
.go-back {
  height: 40px;
  width: 40px;
  margin: 20px;
  float: right;
  cursor: pointer;
}
.content {
  min-height: calc(100vh - 80px);
  color: white;
}

.content-layout {
  height: calc(50vh - 40px);
  padding: 10px;
}
.item-h33 {
  height: 33.3%;
}
.item-h22 {
  height: 22.2%;
}
.item-h44 {
  height: 44.4%;
}
.item-h50 {
  height: 50%;
}
.h100 {
  height: 100%;
}
.total-layout-mobile {
  background-color: #002035;
  min-height: 100vh;
  width: 100%;
  color: white;
  .content-layout {
    height: 100vh;
    padding: 10px;
  }
}
</style>
