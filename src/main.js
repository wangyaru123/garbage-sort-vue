import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import echarts from 'echarts'
import stomp from 'stompjs'
import sockjs from 'sockjs-client'
import dayjs from 'dayjs'
import mqtt from 'mqtt'
// vux暂时不支持cli3.0全局引入
// import Vux from 'vux'
import './styles/index.scss'
import './styles/iconfont.css'
import '@/icons' // icon
import '@/permission' // permission control

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$stomp = stomp
Vue.prototype.$sockjs = sockjs
Vue.prototype.$echarts = echarts
Vue.prototype.$dayjs = dayjs
Vue.prototype.$mqtt = mqtt
Vue.use(ElementUI, { locale })
// Vue.use(Vux)
// 全局时间过滤器
Vue.filter('dateFormat', (date, format) => {
  if (!date) return
  return dayjs(date).format(format)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
