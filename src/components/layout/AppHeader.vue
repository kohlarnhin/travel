<template>
  <header class="sticky top-0 z-50 w-full border-b border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 backdrop-blur-md shadow-sm">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Modern Logo -->
        <div class="flex items-center space-x-4">
          <RouterLink to="/" class="flex items-center space-x-3">
            <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-sm">发</span>
            </div>
            <span class="text-xl font-light text-gray-900 hidden sm:block">发现美好</span>
          </RouterLink>
        </div>

        <!-- Modern Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink 
            to="/" 
            class="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
          >
            首页
          </RouterLink>
          <RouterLink 
            to="/explore" 
            class="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
          >
            探索
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
          >
            关于
          </RouterLink>
        </nav>

        <!-- Modern Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Toggle -->
          <button
            class="p-2 rounded-xl hover:bg-orange-50 transition-colors"
            @click="toggleSearch"
          >
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-600" />
          </button>

          <!-- User Menu -->
          <div v-if="userStore.isAuthenticated" class="relative">
            <el-dropdown trigger="click" @command="handleUserCommand">
              <button class="flex items-center space-x-2 p-2 rounded-xl hover:bg-orange-50 transition-colors">
                <img 
                  :src="userStore.user?.avatar || '/default-avatar.png'" 
                  :alt="userStore.user?.username"
                  class="h-7 w-7 rounded-full object-cover"
                />
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">
                    <UserIcon class="h-4 w-4 mr-2" />
                    个人资料
                  </el-dropdown-item>
                  <el-dropdown-item command="settings">
                    <Cog6ToothIcon class="h-4 w-4 mr-2" />
                    设置
                  </el-dropdown-item>
                  <el-dropdown-item divided command="logout">
                    <ArrowRightOnRectangleIcon class="h-4 w-4 mr-2" />
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- Modern Auth Buttons -->
          <div v-else class="flex items-center space-x-3">
            <RouterLink 
              to="/login"
              class="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              登录
            </RouterLink>
            <RouterLink 
              to="/register"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              开始使用
            </RouterLink>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            class="md:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors"
            @click="toggleMobileMenu"
          >
            <Bars3Icon v-if="!showMobileMenu" class="h-5 w-5 text-gray-600" />
            <XMarkIcon v-else class="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <!-- Modern Mobile Menu -->
      <div v-show="showMobileMenu" class="md:hidden py-4 border-t border-orange-200">
        <nav class="flex flex-col space-y-4">
          <RouterLink 
            to="/" 
            class="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            @click="showMobileMenu = false"
          >
            首页
          </RouterLink>
          <RouterLink 
            to="/explore" 
            class="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            @click="showMobileMenu = false"
          >
            探索
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            @click="showMobileMenu = false"
          >
            关于
          </RouterLink>
        </nav>
      </div>
    </div>

    <!-- Modern Search Modal -->
    <Teleport to="body">
      <div 
        v-if="showSearch" 
        class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
        @click="showSearch = false"
      >
        <div 
          class="flex min-h-full items-start justify-center pt-20 p-4"
          @click.stop
        >
          <div class="w-full max-w-lg">
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索你感兴趣的内容..."
                class="w-full px-4 py-3 text-lg bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
                @keyup.enter="handleSearch"
                autofocus
              />
              <div class="flex justify-end mt-4">
                <button
                  @click="handleSearch"
                  class="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                >
                  搜索
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { useDark, useToggle } from '@vueuse/core' // 不再使用暗色主题
import { 
  MagnifyingGlassIcon, 
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'

// 状态管理
const userStore = useUserStore()
const router = useRouter()

// 保持明亮主题，不提供暗色模式切换

// 响应式状态
const searchQuery = ref('')
const showSearch = ref(false)
const showMobileMenu = ref(false)

// 方法
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    showMobileMenu.value = false
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showSearch.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'Search',
      query: { q: searchQuery.value }
    })
    showSearch.value = false
    searchQuery.value = ''
  }
}

const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      userStore.logout()
      router.push('/')
      break
  }
}

// 关闭菜单
const closeMenus = () => {
  showSearch.value = false
  showMobileMenu.value = false
}

// 监听路由变化
router.beforeEach(() => {
  closeMenus()
})
</script>

<style scoped>
/* Modern hover effects */
.router-link-active {
  @apply text-orange-600;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}
</style>