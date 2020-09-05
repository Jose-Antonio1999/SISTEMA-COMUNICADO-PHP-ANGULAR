import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Personal } from '../class/personal';
import { GradoSeccion } from '../class/grados';
import Swal from 'sweetalert2'

export interface modeloDatosEnvio{
  dni:String,
  nombre:String,
  apellidoP:String,
  apellidoM:String,
  email:String,
  tipoPersonal:String
  listaCorreos:Array<String>
}

export interface modeloBusqueda{
  grados: Array<any>
  nombreBuscar:String
}

@Component({
  selector: 'app-lista-alumnado',
  templateUrl: './lista-alumnado.component.html',
  styleUrls: ['./lista-alumnado.component.css']
})
export class ListaAlumnadoComponent implements OnInit {
  @ViewChild('passw',{static:true}) passw:ElementRef
  verPass:boolean = false

  listaGeneral = new Array<Alumnado>();
  gradoSeccion = new Array<String>();
  listaVacia:boolean = false
  crearFormularioMensaje:FormGroup
  mostrarCargando:boolean = false
  mostrarMensajeSucces:boolean = false
  mostrarMensajeDanger:boolean = false
  listaCorreosPadres = Array<any>()
  DatosUsuarioActual = Array<Personal>()
  DatosEnvio = new Array<modeloDatosEnvio>()
  fechaActual:String
  fecht = new Date()
  GradoSeccion = new Array<GradoSeccion>()
  listaSeccion = new Array<string>();
  listaGrado = new Array<string>();
  crearFormulario:FormGroup
  Mcorrecto:boolean
  mVacio:boolean = false
  idArray:number
  mensaje:string
  guardarBorrador:boolean
  idDuenioMensaje:number
  valorBusqueda:String = ''
  constructor(private inject:PeticionService, private formBuil:FormBuilder) {
    this.gradoSeccion.push(localStorage.getItem('seccionAlumno'))
    this.gradoSeccion.push(localStorage.getItem('gradoAlumno'))

    this.inject.listaPorGradoSeccion(this.gradoSeccion).subscribe((res)=>{
      this.listaGeneral = res
      if(this.listaGeneral.length==0){
        this.listaVacia = true
      }
    })

    this.crearFormulario = formBuil.group({
      id_alumno:[''],
      id_apoderado:[''],
      grado:['',Validators.required],
      seccion:['',Validators.required],
      dni_apoderado:['',[Validators.required,Validators.pattern(/^([0-9])*$/)]],
      nombre_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      correo_apoderado:['',[Validators.required,Validators.email]],
      celular_apoderado:['',[Validators.required,Validators.maxLength(9),Validators.pattern(/^([0-9])*$/)]],

      dni_estudiante:['',[Validators.required,Validators.maxLength(8),Validators.pattern(/^([0-9])*$/)]],
      nombre_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
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

    this.fechaActual = this.fecht.getDate()+"/"+ (this.fecht.getMonth()+1)+"/"+this.fecht.getFullYear()
  }

  ngOnInit(): void {
    this.idDuenioMensaje = this.inject.Usuario.id_personal
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

  PrepararMensajeMasivo(){
    this.guardarBorrador = false
    this.listaGeneral.forEach((email)=>{
      this.listaCorreosPadres.push(email.email_apoderado)
    })
    this.crearFormularioMensaje.setValue({idEnvio:'', tipo:'',para:'Docentes en general',asunto:'',cuerpo:'',pass:'' })
  }

  prepararMensajePadre(correo:String){
    this.guardarBorrador =  true
    this.crearFormularioMensaje.setValue({idEnvio:this.idDuenioMensaje,tipo:'',para:correo,asunto:'',cuerpo:'',pass:''})
    this.listaCorreosPadres.length = 0
  }

  enviarMensaje(){

    this.inject.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
      this.DatosEnvio = respuesta
      this.DatosEnvio.push(this.crearFormularioMensaje.value)
      this.DatosEnvio.push(this.listaCorreosPadres as any)
      this.mostrarCargando = true

      this.inject.EnvioMensaje(this.DatosEnvio).subscribe((respuesta)=>{
        this.mostrarCargando = false
        if(respuesta==1){
          this.crearFormularioMensaje.reset()
          this.mostrarMensaje('success','Email enviado correctamente')
        }else{
          this.mostrarMensaje('error','Email no enviado, revise su contraseña')
        }
      })
      this.DatosEnvio.length = 0
    })

  }

  cancelar(){
    this.crearFormularioMensaje.reset()
  }

  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }
  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
  }

  CargaractualizarDatosAlumno(id:number){
    this.idArray = id
    this.crearFormulario.setValue({
      id_alumno:this.listaGeneral[id].id_alumno,
      id_apoderado:this.listaGeneral[id].id_apoderado,
      grado:this.listaGeneral[id].grado,
      seccion:this.listaGeneral[id].seccion,
      dni_apoderado:this.listaGeneral[id].DNI_apoderado,
      nombre_apoderado:this.listaGeneral[id].nombre_apoderado,
      apellidoP_apoderado:this.listaGeneral[id].apellidoPaterno_apoderado,
      apellidoM_apoderado:this.listaGeneral[id].apellidoMaterno_apoderado,
      correo_apoderado:this.listaGeneral[id].email_apoderado,
      celular_apoderado:this.listaGeneral[id].celular_apoderado,
      dni_estudiante:this.listaGeneral[id].DNI_alumno,
      nombre_estudiante:this.listaGeneral[id].nombre_alumno,
      apellidoP_estudiante:this.listaGeneral[id].apellidoPaterno_alumno,
      apellidoM_estudiante:this.listaGeneral[id].apellidoMaterno_alumno
    })
  }
  //funcion para guargar mensaje como borrador
  guardarMensajeBorrador(){
      this.inject.GuardarBorrador(this.crearFormularioMensaje.value).subscribe((res)=>{
        if(res==1){
          this.mostrarMensaje('success','Email guardado como borrador correctamente')
        }else{
          this.mostrarMensaje('error','Email no ha sido guardado como borrador')
        }
      })
  }

  updateinArray(){

    this.listaGeneral[this.idArray].grado = this.crearFormulario.value.grado
    this.listaGeneral[this.idArray].seccion = this.crearFormulario.value.seccion
    this.listaGeneral[this.idArray].nombre_alumno = this.crearFormulario.value.nombre_estudiante
    this.listaGeneral[this.idArray].apellidoPaterno_alumno = this.crearFormulario.value.apellidoP_estudiante
    this.listaGeneral[this.idArray].apellidoMaterno_alumno = this.crearFormulario.value.apellidoM_estudiante
    this.listaGeneral[this.idArray].nombre_apoderado = this.crearFormulario.value.nombre_apoderado
    this.listaGeneral[this.idArray].apellidoPaterno_apoderado = this.crearFormulario.value.apellidoP_apoderado
    this.listaGeneral[this.idArray].apellidoMaterno_apoderado = this.crearFormulario.value.apellidoM_apoderado
    this.listaGeneral[this.idArray].email_apoderado = this.crearFormulario.value.correo_apoderado
    this.listaGeneral[this.idArray].celular_apoderado = this.crearFormulario.value.celular_apoderado

  }

  updateEstudiante(){

    this.inject.ActualizarEstudiante(this.crearFormulario.value).subscribe((res)=>{
      if(res==1){
        this.updateinArray()
        this.mostrarMensaje('success','Datos actualizados correctamente')
      }else{
        this.mostrarMensaje('error','Datos no actualizados')
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

  eliminarEstudent(i:number,id:number){
    Swal.fire({
      title: '¿Desea eliminar al estudiante?',
      text: "Se eliminarán todo los datos del estudiante!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.inject.EliminarEstudiante(id as any).subscribe((res)=>{
          console.log(res)
          this.listaGeneral.splice(i,1);
        })
        Swal.fire(
          'Estudiante eliminado!',
          'se ha eliminado el estudiante.',
          'success'
        )
      }
    })
  }

  buscarEstudiante(){

    let modeloBusqueda = {grados:this.gradoSeccion,nombreBuscar:this.valorBusqueda}

    if(this.valorBusqueda.length==1){
      this.inject.listaPorGradoSeccion(this.gradoSeccion).subscribe((res)=>{
        this.listaGeneral = res
        this.mVacio = false
      })
    }else{
      this.inject.buscarEstudiante(modeloBusqueda as any).subscribe((res)=>{
        this.listaGeneral = res
        if(res.length == 0){
          this.mVacio = true
        }else{
          this.mVacio = res
          this.mVacio = false
        }
      })

    }
  }

}
