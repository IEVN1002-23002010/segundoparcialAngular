import { AlumnosUtl } from './../alumnosutl';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';
 
@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-editar',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  matricula: string = '';
 
  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}
 
  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
 
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
 
    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next: (response) => {
        // Ajusta esto dependiendo si tu API regresa 'response.alumno' o directo el objeto
        const alumnoData = response.alumno || response;
        this.formulario.patchValue(alumnoData);
      },
      error: (error) => {
        console.error('Error al consultar el alumno:', error);
      }
    });
  }
 
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
 
    const alumno = this.formulario.getRawValue();
    
    // Aseguramos que la matrícula vaya como número si tu API lo requiere
    const matriculaNum = parseInt(this.matricula, 10);

    this.alumnosUtl.modificarAlumno(matriculaNum, alumno).subscribe({
      next: (response) => {
        alert('Alumno actualizado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        const mensaje = error.error?.mensaje || error.error?.error || 'Ocurrió un error al actualizar el alumno';
        alert(mensaje);
      }
    });
  }
}