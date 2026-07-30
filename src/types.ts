export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  avatar?: string;
  phone?: string;
  createdAt: string;
  status: 'active' | 'pending' | 'blocked';
}

export type AuthView = 'login' | 'register' | 'forgot-password';

export type DashboardTab = 'overview' | 'users' | 'analytics' | 'messages' | 'settings' | 'tasks' | 'pricing';

export interface ActivityItem {
  id: string;
  title: string;
  user: string;
  avatar: string;
  date: string;
  amount?: string;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface StatMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  period: string;
}

