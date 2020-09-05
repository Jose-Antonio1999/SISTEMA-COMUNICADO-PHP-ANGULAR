import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceMensajeService } from '../Service/service-mensaje.service';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  PerfilCurrect:Personal
  NombreUserCurrent:String
  data:String
  constructor(
    public dialog: MatDialog,
    private ruta:Router,
    private spinner: NgxSpinnerService,
    private me:ServiceMensajeService,
    private inject:PeticionService) {
      this.data = localStorage.getItem('DNIDocente')
      this.inject.DatosUsuarioActual(this.data).subscribe((res)=>{
        console.log(res)
      })
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  ngOnInit(): void {
  }
  salir(){
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        localStorage.removeItem('user');
        this.ruta.navigateByUrl('')
      }, 2000);
  }
  sal(){
    this.me.mensaje("Estamos en matenimiento")
  }

}
export class DialogElementsExampleDialog {}
