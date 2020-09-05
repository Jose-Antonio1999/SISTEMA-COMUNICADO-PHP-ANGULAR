import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';
import { Comunicado } from '../class/Comunicado';
import Swal from 'sweetalert2'
import { modeloDatosEnvio } from '../lista-alumnado/lista-alumnado.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Personal } from '../class/personal';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit {

  @ViewChild('viewpass',{static:false}) viewpass:ElementRef
  verPass:boolean = false
  @ViewChild('viewpassword',{static:false}) viewpasss:ElementRef
  verPasss:boolean = false

  ListaAlumnos = Array<any>();
  data:String
  op:boolean = true
  listaMensajes = new Array<Comunicado>();
  mVacio:boolean = false
  tipo:String
  fecha:String
  asunto:String
  contenido:String
  valorBusqueda:String = ''
  mensajeVisible:boolean = true
  idDocente:String
  DatosEnvio = new Array<modeloDatosEnvio>()
  DatosEnvioBorrador = new Array<modeloDatosEnvio>()
  listaCorreosPadres = Array<any>()
  crearFormularioMensaje:FormGroup
  fecht = new Date()
  fechaActual:String
  mostrarCargando:boolean = false
  mosListaVacia:boolean = false
  habilitarGuardar:boolean
  PerfilCurrect:Personal
  opcionEscogida:String = 'lAlumnos'
  cargarId:number
  listaMensajesBorradores = new Array<Comunicado>();
  gradoSeccion = new Array<String>();
  MostrarMensajeEnviado:boolean
  MostrarMensajeAlumnos:boolean
  MostrarMensajeborrador:boolean
  MostrarBuscador:boolean = true
  Grado:String
  Seccion:String
  constructor(private inject:PeticionService, private formBuil:FormBuilder) {

    this.cargarDatosAlumnos()

    this.crearFormularioMensaje = formBuil.group({
      idEnvio:[''],
      tipo:['',Validators.required],
      para:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required]
    })

    this.inject.DatosUsuarioActual(localStorage.getItem('DNIDocente')).subscribe((respuesta)=>{
      this.PerfilCurrect = respuesta[0]
      this.idDocente = this.PerfilCurrect.id_personal
    })

    this.fechaActual = this.fecht.getDate()+"/"+ (this.fecht.getMonth()+1)+"/"+this.fecht.getFullYear()
  }
  ngOnInit(): void {

  }

  cargarDatosAlumnos(){
    this.data = localStorage.getItem('DNIDocente')
    this.inject.ListaAlumnosDocente(this.data).subscribe((res)=>{
      this.ListaAlumnos = res
      if(res.lenght==0 || res==""){
        this.MostrarMensajeAlumnos = true
      }else{
        this.MostrarMensajeAlumnos = false
        this.funcionObtenerGrado()
      }
    })
  }

  funcionObtenerGrado(){
    this.ListaAlumnos.forEach((data)=>{
      this.Grado = data.grado
      this.Seccion = data.seccion
    })

    this.gradoSeccion.push(this.Seccion)
    this.gradoSeccion.push(this.Grado)
  }

  recortarMensaje(mensaje:String):String{
    if(mensaje.length<=150){
      return mensaje;
    }else{
      return mensaje.substr(0,150);
    }
  }

  verMensaje(i:number){
    this.tipo = this.listaMensajes[i].tipo_comunicado
    this.asunto = this.listaMensajes[i].asunto
    this.contenido = this.listaMensajes[i].contenido
    this.fecha = this.listaMensajes[i].fecha
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
        this.inject.EliminarMensaje(this.listaMensajes[i].id_Comunicado).subscribe((respuesta)=>{
          //eliminar comunicado del array
          this.listaMensajes.splice(i,1);
          this.MostrarMensajeEnviado = true
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

  eliminarMensajeBorrador(i:number){
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
        this.inject.EliminarMensaje(this.listaMensajesBorradores[i].id_Comunicado).subscribe((respuesta)=>{
          //eliminar comunicado del array
          this.listaMensajesBorradores.splice(i,1);
          this.MostrarMensajeborrador = true
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

  buscarEstudiante(){
    let modeloBusquedaEs = {grados:this.gradoSeccion,nombreBuscar:this.valorBusqueda}

      this.inject.buscarEstudiante(modeloBusquedaEs as any).subscribe((res)=>{
        this.listaAlumnos = res
        if(res.length == 0){
          this.MostrarMensajeAlumnos = true
        }else{
          this.MostrarMensajeAlumnos = false
        }
      })

  }

  listaMensaje(){
    this.inject.ListaComunicadosDelDocente(this.data).subscribe((res)=>{
      if(res.length==0 || res==""){
        this.MostrarMensajeEnviado = true
      }else{
        this.listaMensajes =  res
        this.MostrarMensajeEnviado = false
      }
    })
      this.op = false
  }

  PrepararMensajeMasivo(){
    this.habilitarGuardar = false
    this.ListaAlumnos.forEach(email=>{
      this.listaCorreosPadres.push(email.email_apoderado)
    })
    this.crearFormularioMensaje.setValue({idEnvio:'', tipo:'',para:'Docentes en general',asunto:'',cuerpo:'',pass:'' })
  }

  prepararMensajeDocente(id:number,correo:String){
    this.habilitarGuardar = true
    this.crearFormularioMensaje.setValue({idEnvio:id, tipo:'',para:correo,asunto:'',cuerpo:'',pass:''})
    this.listaCorreosPadres.length = 0
  }

  enviarMensaje(){
    this.inject.DatosUsuarioActual(this.data).subscribe((respuesta)=>{
      this.DatosEnvio = respuesta
      this.DatosEnvio.push(this.crearFormularioMensaje.value)
      this.DatosEnvio.push(this.listaCorreosPadres as any)
      this.mostrarCargando = true
      this.inject.EnvioMensaje(this.DatosEnvio).subscribe((respuesta)=>{
        this.mostrarCargando = false
        if(respuesta==1){
          this.crearFormularioMensaje.reset()
          this.mostrarMensaje('success','Mensaje enviado correctamente')
        }else{
          this.mostrarMensaje('error','Mensaje no enviado, revise su contraseña de gmail')
        }
      })
      //this.DatosEnvio.length = 0
    })
  }

  enviarMensajeBorrador(){
    this.inject.DatosUsuarioActual(this.data).subscribe((respuesta)=>{
      this.DatosEnvioBorrador = respuesta
      this.DatosEnvioBorrador.push(this.crearFormularioMensaje.value)
      this.DatosEnvioBorrador.push(this.listaCorreosPadres as any)
      this.mostrarCargando = true
      this.inject.EnvioMensaje(this.DatosEnvioBorrador).subscribe((respuesta)=>{
        this.mostrarCargando = false
        if(respuesta==1){
          this.crearFormularioMensaje.reset()
          this.inject.EliminarMensaje(this.listaMensajesBorradores[this.cargarId].id_Comunicado).subscribe((respuesta)=>{
            //eliminar comunicado del array
            this.listaMensajesBorradores.splice(this.cargarId,1);
          })
          this.mostrarMensaje('success','Mensaje enviado correctamente')
        }else{
          this.mostrarMensaje('error','El mensaje no se envio, revice su contraseña')
        }
      })
      this.DatosEnvio.length = 0
    })
  }

  cancelar(){
    this.crearFormularioMensaje.reset()
  }

  verPassw(){
    this.viewpass.nativeElement.type = "text"
    this.verPass = true
  }

  noPassw(){
    this.viewpass.nativeElement.type = "password"
    this.verPass = false
  }

  verPassword(){
    this.viewpasss.nativeElement.type = "text"
    this.verPasss = true
  }

  noPassword(){
    this.viewpasss.nativeElement.type = "password"
    this.verPasss = false
  }
  //opciones para el switch
  listaAlumnos(){
    this.cargarDatosAlumnos()
    this.MostrarBuscador = true
    this.opcionEscogida = "lAlumnos"
  }

  listaEnviados(){
    this.listaMensaje()
    this.MostrarBuscador = false
    this.opcionEscogida = "lEnviados"
  }

  listaBorradores(){
    this.MostrarBuscador = false
    this.inject.ListaComunicadosBorradores(this.idDocente).subscribe((res)=>{
      this.listaMensajesBorradores = res
      if(res.length==0 || res==""){
        this.MostrarMensajeborrador = true
      }else{
        this.MostrarMensajeborrador = false
      }
    })
    this.opcionEscogida = "lBorrador"
  }

  GuardarBorradorDocente(){
    this.inject.GuardarBorrador(this.crearFormularioMensaje.value).subscribe((res)=>{
      if(res==1){
        this.mostrarMensaje('success','Comunicado guardado como borrador')
      }else{
        this.mostrarMensaje('error','Mensaje no guardado como borrador')
      }
    })
  }

  cargarDatos(i:number){
    this.cargarId = i
    this.crearFormularioMensaje.setValue({
      idEnvio:this.listaMensajesBorradores[i].id_Comunicado,
      tipo:this.listaMensajesBorradores[i].tipo_comunicado,
      para:this.listaMensajesBorradores[i].Destino,
      asunto:this.listaMensajesBorradores[i].asunto,
      cuerpo:this.listaMensajesBorradores[i].contenido,
      pass:''
    })
  }

  guardarMessage(){
    this.inject.ActualizarComunicado(this.crearFormularioMensaje.value).subscribe((res)=>{
      if(res==1){
        this.listaMensajesBorradores[this.cargarId].tipo_comunicado = this.crearFormularioMensaje.value.tipo
        this.listaMensajesBorradores[this.cargarId].Destino =  this.crearFormularioMensaje.value.para
        this.listaMensajesBorradores[this.cargarId].asunto =  this.crearFormularioMensaje.value.asunto
        this.listaMensajesBorradores[this.cargarId].contenido = this.crearFormularioMensaje.value.cuerpo
        this.mostrarMensaje('success','Mensaje guardado correctamente')
      }else{
        this.mostrarMensaje('error','El mensaje nose guardo')
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
