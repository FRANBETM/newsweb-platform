import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  noticiasDestacadas: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.noticiasDestacadas = this.noticiasService.obtenerNoticias().slice(0, 4);
  }
}