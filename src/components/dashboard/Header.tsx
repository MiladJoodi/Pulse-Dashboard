import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardTab } from '../../types';
import { Search, Bell, Sun, Moon, LogOut, User as UserIcon, Settings, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onToggleSidebar,
  onOpenCommandPalette,
}) => {
  const { user, logout, isDarkMode, toggleDarkMode } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview Dashboard';
      case 'users':
        return 'User Management';
      case 'tasks':
        return 'Task Board';
      case 'pricing':
        return 'Pricing Plans';
      case 'analytics':
        return 'Analytics & Insights';
      case 'messages':
        return 'Messages & Alerts';
      case 'settings':
        return 'Account Settings';
    }
  };

  const notifications = [
    { id: '1', title: 'New login from unknown IP', time: '5 mins ago', unread: true },
    { id: '2', title: 'User Sarah upgraded subscription', time: '1 hour ago', unread: true },
    { id: '3', title: 'Weekly database backup finished', time: 'Yesterday', unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left Navigation Toggle & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <h1 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
            {getTabTitle()}
          </h1>
          <span className="text-[11px] text-zinc-400 font-medium">
            Advanced Management Suite
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center relative max-w-xs w-full group cursor-pointer"
      >
        <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 pointer-events-none" />
        <div className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-transparent group-hover:border-zinc-300 dark:group-hover:border-zinc-700 text-zinc-400 text-left transition-all">
          Search system...
        </div>
        <kbd className="absolute right-2.5 text-[10px] font-mono px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-400 border border-zinc-300 dark:border-zinc-700">
          Ctrl+K
        </kbd>
      </button>

      {/* Controls: Notifications, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
          title="Toggle Light/Dark Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
          </button>

          {showNotifications && (
            <div className="absolute top-12 right-0 w-72 sm:w-80 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Notifications</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                  2 New
                </span>
              </div>
              <div className="space-y-1.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg text-xs transition-colors ${
                      n.unread
                        ? 'bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="font-semibold mb-1">{n.title}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative border-l dark:border-zinc-800 pl-2">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border border-indigo-500/30"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-none mb-1">
                {user?.name}
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium leading-none capitalize">
                {user?.role === 'admin' ? 'Super Admin' : user?.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {showUserMenu && (
            <div className="absolute top-12 right-0 w-56 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-2 z-50">
              <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{user?.name}</p>
                <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-indigo-500" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 text-zinc-500" />
                <span>Settings</span>
              </button>

              <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

