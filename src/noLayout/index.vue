<template>
  <router-view />
</template>

<script>
import ResizeMixin from '../layout/mixin/ResizeHandler'
export default {
  data() {
    return {

    }
  },
  mixins: [ResizeMixin]
}
</script>

<style lang="scss" scoped>
</style>
