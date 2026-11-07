import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUtl } from './alumnosutl';

@Pipe({
  name: 'alumnosFilter',
  standalone: true,
})
export class AlumnosFilterPipe implements PipeTransform {
  transform(value: AlumnosUtl[] | null | undefined, args: string): AlumnosUtl[] {
    if (!value) return [];
    
    let filter: string = args ? args.toLocaleLowerCase() : '';

    return filter ? value.filter((alumno: AlumnosUtl) =>
      alumno.nombre && alumno.nombre.toLocaleLowerCase().includes(filter)
    ) : value;
  }
}