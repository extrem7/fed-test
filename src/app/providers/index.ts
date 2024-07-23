import type { App } from 'vue'
import { router } from './router'

export function applyAppOnlyProviders(app: App) {
  app.use(router)
}
