import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/WelcomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchResultsView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
