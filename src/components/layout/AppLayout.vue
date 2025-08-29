<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
    <!-- Modern Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>
    
    <!-- Modern Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<style scoped>
/* Ensure smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Modern backdrop effects */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
</style>