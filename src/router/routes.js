function createRoutes (store) {
  const routes = [
    // Login
    {
      path: '/login',
      component: () => import('layouts/FullPageForm.vue'),
      children: [
        { path: '', component: () => import('../pages/Login.vue') }
      ]
    },
    // Profile
    {
      path: '/profile',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Profile.vue') }
      ]
    },
    // Homepage
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Index.vue') }
      ]
    }
  ]
  // Add routes for each registered resource
  for (const resource of store.state.resources.all) {
    routes.push({
      path: `/${resource.name}`,
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('pages/ResourceList.vue'),
          props: {
            resource
          }
        },
        {
          path: 'create',
          component: () => import('pages/ResourceDetails.vue'),
          props: {
            resource
          }
        },
        {
          path: ':id',
          component: () => import('pages/ResourceDetails.vue'),
          props: {
            resource
          }
        }
      ]
    })
  }
  routes.push({
    // Always leave this as last one,
    // but you can also remove it
    path: '*',
    component: () => import('pages/Error404.vue')
  })
  return routes
}

export default createRoutes
