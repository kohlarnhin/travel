<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-4">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <span class="text-white font-bold text-sm">F</span>
            </div>
            <span class="text-xl font-semibold text-gray-900 dark:text-white">FrontApp</span>
          </RouterLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink 
            to="/" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            首页
          </RouterLink>
          <RouterLink 
            to="/explore" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            发现
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            关于
          </RouterLink>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <button 
            class="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            @click="toggleSearch"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <!-- Theme Toggle -->
          <button 
            class="flex items-center justify-center h-10 w-10 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            @click="() => toggleTheme()"
          >
            <SunIcon v-if="isDark" class="h-5 w-5" />
            <MoonIcon v-else class="h-5 w-5" />
          </button>

          <!-- User Menu -->
          <div v-if="userStore.isAuthenticated" class="relative">
            <el-dropdown trigger="click" @command="handleUserCommand">
              <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <img 
                  :src="userStore.user?.avatar || '/default-avatar.png'" 
                  :alt="userStore.user?.username"
                  class="h-8 w-8 rounded-full object-cover"
                />
                <ChevronDownIcon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
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

          <!-- Login/Register Buttons -->
          <div v-else class="flex items-center space-x-3">
            <RouterLink 
              to="/login"
              class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              登录
            </RouterLink>
            <RouterLink 
              to="/register"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              注册
            </RouterLink>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            class="md:hidden flex items-center justify-center h-10 w-10 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            @click="toggleMobileMenu"
          >
            <Bars3Icon v-if="!showMobileMenu" class="h-5 w-5" />
            <XMarkIcon v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-show="showMobileMenu" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
        <nav class="flex flex-col space-y-4">
          <RouterLink 
            to="/" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            @click="showMobileMenu = false"
          >
            首页
          </RouterLink>
          <RouterLink 
            to="/explore" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            @click="showMobileMenu = false"
          >
            发现
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            @click="showMobileMenu = false"
          >
            关于
          </RouterLink>
        </nav>
      </div>
    </div>

    <!-- Search Modal -->
    <Teleport to="body">
      <div 
        v-if="showSearch" 
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        @click="showSearch = false"
      >
        <div 
          class="flex min-h-full items-center justify-center p-4"
          @click.stop
        >
          <div class="w-full max-w-lg">
            <el-input
              v-model="searchQuery"
              placeholder="搜索..."
              size="large"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <MagnifyingGlassIcon class="h-5 w-5" />
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { 
  MagnifyingGlassIcon, 
  SunIcon, 
  MoonIcon, 
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

// 主题切换
const isDark = useDark()
const toggleTheme = useToggle(isDark)

// 响应式状态
const showMobileMenu = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')

// 方法
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    searchQuery.value = ''
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
    showSearch.value = false
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
</script>
