import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule], // Fundamental para usar formularios reactivos
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  contactoForm: FormGroup;
  mensajeEnviado: boolean = false;

  // Inyectamos FormBuilder para construir nuestro formulario fácilmente
  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviarMensaje() {
    if (this.contactoForm.valid) {
      console.log('Datos del formulario:', this.contactoForm.value);
      
      // Mostramos la alerta de éxito y limpiamos el formulario
      this.mensajeEnviado = true;
      this.contactoForm.reset();
      
      // Ocultamos la alerta automáticamente después de 4 segundos
      setTimeout(() => {
        this.mensajeEnviado = false;
      }, 4000);
    }
  }
}