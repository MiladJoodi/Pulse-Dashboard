import React from 'react';
import { STAT_METRICS } from '../../data/mockData';
import { DollarSign, Users, ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';

export const StatCards: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />;
      case 'Users':
        return <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />;
      default:
        return <TrendingUp className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_METRICS.map((stat, idx) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.05 }}
          className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {stat.title}
            </span>
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
              {getIcon(stat.icon)}
            </div>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight font-mono">
              {stat.value}
            </h3>

            <div
              className={`flex items-center gap-0.5 text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                stat.isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40'
              }`}
            >
              {stat.isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
            {stat.period}
          </div>
        </motion.div>
      ))}
    </div>
  );
};


