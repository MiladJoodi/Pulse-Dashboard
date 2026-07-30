import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200/90 dark:border-zinc-800/80 px-4 sm:px-6 py-4 flex items-center justify-between text-[11px] text-zinc-400">
      <span>
        Made with <span className="text-red-500 text-base align-middle">❤</span> by{' '}
        <a
          href="https://www.linkedin.com/in/joodi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 dark:text-indigo-400 hover:underline font-medium"
        >
          Joodi
        </a>
      </span>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/joodi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
};
