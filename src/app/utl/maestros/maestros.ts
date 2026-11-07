import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';
import { MaestrosFilterPipe } from './maestros-filter.pipe';
import { MaestrosUtl } from './maestrosutl';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-maestros',
  imports: [FormsModule, CommonModule, MaestrosFilterPipe, RouterLink], 
  templateUrl: './maestros.html',
})
export class Maestros implements OnInit {
  listFilter: string = '';
  
  maestros$!: Observable<MaestrosUtl[]>;

  constructor(public apiService: ProyectoapiService) {}

  ngOnInit(): void {
    this.maestros$ = this.apiService.getMaestros().pipe(
      map(response => response.maestros)
    );
  }
}