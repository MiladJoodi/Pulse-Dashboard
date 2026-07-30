import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardTab } from '../../types';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { StatCards } from './StatCards';
import { ChartsSection } from './ChartsSection';
import { RecentActivities } from './RecentActivities';
import { UsersManagement } from './UsersManagement';
import { SettingsView } from './SettingsView';
import { TasksView } from './TasksView';
import { PricingView } from './PricingView';
import { CommandPalette } from './CommandPalette';
import { MessageSquare, Send } from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardLayout: React.FC = () => {
  const { showToast } = useAuth();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Quick message state
  const [msgText, setMsgText] = useState('');

  const handleSendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    showToast('success', 'Message dispatched successfully');
    setMsgText('');
  };

  return (
    <div className="min-h-screen flex bg-zinc-100/90 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {isCommandPaletteOpen && (
        <CommandPalette
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Tab Body Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <StatCards />
              <ChartsSection />
              <RecentActivities />
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <UsersManagement />
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PricingView />
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TasksView />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <ChartsSection />
              <StatCards />
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl space-y-6"
            >
              <div className="bg-white dark:bg-zinc-900/90 p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm bento-card">
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-500" />
                  <span>Broadcast System Message</span>
                </h2>
                <form onSubmit={handleSendMsg} className="space-y-3">
                  <textarea
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    rows={3}
                    placeholder="Write your announcement text..."
                    className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Broadcast Message</span>
                  </button>
                </form>
              </div>

              <div className="bg-white dark:bg-zinc-900/90 p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm space-y-3 bento-card">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                  Sent Message History
                </h3>
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/60 dark:border-zinc-800 text-xs">
                  <div className="flex justify-between font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                    <span>Terms update notice</span>
                    <span className="text-[10px] text-zinc-400">2024-07-12</span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Privacy policy updated for compliance.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SettingsView />
            </motion.div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

