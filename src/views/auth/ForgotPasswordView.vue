<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <RouterLink to="/" class="inline-flex items-center space-x-2 mb-6">
          <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <span class="text-white font-bold">F</span>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">FrontApp</span>
        </RouterLink>
        
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          忘记密码
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          输入您的邮箱地址，我们将发送重置密码链接
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-8">
        <div class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-warning-100 dark:bg-warning-900 rounded-full mb-6">
            <KeyIcon class="h-8 w-8 text-warning-600 dark:text-warning-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            功能开发中
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            密码重置功能即将上线
          </p>
          <RouterLink to="/login" class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400">
            <ArrowLeftIcon class="h-4 w-4 mr-1" />
            返回登录
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KeyIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
</script>
