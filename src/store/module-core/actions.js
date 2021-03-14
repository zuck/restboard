import {
  DEFAULT_LOCALE,
  AUTH_API_URL
} from 'src/config'
import createAuthProvider from 'rb-auth-provider-simple'

const authProvider = createAuthProvider(AUTH_API_URL, {
  storage: {
    local: localStorage,
    session: sessionStorage
  }
})

export function login ({ commit, getters, dispatch }, credentials) {
  commit('setLastError', null)
  commit('setLoading', true)
  const { email, password, keepLogged } = credentials || {}
  return authProvider.login({
    email,
    password,
    keepLogged
  })
    .then(res => {
      commit('setLoggedAccount', res.data)
      commit('setLoading', false)
    })
    .catch(err => {
      commit('setLastError', err.message)
      commit('setLoading', false)
      dispatch('logout')
    })
}

export function logout ({ commit }) {
  commit('setLastError', null)
  commit('setLoggedAccount', null)
  commit('setLocale', DEFAULT_LOCALE)
  return authProvider.logout()
}

export function checkRoutePermissions ({ commit, dispatch, state }, route) {
  commit('setLastError', null)
  return authProvider
    .checkAuth()
    .catch(err => {
      commit('setLastError', err.message)
      dispatch('logout')
    })
    .then(() => authProvider.can(state.loggedAccount, route))
    .catch(err => {
      commit('setLastError', err.message)
    })
}

export function toggleDarkMode ({ commit, state }) {
  const value = !state.darkMode
  commit('setDarkMode', value)
}
