import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardTab } from '../../types';
import { LayoutDashboard, Users, BarChart3, MessageSquare, Settings, ListChecks, CreditCard, Moon, Sun, LogOut, Search, Command } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ activeTab, setActiveTab, onClose }) => {
  const { logout, isDarkMode, toggleDarkMode } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: 'goto-overview', label: 'Go to Overview', icon: <LayoutDashboard className="w-4 h-4" />, action: () => { setActiveTab('overview'); onClose(); }, keywords: ['overview', 'dashboard', 'home', 'main'] },
    { id: 'goto-users', label: 'Go to Users', icon: <Users className="w-4 h-4" />, action: () => { setActiveTab('users'); onClose(); }, keywords: ['users', 'people', 'accounts', 'user list'] },
    { id: 'goto-tasks', label: 'Go to Tasks', icon: <ListChecks className="w-4 h-4" />, action: () => { setActiveTab('tasks'); onClose(); }, keywords: ['tasks', 'kanban', 'board', 'todo'] },
    { id: 'goto-pricing', label: 'Go to Pricing', icon: <CreditCard className="w-4 h-4" />, action: () => { setActiveTab('pricing'); onClose(); }, keywords: ['pricing', 'plans', 'billing', 'enterprise', 'license'] },
    { id: 'goto-analytics', label: 'Go to Analytics', icon: <BarChart3 className="w-4 h-4" />, action: () => { setActiveTab('analytics'); onClose(); }, keywords: ['analytics', 'charts', 'stats', 'insights'] },
    { id: 'goto-messages', label: 'Go to Messages', icon: <MessageSquare className="w-4 h-4" />, action: () => { setActiveTab('messages'); onClose(); }, keywords: ['messages', 'broadcast', 'alerts', 'notifications'] },
    { id: 'goto-settings', label: 'Go to Settings', icon: <Settings className="w-4 h-4" />, action: () => { setActiveTab('settings'); onClose(); }, keywords: ['settings', 'preferences', 'profile', 'config'] },
    { id: 'toggle-dark', label: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />, action: () => { toggleDarkMode(); onClose(); }, keywords: ['dark', 'light', 'theme', 'mode', 'toggle'] },
    { id: 'logout', label: 'Logout System', icon: <LogOut className="w-4 h-4" />, action: () => { logout(); }, keywords: ['logout', 'sign out', 'exit', 'quit'] },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setQuery('');
    setSelectedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.keywords.some((kw) => kw.includes(query.toLowerCase()))
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  };

  // Parent controls visibility; always render when mounted

  return (
    <>
      <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-zinc-100 dark:border-zinc-800">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search commands or navigate..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              onKeyDown={handleKeyDown}
              className="w-full py-3.5 text-sm bg-transparent text-zinc-800 dark:text-zinc-200 outline-none placeholder:text-zinc-400"
            />
            <kbd className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              ESC
            </kbd>
          </div>
          <div className="p-2 max-h-72 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="py-6 text-center text-xs text-zinc-400">No results found</div>
            )}
            {filtered.map((cmd, index) => {
              const isActive = activeTab === cmd.id.replace('goto-', '');
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    index === selectedIndex
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <span className={`${index === selectedIndex ? 'text-indigo-500' : 'text-zinc-400'}`}>
                    {cmd.icon}
                  </span>
                  <span>{cmd.label}</span>
                  {isActive && (
                    <span className="ml-auto text-[10px] text-zinc-400 font-mono">current</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-[10px] text-zinc-400">
            <span><kbd className="font-mono px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">↵</kbd> select</span>
            <span><kbd className="font-mono px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </>
  );
};
