import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Catalogo } from './components/catalogo/catalogo';
import { Detalle } from './components/detalle/detalle';
import { Favoritos } from './components/favoritos/favoritos';
import { Contacto } from './components/contacto/contacto';
import { AdminCrud } from './components/admin-crud/admin-crud';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'noticias', component: Catalogo },
  { path: 'noticia/:id', component: Detalle },
  { path: 'favoritos', component: Favoritos },
  { path: 'contacto', component: Contacto },
  { path: 'admin', component: AdminCrud },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];