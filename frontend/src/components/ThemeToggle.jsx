import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

export default function ThemeToggle({ variant = 'header', className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'sidebar') {
    return (
      <button
        id="sidebar-theme-toggle-btn"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer ${
          isDark
            ? 'bg-slate-900/60 hover:bg-slate-800/70 text-slate-300 hover:text-white border-slate-800'
            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-950 border-slate-200 shadow-xs'
        } ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isDark
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
            }`}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            ) : (
              <Sun className="w-3.5 h-3.5 transition-transform duration-300 rotate-0 hover:rotate-45" />
            )}
          </div>
          <span className="font-medium">{isDark ? 'Dark Theme' : 'Light Theme'}</span>
        </div>

        {/* Pill switch */}
        <div
          className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
            isDark ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-xs transition-transform duration-200" />
        </div>
      </button>
    );
  }

  // Default: Header button
  return (
    <button
      id="header-theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`group relative p-2 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isDark
          ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border-slate-800 hover:border-slate-700 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]'
          : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 group-hover:text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-45" />
        )}
      </div>

      <span className="hidden xl:inline text-[11px] font-semibold">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
