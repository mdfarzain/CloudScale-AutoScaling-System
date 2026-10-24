import React from 'react';
import { 
  Cloud, 
  LayoutDashboard, 
  Server, 
  Sliders, 
  Flame, 
  History, 
  FileCode, 
  ShieldCheck
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Sidebar({ activeTab, setActiveTab, replicaCount, isHealthy = true }) {
  const menuItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'replicas', label: 'Replica Pool & Pods', icon: Server, badge: `${replicaCount} Active` },
    { id: 'scaling', label: 'Auto-Scaling Policy', icon: Sliders },
    { id: 'loadtest', label: 'Load Testing Lab', icon: Flame },
    { id: 'events', label: 'Scaling Event Log', icon: History },
    { id: 'k8s', label: 'Kubernetes Architecture', icon: FileCode }
  ];

  return (
    <aside className="w-64 bg-white/95 dark:bg-slate-950/90 border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 p-4 select-none transition-colors duration-200">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 p-0.5 shadow-md shadow-cyan-500/15">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Cloud className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              CloudScale
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold block">
              Auto-Scaler &amp; LB
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 shadow-xs dark:shadow-[0_0_15px_rgba(59,130,246,0.15)] font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cluster Status Footer & Theme Toggle */}
      <div className="space-y-2">
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              System Status
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              {isHealthy ? 'Online' : 'Degraded'}
            </span>
          </div>
          <div className="space-y-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>Backend API:</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">127.0.0.1:5000</span>
            </div>
            <div className="flex justify-between">
              <span>Autoscaler:</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">Active (1s loop)</span>
            </div>
            <div className="flex justify-between">
              <span>Cluster Mode:</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">Local Sim</span>
            </div>
          </div>
        </div>

        {/* Theme Toggle row in sidebar */}
        <ThemeToggle variant="sidebar" />
      </div>
    </aside>
  );
}
