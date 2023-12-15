import { createRouter, createWebHistory } from 'vue-router'
import BeerView from '../views/BeerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beer',
      component: BeerView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/beer',
      name: 'beer',
      component: BeerView
    }
  ]
})

export default router
