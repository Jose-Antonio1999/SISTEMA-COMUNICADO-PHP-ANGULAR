import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';

@Component({
  selector: 'app-panel-director',
  templateUrl: './panel-director.component.html',
  styleUrls: ['./panel-director.component.css']
})
export class PanelDirectorComponent implements OnInit {
  opcionEscogida:string = "Bsalida"
  DatosUsuario = new Array<Personal>()
  NombreUserCurrent:String
  PerfilCurrect:Personal
  nombreUser:String
  constructor(private ruta:Router,private spinner: NgxSpinnerService, private inject:PeticionService) {
    this.inject.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
      this.PerfilCurrect = respuesta[0]
      this.NombreUserCurrent = this.PerfilCurrect.nombre_personal
    })

  }

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
  ListaPadres(){
    this.opcionEscogida = "Rpadres"
  }
  ListaBorradorres(){
    this.opcionEscogida = "Lborradores"
  }
  Perfil(){
    this.opcionEscogida = "Perfil"
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
