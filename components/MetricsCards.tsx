"use client";
import React from 'react';
import { LayoutDashboard, Video, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
          <LayoutDashboard size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Total Contenidos</p>
          <h3 className="text-2xl font-bold text-slate-800">20</h3>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <Video size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Formato Principal</p>
          <h3 className="text-2xl font-bold text-slate-800">14 Reels</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Viralidad Promedio</p>
          <h3 className="text-2xl font-bold text-slate-800">8.4 / 10</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">En Producción</p>
          <h3 className="text-2xl font-bold text-slate-800">5</h3>
        </div>
      </div>
    </div>
  );
}