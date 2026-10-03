import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Zodiaco } from './formularios/zodiaco/zodiaco';
import { Navbar } from './navbar/navbar';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { Usuario } from './formularios/usuario/usuario';
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Zodiaco, Navbar, Usuario],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  title = 'web-app';
 
    ngOnInit(): void {
      initFlowbite();
  }
}


