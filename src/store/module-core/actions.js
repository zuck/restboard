import { LocalStorage, SessionStorage } from 'quasar'
import {
  DEFAULT_LOCALE,
  AUTH_JWT_STORAGE_KEY,
  AUTH_API_URL
} from 'src/config'

export function login ({ commit, getters, dispatch }, credentials) {
  commit('setLastError', null)
  commit('setLoading', true)
  const jwt = getters.jwt
  const { email, password, rememberMe } = credentials || {}
  const headers = {
    'Content-Type': 'application/json'
  }
  if (!credentials && jwt) {
    headers.authorization = `Bearer ${jwt}`
  }
  return fetch(AUTH_API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .then(payload => {
      if (rememberMe) {
        LocalStorage.set(AUTH_JWT_STORAGE_KEY, payload.jwt)
      } else {
        SessionStorage.set(AUTH_JWT_STORAGE_KEY, payload.jwt)
      }
      commit('setJWT', payload.jwt)
      commit('setLoggedAccount', payload.account)
      commit('setLocale', payload.account.locale)
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
  commit('setJWT', null)
  LocalStorage.remove(AUTH_JWT_STORAGE_KEY)
  SessionStorage.remove(AUTH_JWT_STORAGE_KEY)
}

export function toggleDarkMode ({ commit, state }) {
  const value = !state.darkMode
  commit('setDarkMode', value)
}
