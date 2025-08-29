<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-light text-gray-900 mb-4">
          发现更多精彩
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          探索创意、技术、设计等各个领域的优质内容
        </p>
      </div>

      <!-- 开发中提示 -->
      <div class="text-center py-20">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
          <RocketLaunchIcon class="h-10 w-10 text-orange-500" />
        </div>
        <h2 class="text-xl font-light text-gray-900 mb-2">
          功能开发中
        </h2>
        <p class="text-gray-600 mb-6">
          更多精彩功能即将上线，敬请期待！
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
import { RocketLaunchIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
</script>