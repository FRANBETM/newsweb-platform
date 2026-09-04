import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-admin-crud',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-crud.html',
  styleUrl: './admin-crud.css'
})
export class AdminCrud implements OnInit {
  noticias: Noticia[] = [];
  crudForm: FormGroup;
  modoEdicion: boolean = false;
  mostrarFormulario: boolean = false;

  constructor(private noticiasService: NoticiasService, private fb: FormBuilder) {
    // Definimos todos los campos requeridos para una noticia
    this.crudForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      categoria: ['', Validators.required],
      fecha: ['', Validators.required],
      autor: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    this.noticias = this.noticiasService.obtenerNoticias();
  }

  abrirNuevo() {
    this.modoEdicion = false;
    this.crudForm.reset();
    this.mostrarFormulario = true;
  }

  editar(noticia: Noticia) {
    this.modoEdicion = true;
    this.crudForm.patchValue(noticia); // Llena el formulario con los datos de la noticia
    this.mostrarFormulario = true;
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo de forma permanente?')) {
      this.noticiasService.eliminarNoticia(id);
      this.cargarLista();
    }
  }

  guardar() {
    if (this.crudForm.valid) {
      const datos = this.crudForm.value;
      if (this.modoEdicion) {
        this.noticiasService.actualizarNoticia(datos);
      } else {
        this.noticiasService.agregarNoticia(datos);
      }
      this.mostrarFormulario = false;
      this.cargarLista();
    }
  }

  cancelar() {
    this.mostrarFormulario = false;
  }
}
