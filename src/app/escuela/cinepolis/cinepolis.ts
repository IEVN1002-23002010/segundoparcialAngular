import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICine } from '../cine';
import { RouterLink } from '@angular/router';


@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  selector: 'app-cinepolis',
  templateUrl: './cinepolis.html',
})
export class Cinepolis implements OnInit {
  Cinema!: FormGroup;
  mensajeError: string = '';
  compras: ICine[] = [];

  nuevaCompra: ICine = {
    Nombre: '',
    CantidadC: 0,
    Tarjeta: false,
    CantidadB: 0,
    Total: 0
  };

  ngOnInit(): void {
    this.cargarCompras();

    this.Cinema = new FormGroup({
      Nombre: new FormControl(''),
      CantidadC: new FormControl(0),
      Tarjeta: new FormControl(false),
      CantidadB: new FormControl(0),
    });
  }

  procesarCompra(): void {
    const cantidadCompradores = Number(this.Cinema.value.CantidadC);
    const cantidadBoletos = Number(this.Cinema.value.CantidadB);
    const tieneTarjeta = Boolean(this.Cinema.value.Tarjeta);
    const nombre = this.Cinema.value.Nombre;



    if (!nombre || cantidadCompradores <= 0 || cantidadBoletos <= 0) {
      this.mensajeError = 'Por favor, llena todos los campos correctamente.';
      return;
    }

    const limiteBoletos = cantidadCompradores * 7;

    if (cantidadBoletos > limiteBoletos) {
      this.mensajeError = `No puedes comprar más de 7 boletos por persona. El máximo para ${cantidadCompradores} comprador(es) es ${limiteBoletos} boletos.`;
      return; 
    }

    this.mensajeError = '';



    const precioBoleto = 12;
    let totalBruto = cantidadBoletos * precioBoleto;
    let descuentoPorCantidad = 0;

    if (cantidadBoletos > 5) {
      descuentoPorCantidad = totalBruto * 0.15;
    } else if (cantidadBoletos >= 3 && cantidadBoletos <= 5) {
      descuentoPorCantidad = totalBruto * 0.10;
    }

    let subtotal = totalBruto - descuentoPorCantidad;

    let descuentoTarjeta = 0;
    if (tieneTarjeta) {
      descuentoTarjeta = subtotal * 0.10;
    }

    const totalPagar = subtotal - descuentoTarjeta;



    this.nuevaCompra = {
      Nombre: nombre,
      CantidadC: cantidadCompradores,
      Tarjeta: tieneTarjeta,
      CantidadB: cantidadBoletos,
      Total: totalPagar
    };




    this.compras.push({ ...this.nuevaCompra });
    localStorage.setItem('compras_cine', JSON.stringify(this.compras));

    this.limpiarCampos();
  }

  cargarCompras(): void {
    const datos = localStorage.getItem('compras_cine');
    if (datos) {
      this.compras = JSON.parse(datos);
    }
  }

  eliminarCompra(index: number): void {
    this.compras.splice(index, 1);
    localStorage.setItem('compras_cine', JSON.stringify(this.compras));
  }




  limpiarCampos(): void {
    this.nuevaCompra = {
      Nombre: '',
      CantidadC: 0,
      Tarjeta: false,
      CantidadB: 0,
      Total: 0
    };
    this.Cinema.patchValue({
      Nombre: '',
      CantidadC: 0,
      Tarjeta: false,
      CantidadB: 0
    });
  }
}