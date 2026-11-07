import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaestrosUtl } from '../maestrosutl';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-agregar',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public apiService: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      idmaestro: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) return;

    const datos: MaestrosUtl = this.formGroup.getRawValue();

    this.apiService.agregarNuevoMaestro(datos).subscribe({
      next: (respuesta) => {
        alert('Maestro registrado correctamente');
        this.formGroup.reset();
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al registrar maestro:', error);
        const mensaje = error.error?.mensaje || error.error?.message || 'Ocurrió un error';
        alert(mensaje);
      }
    });
  }
}