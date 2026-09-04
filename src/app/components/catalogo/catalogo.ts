import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {
  todasLasNoticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.todasLasNoticias = this.noticiasService.obtenerNoticias();
  }
}