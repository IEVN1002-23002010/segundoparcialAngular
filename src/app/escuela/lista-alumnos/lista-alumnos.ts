import { Component } from '@angular/core';
import { IAlumno } from '../alumnos';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos implements OnInit{
  formulario!:FormGroup

  alumnos:IAlumno[]=[]
  nuevoAlumno:IAlumno={
    Matricula:'xx',
    Nombre:'xx',
    Correo:'xx',
    Materia:'xx',

  }
  ngOnInit(): void {
    this.cargarAlumno()
    this.formulario=new FormGroup({
      Matricula: new FormControl(''),
      Nombre: new FormControl(''),
      Correo: new FormControl(''),
      Materia: new FormControl(''),
    })
  }


  muestraAlumnos():void{
    this.nuevoAlumno.Nombre=this.formulario.value.Nombre
    this.nuevoAlumno.Matricula=this.formulario.value.Matricula
    this.nuevoAlumno.Correo=this.formulario.value.Correo
    this.nuevoAlumno.Materia=this.formulario.value.Materia
  }

  


  cargarAlumno():void{

  }
}
