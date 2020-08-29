import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Personal } from '../class/personal';

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
  selector: 'app-lista-alumnado',
  templateUrl: './lista-alumnado.component.html',
  styleUrls: ['./lista-alumnado.component.css']
})
export class ListaAlumnadoComponent implements OnInit {

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

  constructor(private inject:PeticionService, private formBuil:FormBuilder) {
    this.gradoSeccion.push(localStorage.getItem('seccionAlumno'))
    this.gradoSeccion.push(localStorage.getItem('gradoAlumno'))

    this.inject.listaPorGradoSeccion(this.gradoSeccion).subscribe((res)=>{
      this.listaGeneral = res
      if(this.listaGeneral.length==0){
        this.listaVacia = true
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

    this.listaGeneral.forEach((email)=>{
      this.listaCorreosPadres.push(email.email_apoderado)
    })
    this.crearFormularioMensaje.setValue({ tipo:'',para:'Docentes en general',asunto:'',cuerpo:'',pass:'' })

  }

  prepararMensajePadre(correo:String){
    this.crearFormularioMensaje.setValue({ tipo:'',para:correo,asunto:'',cuerpo:'',pass:''})
    this.listaCorreosPadres.length = 0
  }

  enviarMensaje(){

    this.inject.DatosUsuarioActual(localStorage.getItem('correoDirector')).subscribe((respuesta)=>{
      this.DatosEnvio = respuesta
      this.DatosEnvio.push(this.crearFormularioMensaje.value)
      this.DatosEnvio.push(this.listaCorreosPadres as any)
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
