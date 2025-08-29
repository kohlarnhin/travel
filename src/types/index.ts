// 用户相关类型定义
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  firstName?: string
  lastName?: string
  createdAt: string
  updatedAt: string
}

// 登录表单数据
export interface LoginForm {
  username: string
  password: string
  remember?: boolean
}

// 注册表单数据
export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreement: boolean
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 登录响应
export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
}

// 卡片展示数据
export interface CardItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  createTime: string
  author: {
    name: string
    avatar: string
  }
  stats: {
    views: number
    likes: number
    comments: number
  }
}

// 表单验证规则类型
export interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (rule: any, value: any, callback: any) => void
}
