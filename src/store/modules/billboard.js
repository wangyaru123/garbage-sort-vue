/* 看板相关的数据  */

const state = {
  // 选择的城市
  city: '苏州'
}

const mutations = {
  SET_CITY: (state, city) => {
    state.city = city
  }
}

const actions = {
  setCity({ commit }, city) {
    commit('SET_CITY', city)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
