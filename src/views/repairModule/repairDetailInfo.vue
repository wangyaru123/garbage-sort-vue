<template>
  <!-- 维修表移动端详情 -->
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__bd">
      <a class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">维修人:</div>
        <div class="weui-media-box__bd font-size-13 text-gray">{{panelData.adminName}}</div>
      </a>
      <a class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">维修时间:</div>
        <div class="weui-media-box__bd font-size-13 text-gray">{{panelData.maintainTime}}</div>
      </a>
      <a class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">维修过程:</div>
        <div class="weui-media-box__bd">{{panelData.process}}</div>
      </a>
      <a class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">维修结果:</div>
        <div class="weui-media-box__bd" :class="panelData.result?'text-success':'text-danger'">{{ panelData.result?'维修成功':'维修失败'}}</div>
      </a>
      <a class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">维修图片:</div>
        <div class="weui-media-box__bd">
          <img v-for="(img,index) in panelData.maintainImg" :src="img" :key="index" class="img-style-small" alt="无图片" @click="clickImg($event)">
          <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" isMobile="true"></big-img>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { getMaintainInfoById } from '@/api/repireModule.js'
import BigImg from '@/components/BigImg'

export default {
  data() {
    return {
      panelData: {},
      // 点击缩略图放大图片
      showImg: false,
      imgSrc: ''
    }
  },
  components: {
    'big-img': BigImg
  },
  created() {
    // 组件创建完后获取数据
    this.editTableData(this.$route.query.id)
  },
  methods: {
    // 根据id回显数据
    editTableData(id) {
      getMaintainInfoById(id).then(res => {
        this.panelData = res
      }).catch(err => this.$message.error(err))
    },
    // 点击缩略图放大图片
    clickImg(e) {
      this.showImg = true
      // 获取当前图片地址
      this.imgSrc = e.currentTarget.src
    },
    viewImg() {
      this.showImg = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
