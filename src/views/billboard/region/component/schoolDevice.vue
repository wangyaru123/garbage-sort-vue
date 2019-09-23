<template>
  <div class="main-style">
    <div class="corner top-left-corner"></div>
    <div class="corner top-right-corner"></div>
    <div class="corner bottom-left-corner"></div>
    <div class="corner bottom-right-corner"></div>
    <div class="content">
      <div class="title">
        {{info.school}}
        <span class="float-r pr-5">{{region}}</span>
      </div>
      <div class="data">
        <div v-for="(item,index) in info.deviceInfo" :key="index" class="info">
          <span class="device" :class="item.online? 'device-online':'device-offline'" @click="getDetail(item)">{{item.deviceNumber}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    region: {
      type: String,
      default: '北京'
    },
    info: {
      type: Object,
      default: () => {
        return {
          school: '杭州电子职业学校',
          deviceInfo: [
            {
              deviceNumber: 'SZ-2019351',
              online: false
            }
          ]
        }
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  methods: {
    getDetail(item) {
      this.$router.push({
        name: 'Billboard.Detail',
        query: { item: item, school: this.info.school }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-style {
  background-color: #001e31;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: inset 0px 0px 4px 0px #00ffff;
}
.corner {
  position: absolute;
  width: 25px;
  height: 25px;
}
.top-left-corner {
  top: -1px;
  left: -1px;
  border-left: 3px solid #009fff;
  border-top: 3px solid #009fff;
}
.top-right-corner {
  top: -1px;
  right: -1px;
  border-right: 3px solid #009fff;
  border-top: 3px solid #009fff;
}
.bottom-left-corner {
  bottom: -1px;
  left: -1px;
  border-left: 3px solid #009fff;
  border-bottom: 3px solid #009fff;
}
.bottom-right-corner {
  bottom: -1px;
  right: -1px;
  border-right: 3px solid #009fff;
  border-bottom: 3px solid #009fff;
}
.content {
  width: 100%;
  height: 100%;
  padding: 10px;
  .title {
    font-size: 20px;
    height: 30px;
    padding-left: 10px;
    color: #dee3e6;
    background: -webkit-linear-gradient(left, #00d1fa, #064975, #001e31);
  }
}
.data {
  height: calc(100% - 30px);
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
}

.info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.device {
  padding: 15px 20px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin: 15px 20px;
  cursor: pointer;
}
.device-online {
  background-color: #57b12b;
}
.device-offline {
  background-color: #b13737;
}
</style>
