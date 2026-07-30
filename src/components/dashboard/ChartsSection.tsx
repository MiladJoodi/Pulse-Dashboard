import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CHART_DATA_MONTHLY, CATEGORY_DISTRIBUTION } from '../../data/mockData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';

export const ChartsSection: React.FC = () => {
  const { isDarkMode } = useAuth();
  const [metric, setMetric] = useState<'revenue' | 'users' | 'visits'>('revenue');

  const tooltipBg = isDarkMode ? '#18181b' : '#ffffff';
  const tooltipText = isDarkMode ? '#f4f4f5' : '#09090b';
  const gridColor = isDarkMode ? '#27272a' : '#f4f4f5';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Revenue / Traffic Area Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900/90 p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between bento-card hover:border-zinc-300 dark:hover:border-zinc-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Monthly Performance Trends
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Comparison chart for revenue, new signups, and visits
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl self-start sm:self-auto border border-zinc-200/50 dark:border-zinc-800">
            <button
              onClick={() => setMetric('revenue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                metric === 'revenue'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setMetric('users')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                metric === 'users'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setMetric('visits')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                metric === 'visits'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Visits
            </button>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA_MONTHLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                formatter={(val: any) => [val, 'Value']}
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                  borderRadius: '12px',
                  color: tooltipText,
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              />
              <Area
                type="monotone"
                dataKey={metric}
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMetric)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Donut Distribution */}
      <div className="bg-white dark:bg-zinc-900/90 p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between bento-card hover:border-zinc-300 dark:hover:border-zinc-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PieIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Revenue Distribution
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            Breakdown by direct, recurring & add-ons
          </p>

          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: isDarkMode ? '#27272a' : '#e4e4e7',
                    borderRadius: '12px',
                    color: tooltipText,
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-zinc-900 dark:text-white">
                100%
              </span>
              <span className="text-[10px] text-zinc-400 font-semibold">Total Share</span>
            </div>
          </div>
        </div>

        {/* Legend breakdown */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {CATEGORY_DISTRIBUTION.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

