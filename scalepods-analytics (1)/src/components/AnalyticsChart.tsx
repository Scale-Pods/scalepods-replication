"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const data = [
  { name: 'Jan', uv: 10, pv: 20, amt: 15 },
  { name: 'Feb', uv: 45, pv: 60, amt: 35 },
  { name: 'Mar', uv: 65, pv: 100, amt: 85 },
  { name: 'Apr', uv: 50, pv: 120, amt: 40 },
  { name: 'May', uv: 70, pv: 90, amt: 60 },
  { name: 'Jun', uv: 110, pv: 150, amt: 120 },
  { name: 'Jul', uv: 150, pv: 230, amt: 200 },
  { name: 'Aug', uv: 130, pv: 180, amt: 160 },
  { name: 'Sep', uv: 160, pv: 210, amt: 180 },
  { name: 'Oct', uv: 190, pv: 250, amt: 220 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151515] border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md">
        <p className="text-[10px] text-gray-400 mb-2">Nov 29, 2022</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-gray-200">
                {entry.name === 'pv' ? '/' : entry.name === 'uv' ? '/contact' : '/gcc'}
              </span>
            </div>
            <span className="text-xs font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsChart() {
  return (
    <div className="w-full h-[350px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4B5563', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4B5563', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
          <Area 
            type="monotone" 
            dataKey="pv" 
            stroke="#8B5CF6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPv)" 
            dot={{ r: 0 }}
            activeDot={{ r: 6, fill: '#8B5CF6', stroke: 'white', strokeWidth: 2 }}
          />
          <Area 
            type="monotone" 
            dataKey="uv" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorUv)" 
            dot={{ r: 0 }}
            activeDot={{ r: 6, fill: '#3B82F6', stroke: 'white', strokeWidth: 2 }}
          />
          <Area 
            type="monotone" 
            dataKey="amt" 
            stroke="#6366F1" 
            strokeWidth={2}
            fillOpacity={0} 
            dot={{ r: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
