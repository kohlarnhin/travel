<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          关于 FrontApp
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          基于现代化技术栈构建的前端展示平台，致力于为用户提供优质的内容发现体验
        </p>
      </div>

      <!-- Mission Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8 mb-12">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              我们的使命
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              FrontApp 致力于打造一个现代化的内容展示平台，让创作者能够轻松分享他们的作品，
              让用户能够便捷地发现和探索优质内容。我们相信好的设计和技术能够让信息传递更加高效和美好。
            </p>
            <div class="flex flex-wrap gap-3">
              <el-tag type="primary">创新驱动</el-tag>
              <el-tag type="success">用户至上</el-tag>
              <el-tag type="warning">品质优先</el-tag>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="w-48 h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <RocketLaunchIcon class="h-24 w-24 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          技术架构
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Frontend -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
              <CodeBracketIcon class="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              前端技术
            </h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Vue 3.4+</li>
              <li>TypeScript 5.3+</li>
              <li>Element Plus 2.10+</li>
              <li>TailwindCSS 3.4+</li>
              <li>Vite 5.0+</li>
            </ul>
          </div>

          <!-- Design -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900 rounded-full mb-4">
              <PaintBrushIcon class="h-8 w-8 text-success-600 dark:text-success-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              设计系统
            </h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Shadcn UI 风格</li>
              <li>响应式设计</li>
              <li>暗色模式支持</li>
              <li>无障碍访问</li>
              <li>HeroIcons 图标</li>
            </ul>
          </div>

          <!-- Features -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-warning-100 dark:bg-warning-900 rounded-full mb-4">
              <CpuChipIcon class="h-8 w-8 text-warning-600 dark:text-warning-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              核心功能
            </h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>用户认证系统</li>
              <li>内容展示平台</li>
              <li>智能搜索筛选</li>
              <li>实时状态管理</li>
              <li>路由权限控制</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- Performance -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
          <div class="flex items-center mb-4">
            <BoltIcon class="h-8 w-8 text-warning-500 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              高性能体验
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            采用现代化的构建工具和优化策略，确保应用具有出色的加载速度和运行性能，
            为用户提供流畅的交互体验。
          </p>
        </div>

        <!-- Security -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
          <div class="flex items-center mb-4">
            <ShieldCheckIcon class="h-8 w-8 text-success-500 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              安全可靠
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            实施完善的安全措施，包括路由权限控制、表单验证、数据加密等，
            保障用户数据和隐私安全。
          </p>
        </div>

        <!-- Responsive -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
          <div class="flex items-center mb-4">
            <DevicePhoneMobileIcon class="h-8 w-8 text-primary-500 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              响应式设计
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            完美适配各种设备和屏幕尺寸，从手机到桌面，确保在任何设备上都能
            提供最佳的用户体验。
          </p>
        </div>

        <!-- Accessibility -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
          <div class="flex items-center mb-4">
            <EyeIcon class="h-8 w-8 text-secondary-500 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              无障碍访问
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            遵循 WCAG 无障碍标准，支持键盘导航、屏幕阅读器等辅助技术，
            让每个用户都能无障碍地使用我们的平台。
          </p>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-soft p-8 text-center text-white">
        <h2 class="text-2xl font-bold mb-4">
          联系我们
        </h2>
        <p class="text-primary-100 mb-6 leading-relaxed">
          有任何问题或建议？我们很乐意听到您的声音！
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <el-button size="large" class="!bg-white !text-primary-600 !border-white hover:!bg-primary-50">
            <EnvelopeIcon class="h-5 w-5 mr-2" />
            发送邮件
          </el-button>
          <el-button size="large" type="info" class="!bg-transparent !border-white hover:!bg-white/10">
            <ChatBubbleLeftIcon class="h-5 w-5 mr-2" />
            在线客服
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RocketLaunchIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  CpuChipIcon,
  BoltIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon
} from '@heroicons/vue/24/outline'
</script>
