import { Dark } from 'quasar'

export function setLoading (state, value) {
  state.loading = value
}

export function setLastError (state, err) {
  state.latestError = err
}

export function setSuccessMsg (state, msg) {
  state.successMsg = msg
}

export function setWarningMsg (state, msg) {
  state.warningMsg = msg
}

export function setInfoMsg (state, msg) {
  state.infoMsg = msg
}

export function setJWT (state, jwt) {
  state.jwt = jwt
}

export function setCurrentUser (state, user) {
  state.currentUser = user
}

export function setUserIdentity (state, userIdentity) {
  state.userIdentity = userIdentity
}

export function setLocale (state, lang) {
  state.locale = lang
}

export function setDarkMode (state, mode) {
  state.darkMode = mode
  Dark.set(mode)
}
