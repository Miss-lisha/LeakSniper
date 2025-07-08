import React from 'react';
import { AlertTriangle, Shield, TrendingUp } from 'lucide-react';
import { Breach } from '../data/breaches';

interface RiskGaugeProps {
  score: number;
  breaches: Breach[];
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, breaches }) => {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Critical', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500' };
    if (score >= 60) return { level: 'High', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500' };
    if (score >= 40) return { level: 'Medium', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500' };
    if (score >= 20) return { level: 'Low', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500' };
    return { level: 'Minimal', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500' };
  };

  const risk = getRiskLevel(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const hasPasswordExposure = breaches.some(breach => 
    breach.compromisedData.some(data => data.toLowerCase().includes('password'))
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        Credential Reuse Risk Score
      </h3>
      
      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={risk.bg.replace('bg-', 'text-')}
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${risk.color}`}>{score}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">/ 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Level */}
      <div className="text-center mb-6">
        <div className={`text-lg font-bold ${risk.color} mb-2`}>
          {risk.level} Risk
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Based on {breaches.length} breach{breaches.length !== 1 ? 'es' : ''} and data exposure
        </p>
      </div>

      {/* Risk Factors */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <span className="text-sm text-slate-700 dark:text-slate-300">Breaches Found</span>
          <span className="font-medium text-slate-900 dark:text-white">{breaches.length}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <span className="text-sm text-slate-700 dark:text-slate-300">Password Exposure</span>
          <div className="flex items-center gap-2">
            {hasPasswordExposure ? (
              <>
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-600 dark:text-red-400">Yes</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-600 dark:text-green-400">No</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
          <span className="text-sm text-slate-700 dark:text-slate-300">MOAB Exposure</span>
          <div className="flex items-center gap-2">
            {breaches.some(b => b.id === 'moab-2024') ? (
              <>
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-600 dark:text-red-400">Yes</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-600 dark:text-green-400">No</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;