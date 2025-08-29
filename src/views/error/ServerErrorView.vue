<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="text-center max-w-md mx-auto">
      <!-- 500 Illustration -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-error-100 dark:bg-error-900 rounded-full mb-6">
          <ExclamationTriangleIcon class="h-12 w-12 text-error-600 dark:text-error-400" />
        </div>
        <div class="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-2">
          500
        </div>
      </div>

      <!-- Content -->
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        服务器内部错误
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        抱歉，服务器遇到了一些问题，请稍后再试
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
          @click="refreshPage"
          class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowPathIcon class="h-5 w-5 mr-2" />
          刷新页面
        </button>
      </div>

      <!-- Help Text -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          如果问题持续存在，请联系我们的技术支持团队
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon, HomeIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

const refreshPage = () => {
  window.location.reload()
}
</script>
