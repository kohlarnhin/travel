<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-light text-gray-900 mb-6">
          关于 发现美好
        </h1>
        <p class="text-xl text-gray-600 leading-relaxed">
          基于现代化技术栈构建的内容展示平台，致力于为用户提供优质的内容发现体验
        </p>
      </div>

      <!-- Mission Section -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-200 p-8 mb-12">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-2xl font-light text-gray-900 mb-4">
              我们的使命
            </h2>
            <p class="text-gray-600 leading-relaxed mb-6">
              发现美好 致力于打造一个现代化的内容展示平台，让创作者能够轻松分享他们的作品，
              让用户能够便捷地发现和探索优质内容。我们相信好的设计和技术能够让信息传递更加高效和美好。
            </p>
            <div class="flex flex-wrap gap-3">
              <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">创新驱动</span>
              <span class="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">用户至上</span>
              <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">品质优先</span>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="w-48 h-48 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <RocketLaunchIcon class="h-24 w-24 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-200 p-8 mb-12">
        <h2 class="text-2xl font-light text-gray-900 mb-8 text-center">
          技术架构
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Frontend -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <CodeBracketIcon class="h-8 w-8 text-orange-600" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              前端技术
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li>Vue 3.4+</li>
              <li>TypeScript 5.3+</li>
              <li>Element Plus 2.10+</li>
              <li>TailwindCSS 3.4+</li>
              <li>Vite 5.0+</li>
            </ul>
          </div>

          <!-- Design -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <PaintBrushIcon class="h-8 w-8 text-amber-600" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              设计系统
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li>Shadcn UI 风格</li>
              <li>响应式设计</li>
              <li>明亮温和主题</li>
              <li>无障碍访问</li>
              <li>HeroIcons 图标</li>
            </ul>
          </div>

          <!-- Features -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <CpuChipIcon class="h-8 w-8 text-orange-600" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              核心功能
            </h3>
            <ul class="space-y-2 text-gray-600">
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
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-200 p-6">
          <div class="flex items-center mb-4">
            <BoltIcon class="h-8 w-8 text-amber-500 mr-3" />
            <h3 class="text-xl font-medium text-gray-900">
              高性能体验
            </h3>
          </div>
          <p class="text-gray-600 leading-relaxed">
            采用现代化的构建工具和优化策略，确保应用具有出色的加载速度和运行性能，
            为用户提供流畅的交互体验。
          </p>
        </div>

        <!-- Security -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-200 p-6">
          <div class="flex items-center mb-4">
            <ShieldCheckIcon class="h-8 w-8 text-orange-500 mr-3" />
            <h3 class="text-xl font-medium text-gray-900">
              安全可靠
            </h3>
          </div>
          <p class="text-gray-600 leading-relaxed">
            实施完善的安全措施，包括路由权限控制、表单验证、数据加密等，
            保障用户数据和隐私安全。
          </p>
        </div>

        <!-- Responsive -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-200 p-6">
          <div class="flex items-center mb-4">
            <DevicePhoneMobileIcon class="h-8 w-8 text-orange-500 mr-3" />
            <h3 class="text-xl font-medium text-gray-900">
              响应式设计
            </h3>
          </div>
          <p class="text-gray-600 leading-relaxed">
            完美适配各种设备和屏幕尺寸，从手机到桌面，确保在任何设备上都能
            提供最佳的用户体验。
          </p>
        </div>

        <!-- Accessibility -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-200 p-6">
          <div class="flex items-center mb-4">
            <EyeIcon class="h-8 w-8 text-amber-500 mr-3" />
            <h3 class="text-xl font-medium text-gray-900">
              无障碍访问
            </h3>
          </div>
          <p class="text-gray-600 leading-relaxed">
            遵循 WCAG 无障碍标准，支持键盘导航、屏幕阅读器等辅助技术，
            让每个用户都能无障碍地使用我们的平台。
          </p>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl shadow-lg p-8 text-center text-white">
        <h2 class="text-2xl font-light mb-4">
          联系我们
        </h2>
        <p class="text-orange-100 mb-6 leading-relaxed">
          有任何问题或建议？我们很乐意听到您的声音！
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-6 py-3 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-colors font-medium shadow-lg">
            <EnvelopeIcon class="h-5 w-5 mr-2 inline" />
            发送邮件
          </button>
          <button class="px-6 py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors font-medium">
            <ChatBubbleLeftIcon class="h-5 w-5 mr-2 inline" />
            在线客服
          </button>
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