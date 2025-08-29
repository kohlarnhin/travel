<template>
  <article class="group relative bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
    <!-- Image Container -->
    <div class="relative aspect-video overflow-hidden">
      <el-image
        :src="card.image"
        :alt="card.title"
        fit="cover"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        lazy
      >
        <template #placeholder>
          <div class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <PhotoIcon class="h-12 w-12 text-gray-400" />
          </div>
        </template>
        <template #error>
          <div class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <ExclamationTriangleIcon class="h-12 w-12 text-gray-400" />
          </div>
        </template>
      </el-image>

      <!-- Category Badge -->
      <div class="absolute top-3 left-3">
        <el-tag 
          :type="getCategoryType(card.category)" 
          size="small"
          class="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90"
        >
          {{ card.category }}
        </el-tag>
      </div>

      <!-- Action Buttons -->
      <div class="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <el-button 
          circle 
          size="small" 
          class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
          @click.stop="toggleLike"
        >
          <HeartIcon 
            :class="[
              'h-4 w-4 transition-colors',
              isLiked ? 'text-error-500 fill-current' : 'text-gray-600 dark:text-gray-400'
            ]"
          />
        </el-button>
        
        <el-button 
          circle 
          size="small" 
          class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
          @click.stop="shareCard"
        >
          <ShareIcon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </el-button>
      </div>

      <!-- Time Badge -->
      <div class="absolute bottom-3 right-3">
        <span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-black/70 text-white rounded-md backdrop-blur-sm">
          <ClockIcon class="h-3 w-3 mr-1" />
          {{ formatDate(card.createTime, 'MM-DD') }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ card.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
        {{ card.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <el-tag
          v-for="tag in card.tags.slice(0, 3)"
          :key="tag"
          size="small"
          effect="plain"
          class="!bg-gray-100 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600 !text-gray-700 dark:!text-gray-300"
        >
          {{ tag }}
        </el-tag>
        <el-tag
          v-if="card.tags.length > 3"
          size="small"
          effect="plain"
          class="!bg-gray-100 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600 !text-gray-700 dark:!text-gray-300"
        >
          +{{ card.tags.length - 3 }}
        </el-tag>
      </div>

      <!-- Author & Stats -->
      <div class="flex items-center justify-between">
        <!-- Author -->
        <div class="flex items-center space-x-3">
          <img
            :src="card.author.avatar"
            :alt="card.author.name"
            class="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ card.author.name }}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <!-- Views -->
          <div class="flex items-center space-x-1">
            <EyeIcon class="h-4 w-4" />
            <span class="text-xs">{{ formatNumber(card.stats.views) }}</span>
          </div>

          <!-- Likes -->
          <div class="flex items-center space-x-1">
            <HeartIcon class="h-4 w-4" />
            <span class="text-xs">{{ formatNumber(card.stats.likes) }}</span>
          </div>

          <!-- Comments -->
          <div class="flex items-center space-x-1">
            <ChatBubbleLeftIcon class="h-4 w-4" />
            <span class="text-xs">{{ formatNumber(card.stats.comments) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Click Area -->
    <RouterLink 
      :to="`/card/${card.id}`" 
      class="absolute inset-0 z-10"
      @click="handleCardClick"
    />
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  PhotoIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftIcon
} from '@heroicons/vue/24/outline'
import { formatDate, formatNumber } from '@/utils'
import type { CardItem } from '@/types'

// Props
interface Props {
  card: CardItem
}

const props = defineProps<Props>()

// State
const isLiked = ref(false)

// Computed
const getCategoryType = (category: string) => {
  const categoryMap: Record<string, string> = {
    '技术': 'primary',
    '设计': 'success',
    '生活': 'warning',
    '摄影': 'info',
    '旅行': 'danger'
  }
  return categoryMap[category] || 'info'
}

// Methods
const toggleLike = () => {
  isLiked.value = !isLiked.value
  ElMessage.success(isLiked.value ? '已添加到收藏' : '已取消收藏')
}

const shareCard = () => {
  // 分享功能
  if (navigator.share) {
    navigator.share({
      title: props.card.title,
      text: props.card.description,
      url: window.location.origin + `/card/${props.card.id}`
    }).catch(() => {
      copyToClipboard()
    })
  } else {
    copyToClipboard()
  }
}

const copyToClipboard = () => {
  const url = window.location.origin + `/card/${props.card.id}`
  navigator.clipboard.writeText(url).then(() => {
    ElMessage.success('链接已复制到剪贴板')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}

const handleCardClick = () => {
  // 可以在这里添加点击统计等逻辑
  console.log('Card clicked:', props.card.id)
}
</script>

<style scoped>
/* 限制文本行数 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 自定义元素样式 */
:deep(.el-tag) {
  @apply font-medium;
}

:deep(.el-image) {
  @apply block;
}
</style>
