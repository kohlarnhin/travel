<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          发现更多精彩
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          探索创意、技术、设计等各个领域的优质内容
        </p>
      </div>

      <!-- 开发中提示 -->
      <div class="text-center py-20">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
          <RocketLaunchIcon class="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          功能开发中
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          更多精彩功能即将上线，敬请期待！
        </p>
        <RouterLink to="/" class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400">
          <ArrowLeftIcon class="h-4 w-4 mr-1" />
          返回首页
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RocketLaunchIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
</script>
