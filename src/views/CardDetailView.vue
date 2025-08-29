<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div class="text-center py-20">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
          <DocumentTextIcon class="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          内容详情页
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          卡片ID: {{ $route.params.id }}
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
import { DocumentTextIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
</script>
