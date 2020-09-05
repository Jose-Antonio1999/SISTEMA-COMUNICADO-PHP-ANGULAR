import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { from } from 'rxjs';
import { Alumnado } from '../class/Alumnado';
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

  @ViewChild('passw',{static:true}) passw:ElementRef
  verPass:boolean = false

  listaPersonal = new Array<any>();
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
  fecht = new Date()
  fechaActual:String
  idActualizar:number
  crearFormularioActualiza:FormGroup
  MmensajeBusqueda:boolean = false
  Mmensaje:boolean = false
  MmensajeFaild:boolean = false
  valor:String
  idDuenioMensaje:number //id del dueño del mensaje borrador
  mostrarButtonGuardarBorrador:boolean
  valorMensaje:String
  valorBusqueda:String = ''
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
      idEnvio:[''],
      tipo:['',Validators.required],
      para:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required]
    })

    this.crearFormularioActualiza = formBuil.group({
      id_Tutor:[''],
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
    this.fechaActual = this.fecht.getDate()+"/"+ (this.fecht.getMonth()+1)+"/"+this.fecht.getFullYear()
  }

  ngOnInit(): void {
    this.idDuenioMensaje = this.inject.Usuario.id_personal
  }

  PrepararMensajeMasivo(){
    this.mostrarButtonGuardarBorrador = false
    this.listaPersonal.forEach((email)=>{
      if(email.tipoPersonal!='Secretaria' && email.tipoPersonal!="Director"){
        this.listaCorreosPersonalDocente.push(email.email_personal)
      }
    })
    //console.log(this.listaCorreosPersonalDocente)
    this.crearFormularioMensaje.setValue({idEnvio:'', tipo:'',para:'Docentes en general',asunto:'',cuerpo:'',pass:'' })
  }

  prepararMensajeDocente(correo:String){
    this.mostrarButtonGuardarBorrador = true
    this.crearFormularioMensaje.setValue({ idEnvio:this.idDuenioMensaje, tipo:'',para:correo,asunto:'',cuerpo:'',pass:''})
    this.listaCorreosPersonalDocente.length = 0
  }

  enviarMensaje(){
    this.inject.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
      this.DatosEnvio = respuesta
      this.DatosEnvio.push(this.crearFormularioMensaje.value)
      this.DatosEnvio.push(this.listaCorreosPersonalDocente as any)
      this.mostrarCargando = true
      this.inject.EnvioMensaje(this.DatosEnvio).subscribe((respuesta)=>{
        this.mostrarCargando = false
        if(respuesta==1){
          this.crearFormularioMensaje.reset()
          this.mostrarMensaje('success','Mensaje enviado correctamente')
        }else{
          this.mostrarMensaje('error','Mensaje no enviado, revise su contraseña')
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
    if(this.listaPersonal[i].seccion!=null && this.listaPersonal[i].grado!=null){
      this.valor = "El docente es tutor"
      this.Tutor()
    }else{
      this.valor = "El docente no es tutor"
      this.NoTutor()
    }
    this.crearFormularioActualiza.setValue({
      id_Tutor:this.listaPersonal[i].id_Tutor,
      id_personal:this.listaPersonal[i].id_personal,
      grado:this.listaPersonal[i].grado,
      seccion:this.listaPersonal[i].seccion,
      tipoPersonal:this.listaPersonal[i].id_tipo_personal,
      dni:this.listaPersonal[i].DNI_personal,
      nombre:this.listaPersonal[i].nombre_personal,
      apellidoP:this.listaPersonal[i].apellidoPaterno_personal,
      apellidoM:this.listaPersonal[i].apellidoMaterno_personal,
      correo:this.listaPersonal[i].email_personal,
      celular:this.listaPersonal[i].celular_personal
    })
  }
  //funcion para guargar mensaje como borrador
  guardarMensajeBorrador(){
    this.inject.GuardarBorrador(this.crearFormularioMensaje.value).subscribe((res)=>{
      if(res==1){
        this.mostrarMensaje('success','Mensaje guardado como borrador')
        this.crearFormularioMensaje.reset()
      }else{
        this.mostrarMensaje('error','Mensaje no guardado, Algo salió mal')
      }
    })
  }

  actualizarDatos(){
    this.listaPersonal[this.idActualizar].grado = this.crearFormularioActualiza.value.grado
    this.listaPersonal[this.idActualizar].seccion = this.crearFormularioActualiza.value.seccion
    this.listaPersonal[this.idActualizar].tipo_personal = this.crearFormularioActualiza.value.tipoPersonal
    this.listaPersonal[this.idActualizar].DNI_personal = this.crearFormularioActualiza.value.dni
    this.listaPersonal[this.idActualizar].nombre_personal = this.crearFormularioActualiza.value.nombre
    this.listaPersonal[this.idActualizar].apellidoPaterno_personal = this.crearFormularioActualiza.value.apellidoP
    this.listaPersonal[this.idActualizar].apellidoMaterno_personal = this.crearFormularioActualiza.value.apellidoM
    this.listaPersonal[this.idActualizar].email_personal = this.crearFormularioActualiza.value.correo
    this.listaPersonal[this.idActualizar].celular_personal = this.crearFormularioActualiza.value.celular

    this.inject.ActualizarPersonal(this.crearFormularioActualiza.value).subscribe((res)=>{
      if(res==1){
        this.mostrarMensaje('success','Datos actualizados correctamente')
      }else{
        this.mostrarMensaje('error','Datos no actualizados')
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

  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }

  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
  }
  //funcion para buscar docente
  buscarPersonal(){
    if(this.valorBusqueda.length==1){
      this.inject.ListaPersonal().subscribe((res)=>{
        this.listaPersonal = res
        this.MmensajeBusqueda = false
      })
    }else{
      this.inject.buscarPersonal(this.valorBusqueda as any).subscribe((res)=>{
        this.listaPersonal = res
        if(res.length == 0){
          this.MmensajeBusqueda = true
        }else{
          this.listaPersonal = res
        }
      })
    }
  }
  //funcion para eliminar el personal
  eliminarPersonal(i:number,id:number){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de eliminar al Docente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.inject.EliminarPersonal(id as any).subscribe((res)=>{

          if(res==0){
            this.mostrarMensaje('error','Ocurrio un error durante el proceso')
          }else{
            this.listaPersonal.splice(i,1);
          }

        })

        swalWithBootstrapButtons.fire(
          'Docente eliminado!',
          'Docente eliminado correctamente',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El Docente no ha sido eliminado',
          'error'
        )
      }
    })
  }
  mostrarMensaje(iconMessaje:any, titleMessaje:any){
    Swal.fire({
      icon: iconMessaje,
      title: titleMessaje,
      showConfirmButton: false,
      timer: 2000
    })
  }

}
