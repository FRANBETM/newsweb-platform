import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  noticia: Noticia | undefined;
  esFav: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.noticia = this.noticiasService.obtenerNoticiaPorId(id);
      this.esFav = this.noticiasService.esFavorito(id);
    }
  }

  toggleFav() {
    if (this.noticia) {
      this.esFav = this.noticiasService.toggleFavorito(this.noticia);
    }
  }
}