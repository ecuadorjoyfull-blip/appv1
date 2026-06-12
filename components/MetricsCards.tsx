"use client";
import React from 'react';
import { LayoutDashboard, Video, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ContentItem } from '../types';

interface MetricsCardsProps {
  data: ContentItem[];
}

export default function MetricsCards({ data }: MetricsCardsProps) {
  // Aquí hacemos las matemáticas
  const total = data.length;

  const formatos = data.reduce((acc, item) => {
    acc[item.formato] = (acc[item.formato] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let formatoPrincipal = "Ninguno";
  let maxCount = 0;
  for (const [formato, count] of Object.entries(formatos)) {
    if (count > maxCount) {
      maxCount = count;
      formatoPrincipal = `${count} ${formato}s`;
    }
  }

  const promedioViralidad = total > 0 
    ? (data.reduce((sum, item) => sum + item.viralidad, 0) / total).toFixed(1)
    : "0";

  const enProduccion = data.filter(item => item.estado === 'En producción').length;

  // Aquí mostramos los resultados dinámicos con las llaves {}
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
          <LayoutDashboard size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Total Contenidos</p>
          <h3 className="text-2xl font-bold text-slate-800">{total}</h3>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <Video size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Formato Principal</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatoPrincipal}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Viralidad Promedio</p>
          <h3 className="text-2xl font-bold text-slate-800">{promedioViralidad} / 10</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">En Producción</p>
          <h3 className="text-2xl font-bold text-slate-800">{enProduccion}</h3>
        </div>
      </div>
    </div>
  );
}