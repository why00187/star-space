import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  // 原来的 about 替换成 个人信息
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/pages/Personal.vue')
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('@/pages/Works.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/pages/Notes.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router