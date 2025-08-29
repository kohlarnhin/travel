<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
    <div class="container mx-auto px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <div class="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600 font-light">加载中...</p>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="card" class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <button 
          @click="goBack"
          class="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-8 transition-colors"
        >
          <ArrowLeftIcon class="h-5 w-5" />
          <span>返回</span>
        </button>

        <!-- Article Container -->
        <article class="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <!-- Hero Image -->
          <div class="relative h-96 overflow-hidden">
            <img
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            <!-- Title Overlay -->
            <div class="absolute bottom-8 left-8 right-8">
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {{ card.title }}
              </h1>
              <div class="flex items-center space-x-4 text-white/90">
                <span class="font-light">{{ card.author }}</span>
                <span>•</span>
                <span class="font-light">{{ formatDate(card.createdAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 md:p-12">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="tag in card.tags"
                :key="tag"
                class="px-4 py-2 bg-orange-100 text-orange-700 text-sm rounded-full font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Description -->
            <div class="prose prose-lg max-w-none mb-8">
              <p class="text-xl text-gray-700 leading-relaxed font-light mb-6">
                {{ card.description }}
              </p>
              
              <!-- Main Content (Fixed content for demo) -->
              <div class="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  这是一个精彩的内容展示，探索了{{ card.category }}领域的深度洞察。通过独特的视角和专业的分析，
                  我们为您呈现了这个主题的多个维度和深层含义。
                </p>
                
                <p>
                  在当今快速发展的世界中，{{ card.title.toLowerCase() }}已经成为了一个不可忽视的重要话题。
                  无论是从美学角度、实用性考虑，还是从文化传承的层面来看，都有着深远的影响和意义。
                </p>

                <blockquote class="border-l-4 border-orange-300 pl-6 italic text-gray-700 bg-orange-50 py-4 rounded-r-lg">
                  "真正的创作来源于对生活的深度观察和对美的不懈追求。每一个细节都值得我们用心去发现和记录。"
                  <footer class="text-sm text-gray-500 mt-2">—— {{ card.author }}</footer>
                </blockquote>

                <p>
                  通过这次深入的探索，我们不仅能够更好地理解{{ card.category }}的本质，
                  还能够从中汲取灵感，应用到我们的日常生活和工作中。这种跨领域的思维方式，
                  正是现代创意工作者所需要培养的重要能力。
                </p>

                <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">深入思考</h3>
                
                <p>
                  当我们深入思考{{ card.title.toLowerCase() }}这个主题时，会发现它不仅仅是表面所看到的那样简单。
                  背后蕴含着丰富的文化底蕴、技术积淀和创作者的智慧结晶。
                </p>

                <ul class="list-disc pl-6 space-y-2">
                  <li>独特的设计理念和创作思路</li>
                  <li>精湛的技术手法和表现形式</li>
                  <li>深层的文化内涵和时代精神</li>
                  <li>对未来发展趋势的前瞻性思考</li>
                </ul>

                <p>
                  希望通过这次分享，能够为您带来新的启发和思考。创意无处不在，
                  关键在于我们是否拥有发现美好的眼睛和表达想法的勇气。
                </p>
              </div>
            </div>

            <!-- Stats and Actions -->
            <div class="flex items-center justify-between border-t border-orange-100 pt-8">
              <!-- Stats -->
              <div class="flex items-center space-x-6 text-gray-500">
                <div class="flex items-center space-x-2">
                  <HeartIcon class="h-5 w-5" />
                  <span>{{ card.likes }} 点赞</span>
                </div>
                <div class="flex items-center space-x-2">
                  <EyeIcon class="h-5 w-5" />
                  <span>{{ card.views }} 浏览</span>
                </div>
                <div class="flex items-center space-x-2">
                  <ShareIcon class="h-5 w-5" />
                  <span>分享</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center space-x-3">
                <button
                  @click="toggleLike"
                  :class="[
                    'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all',
                    isLiked 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white border border-orange-200 text-orange-600 hover:bg-orange-50'
                  ]"
                >
                  <HeartIcon class="h-4 w-4" :class="{ 'fill-current': isLiked }" />
                  <span>{{ isLiked ? '已点赞' : '点赞' }}</span>
                </button>
                
                <button
                  @click="shareContent"
                  class="flex items-center space-x-2 px-4 py-2 bg-white border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-50 transition-all"
                >
                  <ShareIcon class="h-4 w-4" />
                  <span>分享</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        <!-- Related Content -->
        <section class="mt-16">
          <h2 class="text-2xl font-light text-gray-900 mb-8 text-center">相关内容</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="relatedCard in relatedCards"
              :key="relatedCard.id"
              class="group cursor-pointer"
              @click="$router.push(`/card/${relatedCard.id}`)"
            >
              <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <img
                  :src="relatedCard.image"
                  :alt="relatedCard.title"
                  class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="p-4">
                  <h3 class="font-medium text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {{ relatedCard.title }}
                  </h3>
                  <p class="text-sm text-gray-600 font-light">
                    {{ relatedCard.description.substring(0, 60) }}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Error State -->
      <div v-else class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <ExclamationTriangleIcon class="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h2 class="text-2xl font-medium text-gray-900 mb-2">内容未找到</h2>
          <p class="text-gray-600 mb-6">抱歉，您要查看的内容不存在或已被删除。</p>
          <button
            @click="goBack"
            class="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  EyeIcon, 
  ShareIcon,
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline'
import type { CardItem } from '@/types'
import { formatDate } from '@/utils'

// Router
const route = useRoute()
const router = useRouter()

// State
const loading = ref(true)
const card = ref<CardItem | null>(null)
const isLiked = ref(false)

// Mock data - same as in HomeView
const mockCards: CardItem[] = [
  {
    id: 1,
    title: '极简建筑美学',
    description: '探索现代建筑中简洁线条与功能空间的完美融合，感受极简主义的永恒魅力。',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '建筑',
    tags: ['建筑', '极简', '设计'],
    author: '陈建筑师',
    createdAt: '2024-01-15',
    likes: 234,
    views: 1200
  },
  {
    id: 2,
    title: '数字艺术的复兴',
    description: '数字工具如何重塑艺术景观，为传统艺术创造全新的可能性和表达方式。',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '艺术',
    tags: ['数字艺术', '科技', '创意'],
    author: '玛雅·罗德里格斯',
    createdAt: '2024-01-14',
    likes: 189,
    views: 856
  },
  {
    id: 3,
    title: '可持续生活方式',
    description: '通过简单的步骤实现更可持续、更有意识的生活方式，与自然和谐共存。',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '生活',
    tags: ['可持续', '生活方式', '环保'],
    author: '乔丹·史密斯',
    createdAt: '2024-01-13',
    likes: 312,
    views: 1456
  },
  // ... 添加更多卡片数据
]

// Computed
const relatedCards = computed(() => {
  if (!card.value) return []
  return mockCards
    .filter(c => c.id !== card.value!.id && c.category === card.value!.category)
    .slice(0, 3)
})

// Methods
const loadCard = async () => {
  const cardId = parseInt(route.params.id as string)
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const foundCard = mockCards.find(c => c.id === cardId)
  if (foundCard) {
    card.value = foundCard
    // Simulate view count increment
    card.value.views += 1
  }
  
  loading.value = false
}

const goBack = () => {
  router.back()
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  if (card.value) {
    card.value.likes += isLiked.value ? 1 : -1
  }
}

const shareContent = () => {
  if (navigator.share && card.value) {
    navigator.share({
      title: card.value.title,
      text: card.value.description,
      url: window.location.href
    })
  } else {
    // Fallback to copy URL
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}

// Lifecycle
onMounted(() => {
  loadCard()
})
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Prose styling */
.prose {
  color: #374151;
}

.prose h3 {
  color: #111827;
  font-weight: 600;
}

.prose blockquote {
  font-style: italic;
}

.prose ul li {
  color: #4b5563;
}
</style>