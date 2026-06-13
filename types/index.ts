export type Formato = 'Reel' | 'TikTok' | 'Carrusel' | 'Historia + Reel';
export type Estado = 'Pendiente' | 'En producción' | 'Grabado' | 'Editando' | 'Programado' | 'Publicado';

export interface ContentItem {
  id: string;
  dia: number;
  objetivo: string;
  formato: Formato;
  tema: string;
  gancho: string;
  guion: string[];
  tomas: string[];
  cta: string;
  hashtags: string[];
  viralidad: number;
  estado: Estado;
  // --- NUEVOS CAMPOS ---
  copyInstagram?: string;
  copyTikTok?: string;
  dificultad?: string;
  tiempoGrabacion?: string;
}