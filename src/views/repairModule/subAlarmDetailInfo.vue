<template>
<!-- 已提交报警表移动端详情 -->
  <div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <a class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">提交时间：</div>
          <div class="weui-media-box__bd font-size-13 text-gray">{{panelData.subTime}}</div>
        </a>
        <a class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">故障时间：</div>
          <div class="weui-media-box__bd font-size-13 text-gray">{{panelData.faultTime}}</div>
        </a>
        <a class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">故障区域：</div>
          <div class="weui-media-box__bd">{{panelData.faultRegion}}</div>
        </a>
        <a class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">报警描述：</div>
          <div class="weui-media-box__bd">{{panelData.alarmDescription}}</div>
        </a>
        <a class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">维修费用：</div>
          <div class="weui-media-box__bd">{{panelData.maintainCost}}</div>
        </a>
        <a class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">报警图片：</div>
          <div class="weui-media-box__bd">
            <img v-for="(img,index) in panelData.alarmImg" :src="img" :key="index" class="img-style-small" alt="无图片" @click="clickImg($event)">
            <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" isMobile="true"></big-img>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getSubAlarmInfoById } from '@/api/repireModule.js'
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
      getSubAlarmInfoById(id).then(res => {
        this.panelData = res
      }).catch(err => this.$message.error(err.toString()))
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
