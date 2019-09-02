import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.auth to determine if the current user has permission
 * @param auths
 * @param route
 */
function hasPermission(auths, route) {
  // console.log(auths)
  if (route.meta && route.meta.auths) {
    return auths.some(auth => route.meta.auths.includes(auth))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param auths
 */
export function filterAsyncRoutes(routes, auths) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(auths, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, auths)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, auths) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, auths)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
