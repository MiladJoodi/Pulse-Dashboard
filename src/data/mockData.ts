import { User, ActivityItem, StatMetric } from '../types';

export const INITIAL_USERS: (User & { passwordHash: string })[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'admin@example.com',
    passwordHash: '123456',
    role: 'admin',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sara@example.com',
    passwordHash: 'password',
    role: 'editor',
    phone: '+1 (555) 987-6543',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-02',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Scott',
    email: 'reza@example.com',
    passwordHash: 'password',
    role: 'user',
    phone: '+1 (555) 351-1122',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-03-10',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Emily Watson',
    email: 'maryam@example.com',
    passwordHash: 'password',
    role: 'user',
    phone: '+1 (555) 999-8877',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-04-05',
    status: 'active'
  }
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Annual Enterprise Gold Plan License',
    user: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    date: '10 mins ago',
    amount: '$2,450.00',
    status: 'completed',
    category: 'Sales'
  },
  {
    id: 'act-2',
    title: 'New Member Account Created',
    user: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    date: '45 mins ago',
    amount: '-',
    status: 'completed',
    category: 'Users'
  },
  {
    id: 'act-3',
    title: 'Cloud Infrastructure Upgrade',
    user: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '2 hours ago',
    amount: '$1,200.00',
    status: 'completed',
    category: 'Infrastructure'
  },
  {
    id: 'act-4',
    title: 'Payment Gateway Transaction Timeout',
    user: 'Robert James',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    date: '4 hours ago',
    amount: '$850.00',
    status: 'failed',
    category: 'Payments'
  },
  {
    id: 'act-5',
    title: 'Technical Support Ticket Received',
    user: 'Amanda Vance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    date: '5 hours ago',
    amount: '-',
    status: 'pending',
    category: 'Support'
  }
];

export const CHART_DATA_MONTHLY = [
  { name: 'Jan', revenue: 4200, users: 240, visits: 12000 },
  { name: 'Feb', revenue: 5800, users: 380, visits: 18500 },
  { name: 'Mar', revenue: 7100, users: 510, visits: 22000 },
  { name: 'Apr', revenue: 6400, users: 490, visits: 20500 },
  { name: 'May', revenue: 8900, users: 670, visits: 29000 },
  { name: 'Jun', revenue: 10500, users: 850, visits: 34000 },
  { name: 'Jul', revenue: 12800, users: 990, visits: 41000 }
];

export const CATEGORY_DISTRIBUTION = [
  { name: 'Direct Sales', value: 45, color: '#3b82f6' },
  { name: 'Subscriptions', value: 30, color: '#10b981' },
  { name: 'Add-on Services', value: 15, color: '#f59e0b' },
  { name: 'Other Sources', value: 10, color: '#8b5cf6' }
];

export const STAT_METRICS: StatMetric[] = [
  {
    id: 'stat-1',
    title: 'Total Revenue',
    value: '$128,500.00',
    change: '+12.4%',
    isPositive: true,
    icon: 'DollarSign',
    period: 'vs. last month'
  },
  {
    id: 'stat-2',
    title: 'Active Users',
    value: '4,850 Users',
    change: '+8.1%',
    isPositive: true,
    icon: 'Users',
    period: 'vs. last week'
  },
  {
    id: 'stat-3',
    title: 'New Orders Today',
    value: '342 Orders',
    change: '-2.3%',
    isPositive: false,
    icon: 'ShoppingBag',
    period: 'vs. yesterday'
  },
  {
    id: 'stat-4',
    title: 'Conversion Rate',
    value: '4.8%',
    change: '+1.5%',
    isPositive: true,
    icon: 'TrendingUp',
    period: 'in last 30 days'
  }
];

