import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, MoreHorizontal, Clock, CheckCircle2, AlertCircle, Circle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  comments: number;
  dueDate: string;
}

const initialTasks: Record<string, Task[]> = {
  'todo': [
    { id: '1', title: 'Design new dashboard widgets', description: 'Create wireframes for analytics widgets', priority: 'high', assignee: 'Emma', comments: 3, dueDate: 'Aug 5' },
    { id: '2', title: 'Update user permissions', description: 'Review and update role-based access', priority: 'medium', assignee: 'James', comments: 1, dueDate: 'Aug 7' },
    { id: '3', title: 'API rate limiting', description: 'Implement rate limiting for public endpoints', priority: 'low', assignee: 'Sarah', comments: 0, dueDate: 'Aug 12' },
  ],
  'in-progress': [
    { id: '4', title: 'Migrate database to v2', description: 'Schema migration and data verification', priority: 'high', assignee: 'Mike', comments: 5, dueDate: 'Aug 3' },
    { id: '5', title: 'Notification system overhaul', description: 'Rewrite notification service', priority: 'medium', assignee: 'Lisa', comments: 2, dueDate: 'Aug 8' },
  ],
  'review': [
    { id: '6', title: 'Dark mode refinement', description: 'Final QA pass on dark mode colors', priority: 'low', assignee: 'Emma', comments: 4, dueDate: 'Aug 1' },
  ],
  'done': [
    { id: '7', title: 'Sprint planning 2024-Q3', description: 'Quarterly roadmap and sprint goals', priority: 'high', assignee: 'Alex', comments: 8, dueDate: 'Jul 28' },
    { id: '8', title: 'Setup CI/CD pipeline', description: 'GitHub Actions workflow configuration', priority: 'medium', assignee: 'Mike', comments: 2, dueDate: 'Jul 25' },
  ],
};

const columns = [
  { id: 'todo', label: 'To Do', icon: Circle, color: 'text-zinc-400' },
  { id: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-amber-500' },
  { id: 'review', label: 'Review', icon: AlertCircle, color: 'text-blue-500' },
  { id: 'done', label: 'Done', icon: CheckCircle2, color: 'text-emerald-500' },
];

const priorityColors: Record<string, string> = {
  high: 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/40',
  medium: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40',
  low: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
};

export const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [dragging, setDragging] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDragging(taskId);
  };

  const handleDrop = (columnId: string) => {
    if (!dragging) return;
    const entries = Object.entries(tasks) as [string, Task[]][];
    const sourceColumn = entries.find(([_, items]) =>
      items.some((t) => t.id === dragging)
    );
    if (!sourceColumn) return;
    const [sourceId, sourceItems] = sourceColumn;
    if (sourceId === columnId) return;

    const task = sourceItems.find((t) => t.id === dragging)!;
    const newSource = sourceItems.filter((t) => t.id !== dragging);
    const newTarget = [...(tasks[columnId] || []), task];

    setTasks({ ...tasks, [sourceId]: newSource, [columnId]: newTarget });
    setDragging(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Drag tasks between columns to update status
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const Icon = col.icon;
          const items = tasks[col.id] || [];
          return (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
              className="bg-zinc-50/80 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/70 p-3 min-h-[200px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${col.color}`} />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{col.label}</span>
                  <span className="text-[10px] font-mono font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded">
                    {items.length}
                  </span>
                </div>
                <button className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 cursor-pointer">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {items.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className={`bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 p-3 shadow-xs cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
                      dragging === task.id ? 'opacity-50 ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      <button className="p-0.5 rounded text-zinc-300 hover:text-zinc-500 cursor-pointer">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mb-1 leading-snug">
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-[8px] font-bold">
                          {task.assignee[0]}
                        </div>
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.comments > 0 && (
                          <span>{task.comments} comments</span>
                        )}
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
