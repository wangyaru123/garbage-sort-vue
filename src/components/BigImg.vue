<template>
  <!-- 放大图片组件 -->
  <transition name="fade">
    <div class="img-view" @click.stop="bigImg">
      <!-- 遮罩层 -->
      <div class="img-layer" :class="this.$route.path==='/repairModule/subAlarmDetailInfo'?'mobileDetailImg':''">
        <div class="img">
          <img :src="imgSrc" :class="isMobile?'mobileImg':'pcImg'">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['imgSrc', 'isMobile'],
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>

<style scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
  transform: translate3D(0, 0, 0);
}
.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}

/* bigimg */
.img-view {
  position: relative;
  width: 100%;
  height: 100%;
}

/*遮罩层样式*/
.img-view .img-layer {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  text-align: center;
}
/* 如果是详情页面,显示度设置位0.3 */
.mobileDetailImg {
  background: rgba(0, 0, 0, 0.6) !important;
}
/*不限制图片大小，实现居中*/
.img-view .img img {
  position: relative;
  margin: 0 auto;
  background: #fff;
}
/*移动端实现垂直居中 */
.mobileImg {
  max-width: 100%;
  transform: translateY(50%);
}
/* pc端 */
.pcImg {
  width: 60%;
  margin-top: 10vh !important;
}
</style>
