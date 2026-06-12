"use client";
import React from 'react';
import { ContentItem } from '../types';
import { Calendar, Flame, PlayCircle } from 'lucide-react';

interface ContentCardProps {
  content: ContentItem;
  onClick: (content: ContentItem) => void;
}

export default function ContentCard({ content, onClick }: ContentCardProps) {
  const getBadgeColor = (formato: string) => {
    switch (formato) {
      case 'Reel': return 'bg-pink-100 text-pink-700';
      case 'TikTok': return 'bg-slate-800 text-white';
      case 'Carrusel': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      onClick={() => onClick(content)}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-3 group"
    >
      <div className="flex justify-between items-start">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getBadgeColor(content.formato)}`}>
          {content.formato}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
          <Flame size={12} /> {content.viralidad}/10
        </span>
      </div>
      
      <div>
        <h4 className="font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
          {content.tema}
        </h4>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
        &quot;{content.gancho}&quot;
        </p>
      </div>

      <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar size={14} /> Día {content.dia}
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
          <PlayCircle size={14} /> {content.estado}
        </div>
      </div>
    </div>
  );
}