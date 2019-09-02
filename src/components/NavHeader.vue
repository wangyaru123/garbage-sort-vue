<template>
  <div class="header">
    <h1>智能传感器云平台</h1>
    <ul class="nav-page">
      <li>
        <router-link :to="{ name: 'DataMonitor'}">数据监控</router-link>&nbsp;&nbsp;&nbsp;&nbsp;/
      </li>
      <li>
        <router-link :to="{ name: 'ConfigModule1'}">参数配置</router-link>&nbsp;&nbsp;&nbsp;&nbsp;/
      </li>
      <li>
        <router-link :to="{ name: 'CommandPublish'}">发布命令</router-link>
      </li>
    </ul>
    <ul class="control-page">
      <li>
        <span>设置</span>&nbsp;&nbsp;&nbsp;&nbsp;/
      </li>
      <li>
        <span>上一页</span>&nbsp;&nbsp;&nbsp;&nbsp;/
      </li>
      <li>
        <span>下一页</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 70px;
  line-height: 70px;
  position: relative;
}
.header h1 {
  width: 300px;
  position: absolute;
  top: 0px;
  left: 0px;
  padding-left: 20px;
  font-size: 28px;
  border-bottom: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  border-bottom-right-radius: 10px;
}
.header .nav-page {
  width: 400px;
  position: absolute;
  top: 0px;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.header .nav-page li {
  display: inline;
  padding: 5px;
  margin: 5px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.header .control-page {
  width: 280px;
  height: 35px;
  line-height: 35px;
  position: absolute;
  top: 0px;
  right: 0px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  border-bottom-left-radius: 10px;
  li {
    display: inline;
    padding: 5px;
    margin: 5px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
