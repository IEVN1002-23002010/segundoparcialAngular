import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {
  name: string = "";
  apaterno: string = "";
  amaterno: string = "";
  sexo: string = "";

  dia: string = "";
  mes: string = "";
  anio: string = "";


  edad: number = 0;
  signo: string = "";
  imagenSigno: string = "";
  mostrarResultado: boolean = false;


  imprimir() {
    const anioNacimiento = parseInt(this.anio);



    const fechaActual = new Date();
    this.edad = fechaActual.getFullYear() - anioNacimiento;



    const signoCh = [
      "Mono", "Gallo", "Perro", "Cerdo", "Rata", "Buey", 
      "Tigre", "Conejo", "Dragón", "Serpiente", "Caballo", "Cabra"
    ];
    
    const imagenes = [
      "https://www.clarin.com/2025/01/14/Xh3oEQrt2_2000x1500__1.jpg", // Mono
      "https://www.bekia.es/images/articulos/th/81000/81735-q2.jpg", // Gallo
      "https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2021/02/10/602407f6c7e16.jpeg", // Perro
      "https://tse1.mm.bing.net/th/id/OIP.FOfCqoKdIQTc2BmzAkCIywHaDp?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", // Cerdo
      "https://tse1.mm.bing.net/th/id/OIP.-UkbtBDrHLuafNMur0o3igHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", // Rata
      "https://misteriosancestrales.com/wp-content/uploads/2020/10/buey-portada.jpg", // Buey
      "https://static.vecteezy.com/system/resources/previews/073/711/475/non_2x/illustration-of-chinese-zodiac-tiger-vector.jpg", // Tigre
      "https://www.clarin.com/2023/09/23/TSN1Cvpys_2000x1500__1.jpg", // Conejo
      "https://img.freepik.com/fotos-premium/dragon-signo-zodiaco-arte-dorado-generar-ai_98402-16792.jpg", // Dragón
      "https://www.elpais.com.co/resizer/v2/U3TWJ7WZGNBPVH45ZZSGMDHMMQ.jpg?auth=a9ddb1a0167be3bc445c4f2aaa86a59681e1f6a651dc58aaa8cb4d346120868a&smart=true&quality=75&width=1280&fitfill=false", // Serpiente
      "https://i.pinimg.com/originals/b1/ab/be/b1abbe1b9de35d2309903df0362f396d.jpg", // Caballo
      "https://tse4.mm.bing.net/th/id/OIP.1SKH-t8JiQ32SU8lY3jIKgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"  // Cabra
    ];

    const selec = anioNacimiento % 12;
    this.signo = signoCh[selec];
    this.imagenSigno = imagenes[selec];

    this.mostrarResultado = true;
  }
   



}