import { LocalStorage, SessionStorage } from 'quasar'
import {
  AUTH_JWT_STORAGE_KEY
} from 'src/config'

export function jwt (state) {
  return state.jwt ||
    LocalStorage.getItem(AUTH_JWT_STORAGE_KEY) ||
    SessionStorage.getItem(AUTH_JWT_STORAGE_KEY) ||
    null
}
