import { MaestrosUtl } from '../maestrosutl';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-eliminar-maestro',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {
  formulario!: FormGroup;
  idmaestro: string = '';
  regMaestro: MaestrosUtl = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public proyectosApi: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router,
    private cdr: ChangeDetectorRef
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

    this.proyectosApi.getMaestro(this.idmaestro).subscribe({
      next: (response) => {
        const maestroData = response.maestro || response;
        this.regMaestro = maestroData;
        this.formulario.patchValue(maestroData);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
      }
    });
  }

  eliminarMaestro(): void {
    const idNum = parseInt(this.idmaestro, 10);
    
    this.proyectosApi.EliminaMaestro(idNum).subscribe({
      next: () => {
        alert('Maestro eliminado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al eliminar el maestro');
      }
    });
  }
}