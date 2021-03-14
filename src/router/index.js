import Vue from 'vue'
import VueRouter from 'vue-router'

import createRoutes from './routes'

Vue.use(VueRouter)

const WHITELIST_URLS = [
  '/login',
  '/auth/register',
  '/auth/activate',
  '/auth/recovery'
]

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store, ssrContext }) {
  const routes = createRoutes(store)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // If user is not authenticated or authorized, redirect her to login page.
  Router.beforeEach((to, from, next) => {
    const routingDescr = `Routing from ${from.path} to ${to.path}...`
    return new Promise((resolve, reject) => {
      if (WHITELIST_URLS.indexOf(to.path) !== -1) {
        resolve()
      } else {
        store
          .dispatch('core/checkRoutePermissions', to.path)
          .then(() => {
            if (store.state && store.state.loggedAccount) {
              resolve()
            } else {
              throw new Error('Unauthorized access')
            }
          })
          .catch(err => reject(err))
      }
    })
      .then(() => {
        console.debug(`[ALLOW] ${routingDescr}`)
        next()
      })
      .catch(() => {
        console.debug(`[BLOCK] ${routingDescr}`)
        next('/login')
      })
  })

  return Router
}
