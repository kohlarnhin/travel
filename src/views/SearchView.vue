<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-light text-gray-900 mb-4">
          搜索结果
        </h1>
        
        <!-- Search Query Info -->
        <div v-if="searchQuery" class="mb-6">
          <p class="text-gray-600">
            搜索 "<span class="font-medium text-gray-900">{{ searchQuery }}</span>" 
            的结果，共找到 <span class="font-medium text-orange-600">{{ filteredResults.length }}</span> 条内容
          </p>
        </div>

        <!-- Search Input -->
        <div class="max-w-2xl">
          <el-input
            v-model="searchQuery"
            size="large"
            placeholder="搜索你感兴趣的内容..."
            clearable
            @keyup.enter="handleSearch"
            @clear="handleClearSearch"
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
      </div>

      <!-- Filters -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl border border-orange-200 p-6 mb-8 shadow-sm">
        <div class="flex flex-wrap items-center gap-4">
          <span class="text-sm font-medium text-gray-700">筛选条件：</span>
          
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
              v-for="category in availableCategories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>

          <!-- Sort -->
          <el-select
            v-model="sortBy"
            size="small"
            style="width: 120px"
            @change="applySorting"
          >
            <el-option label="相关度" value="relevance" />
            <el-option label="最新发布" value="newest" />
            <el-option label="浏览最多" value="views" />
            <el-option label="点赞最多" value="likes" />
          </el-select>

          <!-- Clear All Filters -->
          <el-button 
            v-if="hasActiveFilters" 
            size="small" 
            type="info" 
            plain
            @click="clearAllFilters"
          >
            清除筛选
          </el-button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <el-loading class="!static" />
      </div>

      <!-- Search Results -->
      <div v-else-if="filteredResults.length > 0" class="space-y-6">
        <!-- Results Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardItem
            v-for="item in paginatedResults"
            :key="item.id"
            :card="item"
          />
        </div>

        <!-- Pagination -->
        <div v-if="filteredResults.length > pageSize" class="flex justify-center mt-12">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="filteredResults.length"
            layout="prev, pager, next, jumper, ->, total"
            background
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
          <MagnifyingGlassIcon class="h-10 w-10 text-orange-400" />
        </div>
        
        <h3 class="text-xl font-light text-gray-900 mb-2">
          {{ searchQuery ? '未找到相关内容' : '开始搜索' }}
        </h3>
        
        <p class="text-gray-600 mb-6">
          {{ searchQuery 
            ? '试试调整搜索关键词或筛选条件' 
            : '输入关键词搜索你感兴趣的内容' 
          }}
        </p>

        <div v-if="searchQuery" class="flex flex-col sm:flex-row gap-3 justify-center">
          <el-button type="primary" @click="clearAllFilters">
            清除筛选条件
          </el-button>
          <RouterLink to="/">
            <el-button>返回首页</el-button>
          </RouterLink>
        </div>
      </div>

      <!-- Search Suggestions -->
      <div v-if="!searchQuery && !isLoading" class="mt-16">
        <h3 class="text-xl font-light text-gray-900 mb-8 text-center">
          热门搜索
        </h3>
        <div class="flex flex-wrap gap-4 justify-center">
          <button
            v-for="suggestion in searchSuggestions"
            :key="suggestion"
            class="px-4 py-2 bg-white/70 backdrop-blur-sm border border-orange-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-orange-600"
            @click="searchBySuggestion(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import CardItem from '@/components/ui/CardItem.vue'
import type { CardItem as CardItemType } from '@/types'

// Router
const route = useRoute()
const router = useRouter()

// Reactive State
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('relevance')
const currentPage = ref(1)
const pageSize = ref(12)
const isLoading = ref(false)
const searchResults = ref<CardItemType[]>([])

// Search Suggestions
const searchSuggestions = ref([
  'Vue.js', 'React', 'JavaScript', 'CSS', 'UI设计', 
  '摄影技巧', '旅行攻略', '美食制作', '读书笔记', '电影推荐'
])

// Sample Data Generator (模拟搜索结果)
const generateSearchResults = (query: string): CardItemType[] => {
  const categories = ['技术', '设计', '摄影', '旅行', '生活']
  const tags = ['Vue.js', 'React', 'JavaScript', 'CSS', 'UI/UX', '摄影', '旅行', '美食', '音乐', '读书']
  const results: CardItemType[] = []

  // 模拟搜索逻辑：生成与查询相关的结果
  const resultCount = Math.floor(Math.random() * 20) + 5
  
  for (let i = 1; i <= resultCount; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const cardTags = tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1)
    
    results.push({
      id: `search-result-${i}`,
      title: `${query} 相关内容 ${i} - ${category}专题分享`,
      description: `这是一个关于"${query}"的精彩内容，包含了丰富的${category}相关信息和实用的技巧分享。内容详细介绍了相关知识点，为读者提供有价值的学习材料。`,
      image: `https://picsum.photos/600/400?random=${Date.now() + i}`,
      category,
      tags: [...cardTags, query], // 确保搜索词在标签中
      createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        name: `创作者${i}`,
        avatar: `https://i.pravatar.cc/150?img=${(i % 30) + 1}`
      },
      stats: {
        views: Math.floor(Math.random() * 10000) + 100,
        likes: Math.floor(Math.random() * 1000) + 10,
        comments: Math.floor(Math.random() * 100) + 1
      }
    })
  }

  return results
}

