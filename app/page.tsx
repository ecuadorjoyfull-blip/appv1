"use client";
import React, { useState } from 'react';
import MetricsCards from '../components/MetricsCards';
import ContentCard from '../components/ContentCard';
import ContentDetailModal from '../components/ContentDetailModal';
import { editorialData } from '../data/editorial-data';
import { ContentItem, Estado } from '../types';

export default function Dashboard() {
  // Guardamos la lista de contenidos en la memoria viva de la página
  const [list, setList] = useState<ContentItem[]>(editorialData);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // HERRAMIENTA NUEVA: Filtro seleccionado (Por defecto muestra 'Todos')
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const handleOpenModal = (content: ContentItem) => {
    // Buscamos la versión más actualizada del elemento en nuestra lista interna
    const currentItem = list.find(item => item.id === content.id) || content;
    setSelectedContent(currentItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  // Función mágica: cambia el estado del video seleccionado y redibuja la pantalla
  const handleStatusChange = (id: string, newStatus: Estado) => {
    const updatedList = list.map(item => {
      if (item.id === id) {
        return { ...item, estado: newStatus };
      }
      return item;
    });
    
    setList(updatedList);
    
    // Actualiza la ficha abierta para que veas el cambio de inmediato
    if (selectedContent && selectedContent.id === id) {
      setSelectedContent({ ...selectedContent, estado: newStatus });
    }
  };

  // Filtramos los contenidos basados en el botón que presionaste
  const filteredData = activeFilter === 'Todos' 
    ? list 
    : list.filter(item => item.estado === activeFilter);

  const filterOptions = ['Todos', 'Pendiente', 'En producción', 'Grabado', 'Editando', 'Programado', 'Publicado'];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">Content Hub</h1>
          <p className="text-slate-500 mt-1">Campaña Mundial + Bienestar Familiar | Joyfull Ecuador</p>
        </header>

        <MetricsCards data={list} />

        {/* BARRA DE FILTROS ESTILO AIRTABLE/NOTION */}
        <div className="mt-12 mb-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-slate-800">Calendario de Contenidos</h2>
            <div className="flex flex-wrap gap-2 border-b pb-3 border-slate-200">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === option
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {option} ({option === 'Todos' ? list.length : list.filter(i => i.estado === option).length})
                </button>
              ))}
            </div>
          </div>
        </div>
          
        {/* Grilla dinámica de tarjetas */}
        {filteredData.length === 0 ? (
          <div className="bg-white border border-dashed text-center py-12 rounded-xl text-slate-400 font-medium">
            No hay contenidos en el estado &quot;{activeFilter}&quot; actualmente.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredData.map((item) => (
              <ContentCard 
                key={item.id} 
                content={item} 
                onClick={handleOpenModal} 
              />
            ))}
          </div>
        )}
      </div>

      <ContentDetailModal 
        content={selectedContent} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}