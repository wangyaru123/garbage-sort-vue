<template>
  <div class="p-10">
    <statisticsState></statisticsState>
  </div>
</template>

<script>
import statisticsState from './statisticsState'

export default {
  components: {
    statisticsState
  },
  data() {
    return {
    }
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-card__header {
  padding: 10px 15px;
}
</style>
