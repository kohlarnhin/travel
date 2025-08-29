<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Loading Overlay -->
    <Teleport to="body">
      <div 
        v-if="isLoading" 
        class="fixed inset-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex items-center justify-center"
      >
        <div class="text-center">
          <el-loading />
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notifications -->
    <el-backtop :right="30" :bottom="80" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

// Global loading state
const isLoading = ref(false)

// Show loading for initial page load
onMounted(() => {
  // Simulate initial loading
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

// Handle route changes with loading
const handleRouteChange = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

// Listen for navigation events
onMounted(() => {
  window.addEventListener('beforeunload', handleRouteChange)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleRouteChange)
})
</script>
