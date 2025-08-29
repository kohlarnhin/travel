import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

// 路由守卫：检查认证状态
const requireAuth = (to: any, _from: any, next: any) => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    next()
  } else {
    ElMessage.warning('请先登录')
    next({ 
      path: '/login', 
      query: { redirect: to.fullPath } 
    })
  }
}

// 路由守卫：已登录用户不能访问认证页面
const requireGuest = (_to: any, _from: any, next: any) => {
  const userStore = useUserStore()
  if (!userStore.isAuthenticated) {
    next()
  } else {
    next('/')
  }
}

const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    // 主页面路由
    {
      path: '/',
      component: () => import('@/components/layout/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            title: '首页 - 发现美好',
            description: '发现精彩内容，创造无限可能'
          }
        },
        {
          path: '/explore',
          name: 'Explore',
          component: () => import('@/views/ExploreView.vue'),
          meta: {
            title: '探索 - 发现美好',
            description: '探索更多精彩内容'
          }
        },
        {
          path: '/card/:id',
          name: 'CardDetail',
          component: () => import('@/views/CardDetailView.vue'),
          meta: {
            title: '内容详情 - 发现美好'
          }
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('@/views/SearchView.vue'),
          meta: {
            title: '搜索结果 - FrontApp'
          }
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('@/views/AboutView.vue'),
          meta: {
            title: '关于我们 - FrontApp'
          }
        },
        // 需要认证的路由
        {
          path: '/profile',
          name: 'Profile',
          component: () => import('@/views/auth/ProfileView.vue'),
          beforeEnter: requireAuth,
          meta: {
            title: '个人资料 - FrontApp',
            requiresAuth: true
          }
        },
        {
          path: '/settings',
          name: 'Settings',
          component: () => import('@/views/auth/SettingsView.vue'),
          beforeEnter: requireAuth,
          meta: {
            title: '设置 - FrontApp',
            requiresAuth: true
          }
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue'),
          beforeEnter: requireAuth,
          meta: {
            title: '仪表板 - FrontApp',
            requiresAuth: true
          }
        }
      ]
    },

    // 认证相关路由（独立布局）
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      beforeEnter: requireGuest,
      meta: {
        title: '登录 - FrontApp',
        description: '登录您的账户',
        layout: 'auth'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      beforeEnter: requireGuest,
      meta: {
        title: '注册 - FrontApp',
        description: '创建新账户',
        layout: 'auth'
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      beforeEnter: requireGuest,
      meta: {
        title: '忘记密码 - FrontApp',
        layout: 'auth'
      }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: () => import('@/views/auth/ResetPasswordView.vue'),
      beforeEnter: requireGuest,
      meta: {
        title: '重置密码 - FrontApp',
        layout: 'auth'
      }
    },

    // 错误页面
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/error/NotFoundView.vue'),
      meta: {
        title: '页面未找到 - FrontApp'
      }
    },
    {
      path: '/500',
      name: 'ServerError',
      component: () => import('@/views/error/ServerErrorView.vue'),
      meta: {
        title: '服务器错误 - FrontApp'
      }
    },

    // 重定向和通配符路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ],
  
  // 路由行为配置
  scrollBehavior(to, _from, savedPosition) {
    // 如果有保存的位置（如浏览器前进/后退）
    if (savedPosition) {
      return savedPosition
    }
    
    // 如果路由有hash，滚动到对应元素
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    
    // 默认滚动到顶部
    return { 
      top: 0, 
      behavior: 'smooth' 
    }
  }
})

// 全局前置守卫
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 设置页面描述
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description as string)
    }
  }

  // 页面加载进度条（可选）
  // NProgress.start()

  next()
})

// 全局后置守卫
router.afterEach((to, from, failure) => {
  // 结束页面加载进度条
  // NProgress.done()

  // 路由切换完成后的处理
  if (!failure) {
    console.log(`Route changed from ${from.path} to ${to.path}`)
  }
})

// 全局解析守卫
router.beforeResolve((_to, _from, next) => {
  // 在导航被确认之前，所有组件内守卫和异步路由组件被解析之后调用
  next()
})

export default router
