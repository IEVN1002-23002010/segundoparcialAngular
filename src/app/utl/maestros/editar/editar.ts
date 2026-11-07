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
  idmaestro: string = '';
 
  constructor(
    private route: ActivatedRoute,
    public apiService: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}
 
  ngOnInit(): void {
    this.formulario = this.fb.group({
      idmaestro: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
 
    this.idmaestro = this.route.snapshot.paramMap.get('idmaestro') || '';
 
    this.apiService.getMaestro(this.idmaestro).subscribe({
      next: (response) => {
        const maestroData = response.maestro || response;
        this.formulario.patchValue(maestroData);
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
      }
    });
  }
 
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
 
    const maestro = this.formulario.getRawValue();
    const idNum = parseInt(this.idmaestro, 10);

    this.apiService.modificarMaestro(idNum, maestro).subscribe({
      next: (response) => {
        alert('Maestro actualizado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        const mensaje = error.error?.mensaje || error.error?.message || 'Ocurrió un error al actualizar el maestro';
        alert(mensaje);
      }
    });
  }
}