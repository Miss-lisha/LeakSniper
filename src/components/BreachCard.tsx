import React from 'react';
import { ShieldAlert, Mail, Phone, Key, Calendar, AlertTriangle, Clock, Users } from 'lucide-react';
import { Breach } from '../data/breaches';

interface BreachCardProps {
  breach: Breach;
  index: number;
}

const BreachCard: React.FC<BreachCardProps> = ({ breach, index }) => {
  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'high': 
        return {
          color: 'text-red-700 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
        };
      case 'medium': 
        return {
          color: 'text-amber-700 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
        };
      default: 
        return {
          color: 'text-green-700 dark:text-green-400',
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
        };
    }
  };

  const getIcon = (dataType: string) => {
    if (dataType.toLowerCase().includes('email')) return <Mail className="w-4 h-4" />;
    if (dataType.toLowerCase().includes('phone')) return <Phone className="w-4 h-4" />;
    if (dataType.toLowerCase().includes('password')) return <Key className="w-4 h-4" />;
    return <ShieldAlert className="w-4 h-4" />;
  };

  const riskConfig = getRiskConfig(breach.riskLevel);

  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 
                  overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] 
                  animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
      role="article"
    >
      {/* Header with Risk Badge */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              {breach.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{breach.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{breach.recordCount} affected</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskConfig.badge}`}>
            {breach.riskLevel.toUpperCase()} RISK
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {breach.description}
        </p>
      </div>

      {/* Compromised Data */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Compromised Data
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {breach.compromisedData.map((dataType, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
              {getIcon(dataType)}
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{dataType}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className={`p-6 ${riskConfig.bg} ${riskConfig.border} border-t`}>
        <h4 className={`text-sm font-bold mb-2 flex items-center gap-2 ${riskConfig.color}`}>
          <Clock className="w-4 h-4" />
          Immediate Actions Required
        </h4>
        <p className={`text-sm leading-relaxed ${riskConfig.color}`}>
          {breach.advice}
        </p>
      </div>
    </div>
  );
};

export default BreachCard;