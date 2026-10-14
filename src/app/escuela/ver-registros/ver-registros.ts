import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICine } from '../cine';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  selector: 'app-ver-registros',
  templateUrl: './ver-registros.html',
})
export class VerRegistros implements OnInit {
  compras: ICine[] = [];
  indiceEdicion: number = -1;
  mostrarModal: boolean = false;
  mensajeErrorModal: string = '';

  formEdicion!: FormGroup;

  ngOnInit(): void {
    this.cargarRegistros();

    this.formEdicion = new FormGroup({
      Nombre: new FormControl(''),
      CantidadC: new FormControl(0),
      Tarjeta: new FormControl(false),
      CantidadB: new FormControl(0)
    });
  }



  cargarRegistros(): void {
    const datos = localStorage.getItem('compras_cine');
    if (datos) {
      this.compras = JSON.parse(datos);
    }
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('compras_cine', JSON.stringify(this.compras));
  }

  eliminarRegistro(index: number): void {
    this.compras.splice(index, 1);
    this.guardarEnLocalStorage();
  }



  
  abrirEditar(index: number): void {
    this.indiceEdicion = index;
    const registro = this.compras[index];
    this.mensajeErrorModal = '';

    this.formEdicion.patchValue({
      Nombre: registro.Nombre,
      CantidadC: registro.CantidadC,
      Tarjeta: registro.Tarjeta,
      CantidadB: registro.CantidadB
    });

    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.indiceEdicion = -1;
  }



  actualizarRegistro(): void {
    const cantidadCompradores = Number(this.formEdicion.value.CantidadC);
    const cantidadBoletos = Number(this.formEdicion.value.CantidadB);
    const tieneTarjeta = Boolean(this.formEdicion.value.Tarjeta);
    const nombre = this.formEdicion.value.Nombre;

    if (!nombre || cantidadCompradores <= 0 || cantidadBoletos <= 0) {
      this.mensajeErrorModal = 'Llena todos los campos correctamente.';
      return;
    }


    
    const limiteBoletos = cantidadCompradores * 7;
    if (cantidadBoletos > limiteBoletos) {
      this.mensajeErrorModal = `El máximo para ${cantidadCompradores} comprador(es) es ${limiteBoletos} boletos.`;
      return;
    }


    const precioBoleto = 12;
    let totalBruto = cantidadBoletos * precioBoleto;
    let descuentoPorCantidad = 0;

    if (cantidadBoletos > 5) {
      descuentoPorCantidad = totalBruto * 0.15;
    } else if (cantidadBoletos >= 3 && cantidadBoletos <= 5) {
      descuentoPorCantidad = totalBruto * 0.10;
    }

    let subtotal = totalBruto - descuentoPorCantidad;
    let descuentoTarjeta = tieneTarjeta ? subtotal * 0.10 : 0;
    const totalPagar = subtotal - descuentoTarjeta;

    this.compras[this.indiceEdicion] = {
      Nombre: nombre,
      CantidadC: cantidadCompradores,
      Tarjeta: tieneTarjeta,
      CantidadB: cantidadBoletos,
      Total: totalPagar
    };

    this.guardarEnLocalStorage();
    this.cerrarModal();
  }
}