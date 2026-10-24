import React from 'react';
import {
  AreaChart, Area,
  LineChart, Line,
  XAxis, YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Activity, Layers, Zap, Clock } from 'lucide-react';
import { useTheme } from '../context/useTheme';

const CustomTooltip = ({ active, payload, label, unit = "" }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 px-3 py-2 rounded-lg shadow-xl backdrop-blur-md text-xs">
        <p className="text-slate-500 dark:text-slate-400 font-mono mb-1">Time: {label}</p>
        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color || payload[0].stroke }} />
          {payload[0].name}: {payload[0].value} {unit}
        </p>
      </div>
    );
  }
  return null;
};

export default function ChartsSection({ history = [], thresholds = { scale_out: 60, scale_in: 25 } }) {
  const { isDark } = useTheme();
  const chartData = history.slice(-30); // Last 30 data points for optimal clarity

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const axisColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
      {/* 1. CPU Utilization Chart */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-lg transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">CPU Utilization Over Time</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Target threshold: {thresholds.scale_out}% (Scale Out) | {thresholds.scale_in}% (Scale In)</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
            Live %
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={isDark ? 0.4 : 0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="time" stroke={axisColor} tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} stroke={axisColor} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip unit="%" />} />
              <Area type="monotone" dataKey="cpu" name="CPU Utilization" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#cpuGradient)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Replica Count Chart */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-lg transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Replica Capacity (Scale In / Out)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Active worker pod replica instances</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
            Instances
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="replicaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={isDark ? 0.4 : 0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="time" stroke={axisColor} tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 5]} allowDecimals={false} stroke={axisColor} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip unit="pods" />} />
              <Area type="stepAfter" dataKey="replicas" name="Active Replicas" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#replicaGradient)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Request Rate (RPS) Chart */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-lg transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Incoming Request Rate (RPS)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Client throughput processed by cluster</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
            req / sec
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="time" stroke={axisColor} tick={{ fontSize: 10 }} />
              <YAxis stroke={axisColor} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip unit="req/s" />} />
              <Line type="monotone" dataKey="rps" name="Request Rate" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Response Latency Chart */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-lg transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Response Latency</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Round-trip time impacted by load and scaling</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
            milliseconds
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="time" stroke={axisColor} tick={{ fontSize: 10 }} />
              <YAxis stroke={axisColor} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip unit="ms" />} />
              <Line type="monotone" dataKey="latency_ms" name="Latency" stroke="#a855f7" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
