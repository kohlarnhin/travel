<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="text-center max-w-md mx-auto">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
          <ExclamationTriangleIcon class="h-12 w-12 text-primary-600 dark:text-primary-400" />
        </div>
        <div class="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-2">
          404
        </div>
      </div>

      <!-- Content -->
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        页面未找到
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        抱歉，您访问的页面不存在或已被移除
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink 
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          <HomeIcon class="h-5 w-5 mr-2" />
          返回首页
        </RouterLink>
        
        <button
          @click="goBack"
          class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          返回上页
        </button>
      </div>

      <!-- Help Links -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          您可能在寻找：
        </p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
          <RouterLink to="/" class="text-primary-600 hover:text-primary-700 dark:text-primary-400">
            首页
          </RouterLink>
          <RouterLink to="/explore" class="text-primary-600 hover:text-primary-700 dark:text-primary-400">
            发现
          </RouterLink>
          <RouterLink to="/about" class="text-primary-600 hover:text-primary-700 dark:text-primary-400">
            关于我们
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>
