import React from 'react';
import { Info } from 'lucide-react';

export default function SimulationNotice({ isSimulated = true }) {
  if (!isSimulated) return null;

  return (
    <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 my-4 flex items-start gap-3.5 backdrop-blur-xs transition-colors duration-200">
      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 shrink-0">
        <Info className="w-5 h-5" />
      </div>
      <div className="text-xs space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-white tracking-wide">
            Local Auto-Scaling Simulation Mode Active
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40">
            Windows Local Standalone
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The scaling controller, round-robin load balancer, threshold monitor, and metrics pipeline are actively executing real computational algorithms in Python. In this local mode, replica instances are managed within a high-fidelity local replica pool. Production Kubernetes manifests (<code>deployment.yaml</code>, <code>hpa.yaml</code>, <code>service.yaml</code>) and Docker configurations are included in the repository for deployment to Minikube or cloud clusters.
        </p>
      </div>
    </div>
  );
}
