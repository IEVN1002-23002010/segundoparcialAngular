import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Zodiaco } from './formularios/zodiaco/zodiaco';
import { initFlowbite } from 'flowbite';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Zodiaco],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  title = 'web-app';
  /*protected readonly title = signal('segundoParcialAngular');*/
 
   ngOnInit(): void {
    initFlowbite();
}
 
 
}


