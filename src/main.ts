import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Import styles
import 'element-plus/dist/index.css'
import './style.css'

// Create Vue app
const app = createApp(App)

// Create Pinia store
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)

// Initialize user store (check authentication)
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
userStore.checkAuth()

// Mount app
app.mount('#app')
