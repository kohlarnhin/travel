<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div class="text-center py-20">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
          <UserIcon class="h-10 w-10 text-orange-500" />
        </div>
        <h2 class="text-xl font-light text-gray-900 mb-2">
          个人资料页面
        </h2>
        <p class="text-gray-600 mb-6">
          此功能正在开发中...
        </p>
        <RouterLink 
          to="/" 
          class="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium shadow-lg"
        >
          <ArrowLeftIcon class="h-4 w-4 mr-2" />
          返回首页
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
</script>