// Computed
const availableCategories = computed(() => 
  [...new Set(searchResults.value.map(item => item.category))]
)

const hasActiveFilters = computed(() => 
  selectedCategory.value || sortBy.value !== 'relevance'
)

const filteredResults = computed(() => {
  let results = [...searchResults.value]

  // Category filter
  if (selectedCategory.value) {
    results = results.filter(item => item.category === selectedCategory.value)
  }

  // Sort
  switch (sortBy.value) {
    case 'newest':
      results.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
      break
    case 'views':
      results.sort((a, b) => b.stats.views - a.stats.views)
      break
    case 'likes':
      results.sort((a, b) => b.stats.likes - a.stats.likes)
      break
    case 'relevance':
    default:
      // 相关度排序：包含搜索词的标题和标签权重更高
      results.sort((a, b) => {
        const aRelevance = calculateRelevance(a, searchQuery.value)
        const bRelevance = calculateRelevance(b, searchQuery.value)
        return bRelevance - aRelevance
      })
      break
  }

  return results
})

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredResults.value.slice(start, end)
})

// Methods
const calculateRelevance = (item: CardItemType, query: string): number => {
  if (!query) return 0
  
  let score = 0
  const lowerQuery = query.toLowerCase()
  
  // 标题匹配权重最高
  if (item.title.toLowerCase().includes(lowerQuery)) {
    score += 10
  }
  
  // 描述匹配
  if (item.description.toLowerCase().includes(lowerQuery)) {
    score += 5
  }
  
  // 标签匹配
  item.tags.forEach(tag => {
    if (tag.toLowerCase().includes(lowerQuery)) {
      score += 3
    }
  })
  
  // 分类匹配
  if (item.category.toLowerCase().includes(lowerQuery)) {
    score += 2
  }
  
  return score
}

const performSearch = async (query: string) => {
  if (!query.trim()) {
    searchResults.value = []
    return
  }

  isLoading.value = true
  
  try {
    // 模拟API搜索延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 生成模拟搜索结果
    searchResults.value = generateSearchResults(query)
    
    // 重置分页
    currentPage.value = 1
    
    ElMessage.success(`找到 ${searchResults.value.length} 条相关内容`)
  } catch (error) {
    console.error('Search failed:', error)
    ElMessage.error('搜索失败，请重试')
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 更新URL查询参数
    router.push({ 
      path: '/search', 
      query: { 
        q: searchQuery.value,
        category: selectedCategory.value || undefined,
        sort: sortBy.value !== 'relevance' ? sortBy.value : undefined
      } 
    })
    
    performSearch(searchQuery.value)
  }
}

const handleClearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  router.push({ path: '/search' })
}

const searchBySuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  handleSearch()
}

const applyFilters = () => {
  currentPage.value = 1
  // 更新URL参数
  router.push({ 
    path: '/search', 
    query: { 
      ...route.query,
      category: selectedCategory.value || undefined
    } 
  })
}

const applySorting = () => {
  currentPage.value = 1
  // 更新URL参数
  router.push({ 
    path: '/search', 
    query: { 
      ...route.query,
      sort: sortBy.value !== 'relevance' ? sortBy.value : undefined
    } 
  })
}

const clearAllFilters = () => {
  selectedCategory.value = ''
  sortBy.value = 'relevance'
  currentPage.value = 1
  
  // 清除URL中的筛选参数，保留搜索查询
  router.push({ 
    path: '/search', 
    query: searchQuery.value ? { q: searchQuery.value } : {} 
  })
}

// 监听路由变化
watch(() => route.query, (newQuery) => {
  // 从URL参数初始化搜索状态
  const queryParam = newQuery.q as string
  const categoryParam = newQuery.category as string
  const sortParam = newQuery.sort as string

  if (queryParam && queryParam !== searchQuery.value) {
    searchQuery.value = queryParam
    performSearch(queryParam)
  }
  
  if (categoryParam !== selectedCategory.value) {
    selectedCategory.value = categoryParam || ''
  }
  
  if (sortParam !== sortBy.value) {
    sortBy.value = sortParam || 'relevance'
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  // 如果URL中有搜索参数，自动执行搜索
  const initialQuery = route.query.q as string
  if (initialQuery) {
    searchQuery.value = initialQuery
    performSearch(initialQuery)
  }
})
</script>

<style scoped>
/* 自定义样式 */
:deep(.el-pagination) {
  @apply justify-center;
}

:deep(.el-tag) {
  @apply font-medium;
}
</style>
