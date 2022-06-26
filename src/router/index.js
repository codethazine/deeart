import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SettingsView from '@/views/SettingsView.vue'
import PrivacyPolicyView from '@/views/static_views/PrivacyPolicyView.vue'
import TermsOfServiceView from '@/views/static_views/TermsOfServiceView.vue'
import AccountView from '@/views/AccountView.vue'
import ExploreView from '@/views/ExploreView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView
  },
  {
    path: '/terms-of-service',
    name: 'terms-of-service',
    component: TermsOfServiceView
  },
  {
    path: '/test.deeartist',
    name: 'test.deeartist',
    component: AccountView
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExploreView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
