<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
    <!-- Modern Hero Section -->
    <section class="relative overflow-hidden">
      <div class="container mx-auto px-6 lg:px-8 py-24">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Modern Typography -->
          <h1 class="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
            发现
            <span class="block font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              美好
            </span>
            瞬间
          </h1>
          
          <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            探索精选内容，分享你的创意，与有趣的创作者建立连接
          </p>

          <!-- Modern Search -->
          <div class="max-w-xl mx-auto mb-16">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="今天什么激发了你的灵感？"
                class="w-full px-6 py-4 text-lg bg-white/70 backdrop-blur-sm rounded-2xl border border-orange-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all shadow-lg"
                @keyup.enter="handleSearch"
              />
              <button 
                @click="handleSearch"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
              >
                <MagnifyingGlassIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modern Grid Section -->
    <section class="container mx-auto px-6 lg:px-8 pb-24">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-light text-gray-900 mb-4">精选集合</h2>
        <p class="text-gray-600 font-light">为你精心挑选的内容</p>
      </div>

      <!-- Modern Masonry Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="card in displayedCards"
          :key="card.id"
          class="group cursor-pointer"
          @click="handleCardClick(card)"
        >
          <div class="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <!-- Modern Image -->
            <div class="relative overflow-hidden">
              <img
                :src="card.image"
                :alt="card.title"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Modern Content -->
            <div class="p-6">
              <h3 class="text-xl font-medium text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                {{ card.title }}
              </h3>
              <p class="text-gray-600 text-sm font-light leading-relaxed mb-4">
                {{ card.description }}
              </p>
              
              <!-- Modern Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in card.tags.slice(0, 2)"
                  :key="tag"
                  class="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium"
                >
                  {{ tag }}
                </span>
              </div>
              
              <!-- Modern Meta -->
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span class="font-light">{{ formatDate(card.createTime) }}</span>
                <div class="flex items-center space-x-4">
                  <span class="flex items-center space-x-1">
                    <HeartIcon class="h-4 w-4" />
                    <span>{{ card.stats.likes }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <EyeIcon class="h-4 w-4" />
                    <span>{{ card.stats.views }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modern Load More -->
      <div class="text-center mt-16" v-if="hasMoreContent">
        <button
          @click="loadMore"
          :disabled="loading"
          class="px-8 py-3 bg-white border border-orange-200 text-orange-600 rounded-2xl hover:bg-orange-50 hover:border-orange-300 transition-all font-medium disabled:opacity-50 shadow-sm hover:shadow-md"
        >
          <span v-if="!loading">加载更多</span>
          <span v-else class="flex items-center space-x-2">
            <div class="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            <span>加载中...</span>
          </span>
        </button>
      </div>

      <!-- No More Content -->
      <div v-else-if="displayedCards.length > 6" class="text-center mt-16">
        <p class="text-gray-500 font-light">已经到底啦 🎉</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MagnifyingGlassIcon, HeartIcon, EyeIcon } from '@heroicons/vue/24/outline'
import type { CardItem } from '@/types'
import { formatDate } from '@/utils'

// Router
const router = useRouter()

// Reactive state
const searchQuery = ref('')
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 6

// Extended mock data with more Chinese content
const allCards: CardItem[] = [
  {
    id: '1',
    title: '极简建筑美学',
    description: '探索现代建筑中简洁线条与功能空间的完美融合，感受极简主义的永恒魅力。',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '建筑',
    tags: ['建筑', '极简', '设计'],
    author: {
      name: '陈建筑师',
      avatar: '/avatars/architect.jpg'
    },
    createTime: '2024-01-15',
    stats: {
      likes: 234,
      views: 1200,
      comments: 45
    }
  },
  {
    id: '2',
    title: '数字艺术的复兴',
    description: '数字工具如何重塑艺术景观，为传统艺术创造全新的可能性和表达方式。',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '艺术',
    tags: ['数字艺术', '科技', '创意'],
    author: {
      name: '玛雅·罗德里格斯',
      avatar: '/avatars/artist.jpg'
    },
    createTime: '2024-01-14',
    stats: {
      likes: 189,
      views: 856,
      comments: 23
    }
  },
  {
    id: '3',
    title: '可持续生活方式',
    description: '通过简单的步骤实现更可持续、更有意识的生活方式，与自然和谐共存。',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '生活',
    tags: ['可持续', '生活方式', '环保'],
    author: {
      name: '乔丹·史密斯',
      avatar: '/avatars/lifestyle.jpg'
    },
    createTime: '2024-01-13',
    stats: {
      likes: 312,
      views: 1456,
      comments: 67
    }
  },
  {
    id: '4',
    title: '现代工作空间',
    description: '在数字时代创造高效且富有灵感的工作环境，提升创造力和工作效率。',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '科技',
    tags: ['工作空间', '效率', '设计'],
    author: {
      name: '山姆·威尔逊',
      avatar: '/avatars/tech.jpg'
    },
    createTime: '2024-01-12',
    stats: {
      likes: 156,
      views: 743,
      comments: 19
    }
  },
  {
    id: '5',
    title: '自然摄影之美',
    description: '捕捉自然风光中的原始美感和未被触及的瞬间，展现大自然的壮丽。',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '摄影',
    tags: ['自然', '摄影', '风景'],
    author: {
      name: '艾玛·戴维斯',
      avatar: '/avatars/photographer.jpg'
    },
    createTime: '2024-01-11',
    stats: {
      likes: 421,
      views: 2103,
      comments: 89
    }
  },
  {
    id: '6',
    title: '烹饪创新艺术',
    description: '现代烹饪技术与传统美食的创意融合，探索味觉的无限可能。',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '美食',
    tags: ['烹饪', '创新', '美食'],
    author: {
      name: '玛丽亚大厨',
      avatar: '/avatars/chef.jpg'
    },
    createTime: '2024-01-10',
    stats: {
      likes: 278,
      views: 934,
      comments: 56
    }
  },
  {
    id: '7',
    title: '城市夜景摄影',
    description: '记录城市夜晚的霓虹光影，展现都市生活的另一面诗意与浪漫。',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '摄影',
    tags: ['城市', '夜景', '光影'],
    author: {
      name: '李摄影师',
      avatar: '/avatars/photographer2.jpg'
    },
    createTime: '2024-01-09',
    stats: {
      likes: 567,
      views: 2876,
      comments: 134
    }
  },
  {
    id: '8',
    title: '手工艺复兴',
    description: '在数字化时代重新发现手工艺的价值，感受匠人精神的传承与创新。',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '手工艺',
    tags: ['手工', '传统', '工艺'],
    author: {
      name: '王师傅',
      avatar: '/avatars/craftsman.jpg'
    },
    createTime: '2024-01-08',
    stats: {
      likes: 345,
      views: 1567,
      comments: 78
    }
  },
  {
    id: '9',
    title: '咖啡文化探索',
    description: '从豆子到杯子，探索咖啡背后的文化故事和制作工艺的精妙之处。',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '生活',
    tags: ['咖啡', '文化', '品味'],
    author: {
      name: '张咖啡师',
      avatar: '/avatars/barista.jpg'
    },
    createTime: '2024-01-07',
    stats: {
      likes: 423,
      views: 1890,
      comments: 92
    }
  },
  {
    id: '10',
    title: '现代室内设计',
    description: '简约而不简单的室内设计理念，创造舒适且富有美感的生活空间。',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '设计',
    tags: ['室内', '设计', '现代'],
    author: {
      name: '刘设计师',
      avatar: '/avatars/designer.jpg'
    },
    createTime: '2024-01-06',
    stats: {
      likes: 289,
      views: 1234,
      comments: 45
    }
  },
  {
    id: '11',
    title: '植物摄影艺术',
    description: '通过镜头发现植物世界的微妙之美，记录生命的顽强与优雅。',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '摄影',
    tags: ['植物', '自然', '微距'],
    author: {
      name: '林摄影师',
      avatar: '/avatars/photographer3.jpg'
    },
    createTime: '2024-01-05',
    stats: {
      likes: 156,
      views: 789,
      comments: 28
    }
  },
  {
    id: '12',
    title: '数字艺术工作流',
    description: '分享数字艺术创作的完整流程，从概念到完成作品的每一个步骤。',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '艺术',
    tags: ['数字艺术', '工作流', '教程'],
    author: {
      name: '陈艺术家',
      avatar: '/avatars/digital-artist.jpg'
    },
    createTime: '2024-01-04',
    stats: {
      likes: 678,
      views: 3456,
      comments: 156
    }
  }
]

// Computed properties
const displayedCards = computed(() => {
  const endIndex = currentPage.value * itemsPerPage
  return allCards.slice(0, endIndex)
})

const hasMoreContent = computed(() => {
  return displayedCards.value.length < allCards.length
})

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'Search',
      query: { q: searchQuery.value }
    })
  }
}

const handleCardClick = (card: CardItem) => {
  router.push({
    name: 'CardDetail',
    params: { id: card.id.toString() }
  })
}

const loadMore = async () => {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  currentPage.value += 1
  loading.value = false
}

// Lifecycle
onMounted(() => {
  // Cards are loaded from computed property
})
</script>

<style scoped>
/* Custom scrollbar for modern look */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #fef7ed;
}

::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}
</style>