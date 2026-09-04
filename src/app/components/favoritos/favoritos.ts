import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos implements OnInit {
  misFavoritos: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    // Lee el arreglo de favoritos desde el servicio (localStorage)
    this.misFavoritos = this.noticiasService.obtenerFavoritos();
  }

  quitarFavorito(noticia: Noticia) {
    // Alterna el estado (lo elimina) y recarga la lista para actualizar la vista
    this.noticiasService.toggleFavorito(noticia);
    this.cargarFavoritos();
  }
}