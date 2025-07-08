import React, { useState } from 'react';
import { TIMELINE_BREACHES } from '../data/breaches';
import { Calendar, TrendingUp } from 'lucide-react';

const BreachTimeline: React.FC = () => {
  const [hoveredBreach, setHoveredBreach] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 text-sm font-medium mb-4">
          <TrendingUp className="w-4 h-4" />
          Data Breach Timeline
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mb-2">
          Major Security Incidents (2021-2024)
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Track the evolution of major data breaches over the past four years
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="relative">
          {/* Timeline line with gradient */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-300 to-red-400 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Year labels */}
          <div className="flex justify-between mb-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <span className="bg-white dark:bg-slate-800 px-2">2021</span>
            <span className="bg-white dark:bg-slate-800 px-2">2022</span>
            <span className="bg-white dark:bg-slate-800 px-2">2023</span>
            <span className="bg-white dark:bg-slate-800 px-2">2024</span>
          </div>
          
          {/* Breach points */}
          <div className="relative h-20">
            {TIMELINE_BREACHES.map((breach) => (
              <div
                key={breach.year}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${breach.position}%`, top: '50%' }}
                onMouseEnter={() => setHoveredBreach(breach.name)}
                onMouseLeave={() => setHoveredBreach(null)}
              >
                <div 
                  className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 shadow-lg ${
                    breach.name === 'MOAB' 
                      ? 'bg-red-500 ring-4 ring-red-200 dark:ring-red-800 hover:scale-125' 
                      : 'bg-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 hover:scale-125'
                  } ${hoveredBreach === breach.name ? 'scale-125' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${breach.name} breach in ${breach.year}, ${breach.count} records`}
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 scale-50"></div>
                </div>
                
                {/* Enhanced Tooltip */}
                {hoveredBreach === breach.name && (
                  <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-slate-900 dark:bg-slate-700 text-white rounded-lg px-4 py-3 shadow-xl border border-slate-700 dark:border-slate-600 min-w-max">
                      <div className="font-bold text-sm mb-1">{breach.name}</div>
                      <div className="text-xs text-slate-300 dark:text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {breach.year} • {breach.count} records
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                     border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900
                                     dark:border-t-slate-700"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Legend */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-slate-600 dark:text-slate-400">Standard Breach</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-600 dark:text-slate-400">Mega Breach (MOAB)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreachTimeline;