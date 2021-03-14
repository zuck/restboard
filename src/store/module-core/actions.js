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
  return authProvider.logout()
    .then(() => commit('setLoggedAccount', null))
    .then(() => commit('setLocale', DEFAULT_LOCALE))
    .catch(err => commit('setLastError', err.message))
}

export async function checkRoutePermissions ({ commit, dispatch, state }, route) {
  commit('setLastError', null)
  // Authentication
  try {
    await authProvider.checkAuth()
  } catch (err) {
    commit('setLastError', err.message)
    return dispatch('logout')
  }
  // Authorization
  try {
    await authProvider.can(state.loggedAccount, route)
  } catch (err) {
    commit('setLastError', err.message)
  }
}

export function toggleDarkMode ({ commit, state }) {
  const value = !state.darkMode
  commit('setDarkMode', value)
}
