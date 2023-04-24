import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/WelcomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import RegisterPhotographer from '../views/RegisterPhotographer.vue'
import Profile from '../views/Profile.vue'
import Photographer from '../views/Photographer.vue'

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
  {
    path: '/register',
    name: 'register',
    component: RegisterPhotographer
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/photographer',
    name:'photographer',
    component: Photographer
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
