import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUtl } from './maestrosutl';

@Pipe({
  name: 'maestrosFilter',
  standalone: true,
})
export class MaestrosFilterPipe implements PipeTransform {
  transform(value: MaestrosUtl[] | null | undefined, args: string): MaestrosUtl[] {
    if (!value) return [];
    
    let filter: string = args ? args.toLocaleLowerCase() : '';

    return filter ? value.filter((maestros: MaestrosUtl) =>
      maestros.nombre && maestros.nombre.toLocaleLowerCase().includes(filter)
    ) : value;
  }
}