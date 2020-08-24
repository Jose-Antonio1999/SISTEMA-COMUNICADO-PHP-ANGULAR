import { Component } from '@angular/core';
import { PeticionService } from '../app/Service/peticion.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SISTEMA-COMUNICADO-ANGULAR-PHP';
  existeUsuario:boolean
  constructor(private inject:PeticionService, private ruta: Router){
    this.inject.verPersonalInicio().subscribe((res)=>{
      if(res == ""){
        this.existeUsuario = false
        //this.ruta.navigateByUrl("/Registro-Personal")
      }

    })
  }

}
