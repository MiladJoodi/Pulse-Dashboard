import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, ShieldCheck, Activity, Command } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const { isDarkMode, toggleDarkMode } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Top Header Controls (Theme Toggle) */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2.5 pointer-events-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm">
            <Command className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-zinc-900 dark:text-white tracking-tight">
            Pulse
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all text-zinc-700 dark:text-zinc-300 cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>
        </div>
      </div>

      {/* Left Visual Editorial Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 text-white p-12 flex-col justify-between relative overflow-hidden select-none border-r border-zinc-800">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 pt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Production Build v2.4</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            Integrated Analytics Platform <br />
            <span className="text-zinc-400 font-medium">& Executive User Management</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
            Enterprise-grade administrative engine designed for real-time operation tracking and access governance.
          </p>
        </div>

        {/* Live UI Mock Card */}
        <div className="relative z-10 my-6 bg-zinc-950/80 border border-zinc-800 p-5 rounded-xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-zinc-200">
                Real-time System Status
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              99.9% Uptime
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800">
              <span className="block text-[10px] text-zinc-400 mb-1">Today Revenue</span>
              <span className="text-xs font-bold font-mono text-white">$128,500</span>
            </div>
            <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800">
              <span className="block text-[10px] text-zinc-400 mb-1">Active Users</span>
              <span className="text-xs font-bold font-mono text-white">4,850</span>
            </div>
            <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800">
              <span className="block text-[10px] text-zinc-400 mb-1">Success Rate</span>
              <span className="text-xs font-bold font-mono text-emerald-400">98.4%</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-zinc-500 flex items-center justify-between border-t border-zinc-800 pt-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span>256-bit Encrypted Auth System</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-600">SSL READY</span>
        </div>
      </div>

      {/* Right Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 pt-24 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1.5 tracking-tight">{title}</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
};


