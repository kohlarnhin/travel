<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Modern Card -->
      <div class="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <!-- Modern Header -->
        <div class="text-center mb-8">
          <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white font-bold text-lg">发</span>
          </div>
          <h1 class="text-2xl font-light text-gray-900 mb-2">欢迎回来</h1>
          <p class="text-gray-600 font-light">登录以继续您的发现之旅</p>
        </div>

        <!-- Modern Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              邮箱
            </label>
            <input
              id="email"
              v-model="loginForm.username"
              type="email"
              required
              class="w-full px-4 py-3 bg-white/50 border border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
              placeholder="请输入您的邮箱"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 bg-white/50 border border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all pr-12"
                placeholder="请输入您的密码"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="loginForm.remember"
                type="checkbox"
                class="h-4 w-4 text-orange-500 border-orange-300 rounded focus:ring-orange-500"
              />
              <span class="ml-2 text-sm text-gray-600">记住我</span>
            </label>
            <RouterLink
              to="/forgot-password"
              class="text-sm text-orange-600 hover:text-orange-500 transition-colors"
            >
              忘记密码？
            </RouterLink>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">登录</span>
            <span v-else class="flex items-center justify-center space-x-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>登录中...</span>
            </span>
          </button>
        </form>

        <!-- Modern Divider -->
        <div class="my-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-orange-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500 font-light">或者使用</span>
            </div>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="flex items-center justify-center px-4 py-2 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors"
          >
            <svg class="h-5 w-5 text-gray-600" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="ml-2 text-sm font-medium text-gray-700">谷歌</span>
          </button>
          
          <button
            type="button"
            class="flex items-center justify-center px-4 py-2 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors"
          >
            <svg class="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="ml-2 text-sm font-medium text-gray-700">微信</span>
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center mt-8">
          <span class="text-gray-600 font-light">还没有账户？ </span>
          <RouterLink
            to="/register"
            class="text-orange-600 hover:text-orange-500 font-medium transition-colors"
          >
            立即注册
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
import type { LoginForm } from '@/types'

// 状态管理
const userStore = useUserStore()
const router = useRouter()

// 响应式状态
const isLoading = ref(false)
const showPassword = ref(false)

// 表单数据
const loginForm = ref<LoginForm>({
  username: '',
  password: '',
  remember: false
})

// 登录处理
const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    return
  }

  isLoading.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟登录成功
    await userStore.login(loginForm.value)
    
    // 跳转到首页
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}

// Auto-fill demo account for convenience
// const fillDemoAccount = () => {
//   loginForm.username = 'admin'
//   loginForm.password = '123456'
// }

// 页面加载时自动填入演示账户（可选）
// fillDemoAccount()
</script>

<style scoped>
/* Custom input focus effects */
input:focus {
  transform: translateY(-1px);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Smooth animations */
* {
  transition: all 0.2s ease;
}
</style>