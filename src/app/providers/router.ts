import type { Plugin } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from '@/pages'

const routerInstance = createRouter({
  history: createWebHistory(),
  routes,
})

export const router = {
  install(app) {
    app.use(routerInstance)

    // Additional logic as middlewares goes here
  },
} satisfies Plugin
