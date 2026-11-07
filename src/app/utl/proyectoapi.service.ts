import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlumnosUtl } from "./alumnos/alumnosutl";
import { MaestrosUtl } from "./maestros/maestrosutl";
import { Observable } from "rxjs";

export interface AlumnosApiResponse {
    alumnos: AlumnosUtl[];
    exito: boolean;
    mensaje: string;
}
export interface MaestrosApiResponse {
    maestros: MaestrosUtl[];
    exito: boolean;
    mensaje: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProyectoapiService{

    constructor(private http: HttpClient) { }


 public getAlumnos():Observable<AlumnosApiResponse>{
    return this.http.get<AlumnosApiResponse>
   ('http://127.0.0.1:5000/api/alumnos/')
}

agregarNuevoAlumno(datos:AlumnosUtl){
  return this.http.post('http://127.0.0.1:5000/alumnos',
    datos)
}
 
public getAlumno(mat:string):Observable<any>{
  console.log("matricula"+ mat)
  return this.http.get<any>(`http://127.0.0.1:5000/alumnos/${mat}`)
}
 
modificarAlumno(mat:number,datos:AlumnosUtl){
  return this.http.put('http://127.0.0.1:5000/alumnos/'+mat,datos)
}
 
public EliminaAlumno(mat:number):Observable<AlumnosUtl>{
  return this.http.delete<AlumnosUtl>('http://127.0.0.1:5000/alumnos/'+mat)
}




public getMaestros():Observable<MaestrosApiResponse>{
    return this.http.get<MaestrosApiResponse>
   ('http://127.0.0.1:5000/api/maestros/')
}

agregarNuevoMaestro(datos: MaestrosUtl){
  return this.http.post('http://127.0.0.1:5000/api/maestros/', datos)
}
 
public getMaestro(mat:string):Observable<any>{
  return this.http.get<any>(`http://127.0.0.1:5000/api/maestros/${mat}`)
}
 
modificarMaestro(mat:number,datos:MaestrosUtl){
  return this.http.put('http://127.0.0.1:5000/api/maestros/'+mat, datos)
}
 
public EliminaMaestro(mat:number):Observable<MaestrosUtl>{
  return this.http.delete<MaestrosUtl>('http://127.0.0.1:5000/api/maestros/'+mat)
}

}