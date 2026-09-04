import { Injectable } from '@angular/core';

export interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  fecha: string;
  descripcion: string;
  imagen: string;
  autor: string;
  contenido: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private storageKey = 'noticias_db';
  private favKey = 'favoritos_db';

  private noticiasBase: Noticia[] = [
    {
      id: 1,
      titulo: "La revolución de la IA en la vida cotidiana",
      categoria: "Tecnología",
      fecha: "Hace 2 horas",
      descripcion: "Expertos analizan cómo los modelos de lenguaje asistido están transformando el flujo de trabajo.",
      imagen: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      autor: "María García",
      contenido: "La inteligencia artificial ha dejado de ser un concepto de ciencia ficción para convertirse en una parte integral de nuestras vidas."
    },
    {
      id: 2,
      titulo: "Destinos ecológicos codiciados para visitar",
      categoria: "Turismo",
      fecha: "Hace 3 horas",
      descripcion: "Descubre las rutas sostenibles que destacan por su total preservación de la biosfera.",
      imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      autor: "Carlos Ruiz",
      contenido: "El turismo sostenible está redefiniendo los viajes internacionales reduciendo la huella de carbono."
    },
    {
      id: 3,
      titulo: "Aumento histórico en exportaciones digitales",
      categoria: "Comercio",
      fecha: "Hace 5 horas",
      descripcion: "La simplificación de trámites aduaneros y el comercio digital potencian a las pequeñas empresas.",
      imagen: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      autor: "Redacción NewsWeb",
      contenido: "Las pymes continúan ganando terreno en el mercado global gracias a la adopción de pasarelas de pago y logística centralizada."
    },
    {
      id: 4,
      titulo: "Método Montessori: Transformación en aulas",
      categoria: "Educación",
      fecha: "Ayer",
      descripcion: "Nuevas iniciativas pedagógicas buscan adaptar metodologías activas y autónomas.",
      imagen: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      autor: "Elena Rojas",
      contenido: "El fomento del pensamiento crítico y la autonomía individual marca un cambio respecto a los modelos memorísticos convencionales."
    }
  ];

  obtenerNoticias(): Noticia[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.storageKey);
      let noticias = data ? JSON.parse(data) : [];
      
      if (noticias.length === 0) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.noticiasBase));
        return this.noticiasBase;
      }
      return noticias;
    }
    return this.noticiasBase;
  }

  obtenerNoticiaPorId(id: number | string): Noticia | undefined {
    const noticias = this.obtenerNoticias();
    return noticias.find(n => n.id == id);
  }

  obtenerFavoritos(): Noticia[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const favs = localStorage.getItem(this.favKey);
      return favs ? JSON.parse(favs) : [];
    }
    return [];
  }

  toggleFavorito(noticia: Noticia): boolean {
    let favoritos = this.obtenerFavoritos();
    const index = favoritos.findIndex(f => f.id === noticia.id);

    if (index !== -1) {
      favoritos.splice(index, 1);
      if (typeof window !== 'undefined') localStorage.setItem(this.favKey, JSON.stringify(favoritos));
      return false;
    } else {
      favoritos.push(noticia);
      if (typeof window !== 'undefined') localStorage.setItem(this.favKey, JSON.stringify(favoritos));
      return true;
    }
  }

  esFavorito(id: number | string): boolean {
    const favoritos = this.obtenerFavoritos();
    return favoritos.some(f => f.id == id);
  }

  // --- MÉTODOS DEL MÓDULO CRUD ---

  agregarNoticia(nuevaNoticia: Noticia) {
    const noticias = this.obtenerNoticias();
    // Genera un ID automático basado en el ID más alto existente
    const maxId = noticias.length > 0 ? Math.max(...noticias.map(n => n.id)) : 0;
    nuevaNoticia.id = maxId + 1;
    
    noticias.push(nuevaNoticia);
    if (typeof window !== 'undefined') localStorage.setItem(this.storageKey, JSON.stringify(noticias));
  }

  actualizarNoticia(noticiaActualizada: Noticia) {
    let noticias = this.obtenerNoticias();
    const index = noticias.findIndex(n => n.id === noticiaActualizada.id);
    
    if (index !== -1) {
      noticias[index] = noticiaActualizada;
      if (typeof window !== 'undefined') localStorage.setItem(this.storageKey, JSON.stringify(noticias));
    }
  }

  eliminarNoticia(id: number) {
    let noticias = this.obtenerNoticias();
    noticias = noticias.filter(n => n.id !== id);
    if (typeof window !== 'undefined') localStorage.setItem(this.storageKey, JSON.stringify(noticias));

    // Opcional: Si se elimina del catálogo, también la limpiamos de favoritos
    let favoritos = this.obtenerFavoritos();
    favoritos = favoritos.filter(n => n.id !== id);
    if (typeof window !== 'undefined') localStorage.setItem(this.favKey, JSON.stringify(favoritos));
  }
}