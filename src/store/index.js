import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import notice from './modules/notice'
import permission from './modules/permission'
import billboard from './modules/billboard'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    notice,
    permission,
    billboard
  },
  getters
})

export default store
