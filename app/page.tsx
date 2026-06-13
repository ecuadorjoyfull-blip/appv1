"use client";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Importamos tu conexión
import { editorialData } from '../data/editorial-data'; // Tus datos actuales
import { ContentItem, Estado } from '../types';
import MetricsCards from '../components/MetricsCards';
import ContentCard from '../components/ContentCard';
import ContentDetailModal from '../components/ContentDetailModal';

const filterOptions: (Estado | 'Todos')[] = ['Todos', 'Pendiente', 'En producción', 'Grabado', 'Editando', 'Programado', 'Publicado'];

export default function Dashboard() {
  const [list, setList] = useState<ContentItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<Estado | 'Todos'>('Todos');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Escuchar a Firebase en tiempo real e inicializar datos si está vacío
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contenidos"), (snapshot) => {
      if (snapshot.empty) {
        // Si Firebase está vacío, subimos tus 6 días automáticamente
        editorialData.forEach(async (item) => {
          await setDoc(doc(db, "contenidos", item.id), item);
        });
      } else {
        const items: ContentItem[] = [];
        snapshot.forEach((doc) => {
          items.push(doc.data() as ContentItem);
        });
        // Ordenar por día para que no se desordenen
        items.sort((a, b) => a.dia - b.dia);
        setList(items);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Guardar el cambio de estado directamente en Firebase
  const handleStatusChange = async (id: string, newStatus: Estado) => {
    try {
      const docRef = doc(db, "contenidos", id);
      await updateDoc(docRef, { estado: newStatus });
      
      // Actualizar también el modal si está abierto
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, estado: newStatus });
      }
    } catch (error) {
      console.error("Error al actualizar en Firebase:", error);
    }
  };

  const filteredList = activeFilter === 'Todos'
    ? list
    : list.filter(item => item.estado === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <p className="text-slate-500 font-medium animate-pulse">Conectando con el cerebro en la nube...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">Joyfull Content Hub</h1>
          <p className="text-slate-500 mt-1">Campaña Mundial + Bienestar Familiar | Joyfull Ecuador</p>
        </header>

        {/* Tarjetas de Métricas Inteligentes */}
        <MetricsCards data={list} />

        {/* Barra de Filtros */}
        <div className="mt-12 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">Calendario de Contenidos</h2>
          <div className="flex flex-wrap gap-2 border-b pb-3 border-slate-200">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === option
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {option === 'Todos' 
  ? `Todos (${list.length})` 
  : `${option} (${list.filter(item => item.estado === option).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Rejilla de Contenidos */}
        {filteredList.length === 0 ? (
          <p className="text-slate-400 italic text-sm py-8">No hay contenidos en el estado &quot;{activeFilter}&quot; actualmente.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredList.map((item) => (
              <ContentCard 
              key={item.id} 
              content={item} 
              onClick={() => setSelectedItem(item)} 
            />
            ))}
          </div>
        )}

        {/* Modal de Detalle */}
        {selectedItem && (
          <ContentDetailModal
            content={selectedItem}
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}