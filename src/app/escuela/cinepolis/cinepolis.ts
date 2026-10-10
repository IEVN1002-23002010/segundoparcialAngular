import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICine } from '../cine';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})

export class Cinepolis implements OnInit {
  Cinema!: FormGroup;
  mensajeError: string = '';

  nuevaCompra: ICine = {
    Nombre: '',
    CantidadC: 0,
    Tarjeta: false,
    CantidadB: 0,
    Total: 0
  };

  ngOnInit(): void {
    this.Cinema = new FormGroup({
      Nombre: new FormControl(''),
      CantidadC: new FormControl(0),
      Tarjeta: new FormControl(false),
      CantidadB: new FormControl(0),
    });
  }

  procesarCompra(): void {
    const cantidadCompradores = this.Cinema.value.CantidadC;
    const cantidadBoletos = this.Cinema.value.CantidadB;
    const tieneTarjeta = this.Cinema.value.Tarjeta;

    const limiteBoletos = cantidadCompradores * 7;

    if (cantidadBoletos > limiteBoletos) {
      this.mensajeError = `No puedes comprar más de 7 boletos por persona. El máximo para ${cantidadCompradores} compradores es ${limiteBoletos} boletos.`;
      
      this.nuevaCompra = {
        Nombre: '',
        CantidadC: 0,
        Tarjeta: false,
        CantidadB: 0,
        Total: 0
      };
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
      Nombre: this.Cinema.value.Nombre,
      CantidadC: cantidadCompradores,
      Tarjeta: tieneTarjeta,
      CantidadB: cantidadBoletos,
      Total: totalPagar
    };
  }

}