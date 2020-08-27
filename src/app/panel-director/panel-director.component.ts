import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-panel-director',
  templateUrl: './panel-director.component.html',
  styleUrls: ['./panel-director.component.css']
})
export class PanelDirectorComponent implements OnInit {
  opcionEscogida:string = "Bsalida"
  constructor(private ruta:Router,private spinner: NgxSpinnerService) { }

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
  Rcomunicado(){
    this.opcionEscogida = "Rcomunicado"
  }
  ListaPadres(){
    this.opcionEscogida = "Rpadres"
  }

  salir(){
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        localStorage.removeItem('user');
        this.ruta.navigateByUrl('')
      }, 2000);
  }


}
