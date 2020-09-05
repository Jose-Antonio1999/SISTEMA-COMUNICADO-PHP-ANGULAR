import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Comunicado } from '../class/Comunicado';
import Swal from 'sweetalert2'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { modeloDatosEnvio } from '../lista-alumnado/lista-alumnado.component';
import { Personal } from '../class/personal';

@Component({
  selector: 'app-lista-borradores',
  templateUrl: './lista-borradores.component.html',
  styleUrls: ['./lista-borradores.component.css']
})
export class ListaBorradoresComponent implements OnInit {
  @ViewChild('passw',{static:true}) passw:ElementRef
  verPass:boolean = false
  mostrarCargando:boolean = false
  mostrarMensajeSucces:boolean = false
  mostrarMensajeDanger:boolean = false
  listaBorradores = Array<Comunicado>()
  listaCorreos = Array<Comunicado>()
  DatosEnvio = new Array<modeloDatosEnvio>()
  Mmensaje:boolean
  fecht = new Date()
  fechaActual:String
  crearFormularioMensaje:FormGroup
  valorMensaje:String
  cargarId:number
  valorBusqueda:String =''
  idDirector:String
  PerfilCurrect:Personal
  constructor(private inject:PeticionService, private formBuil:FormBuilder) {
    this.inject.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
      this.PerfilCurrect = respuesta[0]
      this.idDirector = this.PerfilCurrect.id_personal
    })

    this.inject.ListaComunicadosBorradores(this.idDirector).subscribe((res)=>{
      this.listaBorradores = res
      if(res.length==0){
        this.Mmensaje = true
      }
    })

    this.crearFormularioMensaje = formBuil.group({
      idEnvio:[''],
      tipo:['',Validators.required],
      para:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required]
    })
    this.fechaActual = this.fecht.getDate()+"/"+ (this.fecht.getMonth()+1)+"/"+this.fecht.getFullYear()
  }

  ngOnInit(): void {
  }

  recortarMensaje(mensaje:String):String{
    if(mensaje.length<=150){
      return mensaje;
    }else{
      return mensaje.substr(0,150);
    }
  }

  cargarDatos(i:number){
    this.cargarId = i
    this.crearFormularioMensaje.setValue({
      idEnvio:this.listaBorradores[i].id_Comunicado,
      tipo:this.listaBorradores[i].tipo_comunicado,
      para:this.listaBorradores[i].Destino,
      asunto:this.listaBorradores[i].asunto,
      cuerpo:this.listaBorradores[i].contenido,
      pass:''
    })
  }

  enviarMensaje(){
    this.inject.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
      this.DatosEnvio = respuesta
      this.DatosEnvio.push(this.crearFormularioMensaje.value)
      this.DatosEnvio.push(this.listaCorreos as any)
      this.mostrarCargando = true
      this.inject.EnvioMensaje(this.DatosEnvio).subscribe((respuesta)=>{
        this.mostrarCargando = false
        if(respuesta==1){
          this.crearFormularioMensaje.reset()
          this.inject.EliminarMensaje(this.listaBorradores[this.cargarId].id_Comunicado).subscribe((respuesta)=>{
            //eliminar comunicado del array
            this.listaBorradores.splice(this.cargarId,1);
          })
          this.mostrarMensaje('success','Mensaje enviado correctamente')
        }else{
          this.mostrarMensaje('error','El mensaje no se envio, revice su contraseña')
        }
      })
      this.DatosEnvio.length = 0
    })
  }

  guardarMessage(){

    this.inject.ActualizarComunicado(this.crearFormularioMensaje.value).subscribe((res)=>{
      if(res==1){
        this.listaBorradores[this.cargarId].tipo_comunicado = this.crearFormularioMensaje.value.tipo
        this.listaBorradores[this.cargarId].Destino =  this.crearFormularioMensaje.value.para
        this.listaBorradores[this.cargarId].asunto =  this.crearFormularioMensaje.value.asunto
        this.listaBorradores[this.cargarId].contenido = this.crearFormularioMensaje.value.cuerpo
        this.mostrarMensaje('success','Mensaje guardado correctamente')
      }else{
        this.mostrarMensaje('error','El mensaje nose guardo')
      }
    })
  }

  eliminarMensaje(i:number){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de eliminar el comunicado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        //eliminar comunicado de la base de datos
        this.inject.EliminarMensaje(this.listaBorradores[i].id_Comunicado).subscribe((respuesta)=>{
          //eliminar comunicado del array
          this.listaBorradores.splice(i,1);
        })

        swalWithBootstrapButtons.fire(
          'Comunicado eliminado!',
          'Su comunicado a sido eliminado',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu comunicado no ha sido eliminado',
          'error'
        )
      }
    })

  }

  buscarMensajeDos(){
    if(this.valorBusqueda.length==1){
      this.inject.ListaComunicadosBorradores(this.idDirector).subscribe((res)=>{
        this.listaBorradores = res
        this.Mmensaje = false
      })
    }else{
      this.inject.buscarComunicadoBorrador(this.valorBusqueda as any).subscribe((res)=>{
        this.listaBorradores = res
        if(res.length == 0){
          this.Mmensaje = true
        }else{
          this.listaBorradores = res
        }
      })
    }
  }

  cancelar(){
    this.crearFormularioMensaje.reset()
  }

  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }

  mostrarMensaje(iconMessaje:any, titleMessaje:any){
    Swal.fire({
      icon: iconMessaje,
      title: titleMessaje,
      showConfirmButton: false,
      timer: 2000
    })
  }

  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
  }

}
