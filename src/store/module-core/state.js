import {
  LOCALES,
  DEFAULT_LOCALE
} from 'src/config'

export default function () {
  return {
    loading: false,
    currentUser: null,
    userIdentity: null,
    jwt: null,
    locale: DEFAULT_LOCALE,
    darkMode: 'auto',
    locales: LOCALES,
    latestError: null,
    successMsg: null,
    warningMsg: null,
    infoMsg: null
  }
}
