import { login, logout, getInfo, getUserJWT } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import jwtdecode from 'jwt-decode'
// import avatar from '@/assets/avatar.jpg'

const state = {
  // JWT的ID，即jti，后端根据该ID获取access_token
  token: getToken(),
  // 用户名
  name: '',
  // 头像
  avatar: '',
  // 后台获取的原始JWT
  accessToken: '',
  // 解析后的JWT
  accessTokenDecode: '',
  // 授权码
  authorization: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ACCESS_TOKEN: (state, accessToken) => {
    state.accessToken = accessToken
  },
  SET_ACCESS_TOKEN_DECODE: (state, accessTokenDecode) => {
    state.accessTokenDecode = accessTokenDecode
  },
  SET_AUTHORIZATION: (state, authorization) => {
    state.authorization = authorization
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const data = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户的JWT
  getUserJWT({ commit }) {
    return new Promise((resolve, reject) => {
      getUserJWT()
        .then(response => {
          const data = response
          if (!data) {
            reject(new Error('Verification failed, please Login again.'))
          }
          const accessTokenData = jwtdecode(data.jwt)
          commit('SET_NAME', accessTokenData.user_name)
          commit('SET_ACCESS_TOKEN', data.jwt)
          commit('SET_AUTHORIZATION', 'Bearer ' + data.jwt)
          commit('SET_ACCESS_TOKEN_DECODE', accessTokenData)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const data = response
          if (!data) {
            reject(new Error('Verification failed, please Login again.'))
          }
          const { name, avatar } = data
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_ACCESS_TOKEN_DECODE', '')
          removeToken()
          resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_ACCESS_TOKEN_DECODE', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
