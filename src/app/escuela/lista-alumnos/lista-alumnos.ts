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
  indiceEdicion:number=-1

  nuevoAlumno:IAlumno={
    Matricula:'',
    Nombre:'',
    Correo:'',
    Materia:'',

  }
  ngOnInit(): void {
    this.cargarAlumnos()
    this.formulario=new FormGroup({
      Matricula: new FormControl(''),
      Nombre: new FormControl(''),
      Correo: new FormControl(''),
      Materia: new FormControl(''),
    })
  }

  agregarAlumno():void{
    if (
      this.nuevoAlumno.Matricula === '' || 
      this.nuevoAlumno.Nombre === '' ||
      this.nuevoAlumno.Correo === '' ||
      this.nuevoAlumno.Materia === ''
    ){
      alert('Todos los campos son obligados');
      return;
    }


    if(this.indiceEdicion !== -1){
      this.alumnos[this.indiceEdicion]={
        ...this.nuevoAlumno
      }
    }else{
      this.alumnos.push({...this.nuevoAlumno})
    }




    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
    this.limpiarCampos()

  }


  muestraAlumnos():void{
    this.nuevoAlumno.Nombre=this.formulario.value.Nombre
    this.nuevoAlumno.Matricula=this.formulario.value.Matricula
    this.nuevoAlumno.Correo=this.formulario.value.Correo
    this.nuevoAlumno.Materia=this.formulario.value.Materia
    this.agregarAlumno()
  }

  


  cargarAlumnos():void{

    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos)
    }
  }


  editarAlumnos(index:number):void{
    this.nuevoAlumno={
      ...this.alumnos[index]
    }
    const alumno=this.alumnos[index]
    this.formulario.patchValue({
      Matricula: alumno.Matricula,
      Nombre: alumno.Nombre,
      Correo: alumno.Correo,
      Materia: alumno.Materia
    })

    this.indiceEdicion=index
  }


  eliminarAlumno(index: number): void{
    this.alumnos.splice(index,1)
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }


  limpiarCampos():void{
    this.nuevoAlumno = {
      Matricula: '',
      Nombre: '',
      Correo: '',
      Materia: ''
    }
    this.indiceEdicion=-1
  }
}
