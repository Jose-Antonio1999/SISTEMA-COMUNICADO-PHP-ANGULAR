import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  UsuarioDatoCorrecto:boolean = false
  title = 'SISTEMA-COMUNICADO-ANGULAR-PHP';
  usuario:string = "joseantonio"
  constructor(){

  }
}
