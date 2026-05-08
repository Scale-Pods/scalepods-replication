"use client";

import { motion } from 'motion/react';

interface DetailItem {
  label: string;
  value: string | number;
  percentage?: number;
  sublabel?: string;
}

interface DetailCardProps {
  title: string;
  items?: DetailItem[];
  emptyState?: boolean;
}

export default function DetailCard({ title, items, emptyState }: DetailCardProps) {
  return (
    <div className="bg-card-bg rounded-2xl p-6 border border-white/5 border-glow flex flex-col min-h-[220px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-[10px] text-gray-500 font-medium">Inter in GT Walsheim</p>
      </div>

      {emptyState ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
          <div className="w-24 h-16 bg-white/5 rounded-lg mb-4 border border-white/10 flex flex-col p-2 gap-1 overflow-hidden relative">
            <div className="w-full h-1 bg-white/20 rounded-full" />
            <div className="w-2/3 h-1 bg-white/20 rounded-full" />
            <div className="w-1/2 h-1 bg-white/20 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold">No data</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {items?.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-white tracking-wide">{item.label}</p>
                  {item.sublabel && <p className="text-[9px] text-gray-500">{item.sublabel}</p>}
                </div>
                <span className="text-xs font-bold text-white">{item.value}</span>
              </div>
              {item.percentage !== undefined && (
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    className={`h-full rounded-full ${index % 2 === 0 ? 'bg-neon-blue' : 'bg-neon-purple'} shadow-[0_0_8px_rgba(59,130,246,0.4)]`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
