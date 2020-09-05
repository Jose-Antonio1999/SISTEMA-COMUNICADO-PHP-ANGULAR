import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { modeloDatosEnvio } from '../lista-alumnado/lista-alumnado.component';

@Component({
  selector: 'app-lista-padres',
  templateUrl: './lista-padres.component.html',
  styleUrls: ['./lista-padres.component.css']
})
export class ListaPadresComponent implements OnInit {
  @ViewChild('passw',{static:true}) passw:ElementRef
  verPass:boolean = false
  listaPadres = new Array<Alumnado>();
  listaGeneral = new Array<Alumnado>();
  gradoSeccion = new Array<String>();
  DatosEnvio = new Array<modeloDatosEnvio>()
  listaCorreosPadres = new Array<Alumnado>()
  mostrarCargando:boolean = false
  mostrarMensajeSucces:boolean = false
  mostrarMensajeDanger:boolean = false
  crearFormularioMensaje:FormGroup
  Mmensaje:boolean = false
  MmensajeFaild:boolean = false
  fecht = new Date()
  fechaActual:String

  listaVacia:boolean = false
  constructor(private inject:PeticionService, private formBuil:FormBuilder) {
    this.gradoSeccion.push(localStorage.getItem('seccionAlumno'))
    this.gradoSeccion.push(localStorage.getItem('gradoAlumno'))
    this.inject.listaPorGradoSeccion(this.gradoSeccion).subscribe((resp)=>{
      this.listaPadres = resp
      if(this.listaPadres.length==0){
        this.listaVacia = true
        console.log(this.listaPadres)
      }
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
    this.listaPadres.forEach((email)=>{
        this.listaCorreosPadres.push(email.email_personal)
    })
    //console.log(this.listaCorreosPersonalDocente)
    this.crearFormularioMensaje.setValue({ tipo:'',para:'Docentes en general',asunto:'',cuerpo:'',pass:'' })
  }

  prepararMensajeDocente(correo:String){
    this.crearFormularioMensaje.setValue({ tipo:'',para:correo,asunto:'',cuerpo:'',pass:''})
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
  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }
  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
  }

}
