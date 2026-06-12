"use client";
import React from 'react';
import { ContentItem, Estado } from '../types';
import { X, Clapperboard, MessageCircle, Hash, Target, RefreshCw } from 'lucide-react';

interface ModalProps {
  content: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: Estado) => void;
}

export default function ContentDetailModal({ content, isOpen, onClose, onStatusChange }: ModalProps) {
  if (!isOpen || !content) return null;

  const estados: Estado[] = ['Pendiente', 'En producción', 'Grabado', 'Editando', 'Programado', 'Publicado'];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-bold">
              Día {content.dia}
            </span>
            <span className="text-slate-400 text-sm font-medium">{content.formato}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">{content.tema}</h2>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <Target size={16} /> {content.objetivo}
              </div>
            </div>
            
            {/* HERRAMIENTA NUEVA: Selector de Estado */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 min-w-[200px]">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5 flex items-center gap-1">
                <RefreshCw size={12} /> Estado Actual
              </label>
              <select 
                value={content.estado}
                onChange={(e) => onStatusChange(content.id, e.target.value as Estado)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {estados.map(est => <option key={est} value={est}>{est}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Clapperboard size={14} /> Gancho (0-3s)
            </h3>
            <p className="text-amber-900 font-medium italic">&quot;{content.gancho}&quot;</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b pb-2">Guion</h3>
              <ul className="space-y-3">
                {Array.isArray(content.guion) 
                  ? content.guion.map((line, idx) => (
                      <li key={idx} className="text-slate-600 text-sm flex gap-3">
                        <span className="text-slate-300 font-mono mt-0.5">{idx + 1}.</span>
                        {line}
                      </li>
                    ))
                  : <p className="text-slate-600 text-sm">{content.guion}</p>}
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b pb-2 mb-4">Tomas de Apoyo</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  {content.tomas.map((toma, i) => <li key={i}>{toma}</li>)}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                    <MessageCircle size={12} /> Call to Action
                  </h4>
                  <p className="text-sm font-medium text-slate-800">{content.cta}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
                    <Hash size={12} /> Hashtags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {content.hashtags.map(tag => (
                      <span key={tag} className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}