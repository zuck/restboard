export const AUTH_API_URL = process.env.AUTH_API_URL || 'http://localhost:3000/auth'
export const AUTH_JWT_STORAGE_KEY = process.env.AUTH_JWT_STORAGE_KEY || 'rb-auth-jwt'
export const DEFAULT_LOCALE = 'it'
export const LOCALES = [{
  value: 'en',
  label: 'English'
}, {
  value: 'it',
  label: 'Italiano'
}]
