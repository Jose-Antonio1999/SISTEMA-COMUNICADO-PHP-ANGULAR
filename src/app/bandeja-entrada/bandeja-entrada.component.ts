import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceMensajeService } from '../Service/service-mensaje.service';
import { PeticionService } from '../Service/peticion.service';
import { Comunicado } from '../class/Comunicado';
@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  listaMensajes = new Array<Comunicado>();
  mVacio:boolean = false
  constructor(private snackBar: MatSnackBar, private inject:ServiceMensajeService, private injectM:PeticionService) {
    this.injectM.ListaComunicados().subscribe((res)=>{
        if(res==""){
          this.mVacio = true
        }else{
          this.listaMensajes = res
        }
    })
  }

  ngOnInit(): void {
  }

}
