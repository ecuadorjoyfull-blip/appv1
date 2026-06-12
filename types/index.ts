export type Formato = 'Reel' | 'TikTok' | 'Carrusel' | 'Historia + Reel';
export type Estado = 'Pendiente' | 'En producción' | 'Grabado' | 'Editando' | 'Programado' | 'Publicado';

export interface ContentItem {
  id: string;
  dia: number;
  objetivo: string;
  formato: Formato;
  tema: string;
  gancho: string;
  guion: string | string[];
  tomas: string[];
  cta: string;
  hashtags: string[];
  viralidad: number; // del 1 al 10
  estado: Estado;
  fechaGrabacion?: string;
  fechaEdicion?: string;
  fechaPublicacion?: string;
}