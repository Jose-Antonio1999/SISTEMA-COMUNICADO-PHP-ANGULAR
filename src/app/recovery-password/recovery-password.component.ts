import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeticionService } from '../Service/peticion.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  crearForm:FormGroup
  mostrarMensajeError:boolean = false
  mostrarMensajeSuccess:boolean = false
  mostrarCargando:boolean = false
  mostrarVentana:boolean = true
  constructor(private formBuilder:FormBuilder, private injetc:PeticionService) {
    this.crearForm = formBuilder.group({
        email:['',[Validators.required,Validators.email]]
    })
  }

  ngOnInit(): void {
  }
  enviar(){
    this.mostrarCargando = true
    this.injetc.recoveryPassword(this.crearForm.value).subscribe((res)=>{
      this.mostrarCargando = false
      if(res==0){
        this.mostrarMensajeError = true
        this.crearForm.reset()
      }else{
        if(res==1){
          this.mostrarVentana = false
          this.mostrarMensajeSuccess = true
        }
      }
    })

  }

}
