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

export async function login ({ commit, getters, dispatch }, credentials) {
  commit('setLastError', null)
  commit('setLoading', true)
  const { email, password, keepLogged } = credentials || {}
  try {
    const res = await authProvider.login({
      email,
      password,
      keepLogged
    })
    const user = res.data
    commit('setCurrentUser', user)
    commit('setLoading', false)
    commit('setUserIdentity', await authProvider.getIdentity(user))
  } catch (err) {
    commit('setLastError', err.message)
    commit('setLoading', false)
    dispatch('logout')
  }
}

export function logout ({ commit }) {
  return authProvider.logout()
    .then(() => commit('setJWT', null))
    .then(() => commit('setCurrentUser', null))
    .then(() => commit('setUserIdentity', ''))
    .then(() => commit('setLocale', DEFAULT_LOCALE))
    .catch(err => commit('setLastError', err.message))
}

export async function checkRoutePermissions ({ commit, dispatch, state }, route) {
  commit('setLastError', null)
  // Authentication
  try {
    const jwt = await authProvider.checkAuth()
    commit('setJWT', jwt)
  } catch (err) {
    commit('setLastError', err.message)
    return dispatch('logout')
  }
  // Authorization
  try {
    await authProvider.can(state.currentUser, route)
  } catch (err) {
    commit('setLastError', err.message)
  }
}

export function toggleDarkMode ({ commit, state }) {
  const value = !state.darkMode
  commit('setDarkMode', value)
}
