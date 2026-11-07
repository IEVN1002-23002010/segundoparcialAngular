import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../proyectoapi.service';
import { AlumnosFilterPipe } from './alumnos-filter.pipe';
import { CommonModule } from '@angular/common';
import { AlumnosUtl } from './alumnosutl';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  imports: [FormsModule, RouterLink, AlumnosFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
})
export class Alumnos implements OnInit {
  listFilter: string = '';
  
  alumnos$!: Observable<AlumnosUtl[]>; 

  constructor(public alumnosUTL: ProyectoapiService) {}

  ngOnInit(): void {
    this.alumnos$ = this.alumnosUTL.getAlumnos().pipe(
      map(response => response.alumnos)
    );
  }
}