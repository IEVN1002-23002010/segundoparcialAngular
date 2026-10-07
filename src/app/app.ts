import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  title = 'web-app';
 
    ngOnInit(): void {
      initFlowbite();
  }
}


