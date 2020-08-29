import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { from } from 'rxjs';
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
  DatosEnvio = new Array<modeloDatosEnvio>()
  mostrarCargando:boolean = false
  mostrarMensajeSucces:boolean = false
  mostrarMensajeDanger:boolean = false
  estutor:boolean = false
  listaCorreosPersonalDocente = Array<any>()
  listaSeccion = new Array<string>();
  listaGrado = new Array<string>();
  GradoSeccion = new Array<any>()

  idActualizar:number
  crearFormularioActualiza:FormGroup
  Mmensaje:boolean = false
  MmensajeFaild:boolean = false
  constructor(private inject:PeticionService, private ruta:Router, private formBuil:FormBuilder) {

    this.inject.ListaPersonal().subscribe((res)=>{
      this.listaPersonal = res
    })

    this.inject.listaGrados().subscribe((res)=>{
      this.GradoSeccion = res
      this.filtrarSeccion()
      this.filtrarGrado()
    })

    this.crearFormularioMensaje = formBuil.group({
      tipo:['',Validators.required],
      para:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required]
    })

    this.crearFormularioActualiza = formBuil.group({
      id_personal:[''],
      grado:['',],
      seccion:['',],
      tipoPersonal:['',Validators.required],
      dni:['',Validators.required],
      nombre:['',Validators.required],
      apellidoP:['',Validators.required],
      apellidoM:['',Validators.required],
      correo:['',Validators.required],
      celular:['',Validators.required]
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

  mandaraActualizar(i:number){
    this.idActualizar = i
    this.crearFormularioActualiza.setValue({
      id_personal:this.listaPersonal[i].id_personal,
      grado:'',
      seccion:'',
      tipoPersonal:this.listaPersonal[i].id_tipo_personal,
      dni:this.listaPersonal[i].DNI_personal,
      nombre:this.listaPersonal[i].nombre_personal,
      apellidoP:this.listaPersonal[i].apellidoPaterno_personal,
      apellidoM:this.listaPersonal[i].apellidoMaterno_personal,
      correo:this.listaPersonal[i].email_personal,
      celular:this.listaPersonal[i].celular_personal
    })
  }

  actualizarDatos(){
    this.listaPersonal[this.idActualizar].tipo_personal = this.crearFormularioActualiza.value.tipoPersonal
    this.listaPersonal[this.idActualizar].DNI_personal = this.crearFormularioActualiza.value.dni
    this.listaPersonal[this.idActualizar].nombre_personal = this.crearFormularioActualiza.value.nombre
    this.listaPersonal[this.idActualizar].apellidoPaterno_personal = this.crearFormularioActualiza.value.apellidoP
    this.listaPersonal[this.idActualizar].apellidoMaterno_personal = this.crearFormularioActualiza.value.apellidoM
    this.listaPersonal[this.idActualizar].email_personal = this.crearFormularioActualiza.value.correo
    this.listaPersonal[this.idActualizar].celular_personal = this.crearFormularioActualiza.value.celular

    this.inject.ActualizarPersonal(this.crearFormularioActualiza.value).subscribe((res)=>{
      if(res==1){
        this.Mmensaje = true
        setTimeout(() => {
          this.Mmensaje = false
        }, 2000);
      }else{
        this.MmensajeFaild = true
        setTimeout(() => {
          this.MmensajeFaild = false
        }, 2000);
      }
    })

  }

  filtrarSeccion(){
    for(var i = 0; i<this.GradoSeccion.length; i++){
      this.listaSeccion.push(this.GradoSeccion[i].seccion)
    }
    this.listaSeccion = Array.from(new Set(this.listaSeccion))
  }

  filtrarGrado(){
    for(var i = 0; i<this.GradoSeccion.length; i++){
      this.listaGrado.push(this.GradoSeccion[i].grado)
    }
    this.listaGrado = Array.from(new Set(this.listaGrado))
  }

  Tutor(){
    this.estutor = true
  }

  NoTutor(){
    this.estutor = false
  }


}
