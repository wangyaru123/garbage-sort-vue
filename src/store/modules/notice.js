
const state = {
  // 推送的通知数据
  isDot: false
}

const mutations = {
  SET_ISDOT: (state, isNew) => {
    state.isDot = isNew
  }
}

const actions = {
  setIsDot({ commit }, isNew) {
    commit('SET_ISDOT', isNew)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
