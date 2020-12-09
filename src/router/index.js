import Router from 'vue-router'

const config = {
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      component: () => import('@/views/Index'),
    }
  ],
  linkActiveClass: 'active'
}

const router = new Router(config)

export default router
