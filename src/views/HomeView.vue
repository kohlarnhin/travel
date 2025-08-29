<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            发现精彩内容
            <span class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              创造无限可能
            </span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            探索创意设计、技术分享、生活记录等丰富内容，与创作者们一起构建精彩的数字世界
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <el-input
              v-model="searchQuery"
              size="large"
              placeholder="搜索你感兴趣的内容..."
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
              </template>
              <template #append>
                <el-button type="primary" @click="handleSearch">
                  搜索
                </el-button>
              </template>
            </el-input>
          </div>

          <!-- Quick Categories -->
          <div class="flex flex-wrap justify-center gap-3 mt-8">
            <el-tag
              v-for="category in quickCategories"
              :key="category.name"
              :type="category.type"
              size="large"
              class="cursor-pointer hover:scale-105 transition-transform"
              @click="filterByCategory(category.name)"
            >
              {{ category.name }}
            </el-tag>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter & Sort Section -->
    <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Filters -->
          <div class="flex items-center space-x-4">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">筛选：</span>
            
            <!-- Category Filter -->
            <el-select
              v-model="selectedCategory"
              placeholder="选择分类"
              clearable
              size="small"
              style="width: 120px"
              @change="applyFilters"
            >
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category"
              />
            </el-select>

            <!-- Tag Filter -->
            <el-select
              v-model="selectedTags"
              placeholder="选择标签"
              multiple
              clearable
              size="small"
              style="width: 200px"
              @change="applyFilters"
            >
              <el-option
                v-for="tag in popularTags"
                :key="tag"
                :label="tag"
                :value="tag"
              />
            </el-select>
          </div>

          <!-- Sort & View -->
          <div class="flex items-center space-x-4">
            <!-- Sort -->
            <el-select
              v-model="sortBy"
              size="small"
              style="width: 120px"
              @change="applySort"
            >
              <el-option label="最新发布" value="newest" />
              <el-option label="最受欢迎" value="popular" />
              <el-option label="浏览最多" value="views" />
              <el-option label="点赞最多" value="likes" />
            </el-select>

            <!-- View Toggle -->
            <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                :class="[
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                ]"
                @click="viewMode = 'grid'"
              >
                <Squares2X2Icon class="h-5 w-5" />
              </button>
              <button
                :class="[
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                ]"
                @click="viewMode = 'list'"
              >
                <ListBulletIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-20">
          <el-loading class="!static" />
        </div>

        <!-- Cards Grid -->
        <div
          v-else-if="filteredCards.length > 0"
          :class="[
            'grid gap-6 transition-all duration-300',
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 max-w-4xl mx-auto'
          ]"
        >
          <CardItem
            v-for="card in paginatedCards"
            :key="card.id"
            :card="card"
            :class="[
              'transition-all duration-300',
              viewMode === 'list' && 'flex flex-row h-48'
            ]"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <MagnifyingGlassIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            未找到相关内容
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            试试调整筛选条件或搜索其他关键词
          </p>
          <el-button type="primary" @click="clearFilters">
            清除筛选条件
          </el-button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredCards.length > pageSize" class="flex justify-center mt-12">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="filteredCards.length"
            layout="prev, pager, next, jumper, ->, total"
            background
          />
        </div>
      </div>
    </section>

    <!-- Back to Top -->
    <el-backtop :right="30" :bottom="80" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/vue/24/outline'
import CardItem from '@/components/ui/CardItem.vue'
import type { CardItem as CardItemType } from '@/types'

// Router
// const router = useRouter()

// Reactive State
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTags = ref<string[]>([])
const sortBy = ref('newest')
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const pageSize = ref(12)
const isLoading = ref(false)

// Sample Data
const cards = ref<CardItemType[]>([])

// Quick Categories
const quickCategories = reactive([
  { name: '技术', type: 'primary' },
  { name: '设计', type: 'success' },
  { name: '摄影', type: 'warning' },
  { name: '旅行', type: 'info' },
  { name: '生活', type: 'danger' }
])

// Filter Options
const categories = computed(() => 
  [...new Set(cards.value.map(card => card.category))]
)

const popularTags = computed(() => {
  const allTags = cards.value.flatMap(card => card.tags)
  const tagCount = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([tag]) => tag)
})

// Computed
const filteredCards = computed(() => {
  let result = [...cards.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(card =>
      card.title.toLowerCase().includes(query) ||
      card.description.toLowerCase().includes(query) ||
      card.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (selectedCategory.value) {
    result = result.filter(card => card.category === selectedCategory.value)
  }

  // Tags filter
  if (selectedTags.value.length > 0) {
    result = result.filter(card =>
      selectedTags.value.some(tag => card.tags.includes(tag))
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'newest':
      result.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
      break
    case 'popular':
      result.sort((a, b) => (b.stats.likes + b.stats.views) - (a.stats.likes + a.stats.views))
      break
    case 'views':
      result.sort((a, b) => b.stats.views - a.stats.views)
      break
    case 'likes':
      result.sort((a, b) => b.stats.likes - a.stats.likes)
      break
  }

  return result
})

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredCards.value.slice(start, end)
})

// Methods
const generateSampleData = (): CardItemType[] => {
  const categories = ['技术', '设计', '摄影', '旅行', '生活']
  const tags = ['Vue.js', 'React', 'JavaScript', 'CSS', 'UI/UX', '摄影', '旅行', '美食', '音乐', '读书', '电影', '运动']
  const sampleCards: CardItemType[] = []

  for (let i = 1; i <= 24; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const cardTags = tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1)
    
    sampleCards.push({
      id: `card-${i}`,
      title: `精彩内容标题 ${i} - ${category}相关的优质内容分享`,
      description: `这是一个关于${category}的精彩内容描述，包含了丰富的信息和有价值的见解。内容涵盖了多个方面的知识点，为读者提供深度的学习和思考材料。`,
      image: `https://picsum.photos/600/400?random=${i}`,
      category,
      tags: cardTags,
      createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        name: `创作者${i}`,
        avatar: `https://i.pravatar.cc/150?img=${i}`
      },
      stats: {
        views: Math.floor(Math.random() * 10000) + 100,
        likes: Math.floor(Math.random() * 1000) + 10,
        comments: Math.floor(Math.random() * 100) + 1
      }
    })
  }

  return sampleCards
}

const loadCards = async () => {
  isLoading.value = true
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 生成示例数据
    cards.value = generateSampleData()
  } catch (error) {
    console.error('Failed to load cards:', error)
    ElMessage.error('加载内容失败，请刷新页面重试')
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    currentPage.value = 1
    ElMessage.success(`搜索"${searchQuery.value}"相关内容`)
  }
}

const filterByCategory = (category: string) => {
  selectedCategory.value = category
  currentPage.value = 1
  applyFilters()
}

const applyFilters = () => {
  currentPage.value = 1
}

const applySort = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedTags.value = []
  currentPage.value = 1
}

// Lifecycle
onMounted(() => {
  loadCards()
})
</script>

<style scoped>
/* 自定义样式 */
:deep(.el-pagination) {
  @apply justify-center;
}

:deep(.el-select .el-input) {
  @apply bg-white dark:bg-gray-700;
}

/* 英雄区域背景渐变 */
.bg-gradient-to-br {
  background-image: linear-gradient(
    to bottom right,
    var(--tw-gradient-stops)
  );
}

/* 文本渐变 */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
