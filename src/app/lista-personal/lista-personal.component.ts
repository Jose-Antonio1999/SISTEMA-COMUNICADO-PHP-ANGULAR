import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface modeloDatosEnvio{
  dni:String,
  nombre:String,
  apellidoP:String,
  apellidoM:String,
  email:String,
  tipoPersonal:String
  listaCorreos:Array<String>
}

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.css']
})
export class ListaPersonalComponent implements OnInit {

  listaPersonal = new Array<Personal>();
  listaDatos:Personal
  crearFormularioMensaje:FormGroup
  listaCorreosPersonalDocente = Array<any>()
  DatosEnvio = new Array<modeloDatosEnvio>()
  mostrarCargando:boolean = false
  mostrarMensajeSucces:boolean = false
  mostrarMensajeDanger:boolean = false
  constructor(private inject:PeticionService, private ruta:Router, private formBuil:FormBuilder) {

    this.inject.ListaPersonal().subscribe((res)=>{
      this.listaPersonal = res
    })

    this.crearFormularioMensaje = formBuil.group({
      tipo:['',Validators.required],
      para:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  PrepararMensajeMasivo(){
    this.listaPersonal.forEach((email)=>{
      if(email.tipoPersonal!='Secretaria' && email.tipoPersonal!="Director"){
        this.listaCorreosPersonalDocente.push(email.email_personal)
      }
    })
    //console.log(this.listaCorreosPersonalDocente)
    this.crearFormularioMensaje.setValue({ tipo:'',para:'Docentes en general',asunto:'',cuerpo:'',pass:'' })
  }

  prepararMensajeDocente(correo:String){
    this.crearFormularioMensaje.setValue({ tipo:'',para:correo,asunto:'',cuerpo:'',pass:''})
    this.listaCorreosPersonalDocente.length = 0
  }

  enviarMensaje(){
    this.inject.DatosUsuarioActual(localStorage.getItem('correoDirector')).subscribe((respuesta)=>{
      this.DatosEnvio = respuesta
      this.DatosEnvio.push(this.crearFormularioMensaje.value)
      this.DatosEnvio.push(this.listaCorreosPersonalDocente as any)
      this.mostrarCargando = true
      this.inject.EnvioMensaje(this.DatosEnvio).subscribe((respuesta)=>{
        console.log(respuesta)
        this.mostrarCargando = false
        if(respuesta==1){
          this.crearFormularioMensaje.reset()
          this.mostrarMensajeSucces = true
          setTimeout(() => {
            this.mostrarMensajeSucces = false
          }, 3000);
        }else{
          this.mostrarMensajeDanger = true
          setTimeout(() => {
            this.mostrarMensajeDanger = false
          }, 3000);
        }
      })
      this.DatosEnvio.length = 0
    })
  }

  cancelar(){
    this.crearFormularioMensaje.reset()
  }


}
