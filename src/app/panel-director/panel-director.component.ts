import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-panel-director',
  templateUrl: './panel-director.component.html',
  styleUrls: ['./panel-director.component.css']
})
export class PanelDirectorComponent implements OnInit {
  opcionEscogida:string = "Bsalida"
  constructor() { }

  ngOnInit(): void {
  }
  BanSalida(){
    this.opcionEscogida = "Bsalida"
  }
  Lalumnos(){
    this.opcionEscogida = "Lalumnos"
  }
  Ldocentes(){
    this.opcionEscogida = "Ldocentes"
  }


}
