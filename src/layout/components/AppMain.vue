<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #fafafa;
  box-shadow: 0px 1px 0px 0px rgba(0, 21, 41, 0.08) inset;
}
.fixed-header + .app-main {
  padding-top: 50px;
  /* 固定导航头部时，最小高度变化为100vh */
  min-height: calc(100vh);
}
</style>
