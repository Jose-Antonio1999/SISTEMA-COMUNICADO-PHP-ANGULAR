import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { modeloDatosEnvio } from '../lista-alumnado/lista-alumnado.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-padres-general',
  templateUrl: './padres-general.component.html',
  styleUrls: ['./padres-general.component.css']
})
export class PadresGeneralComponent implements OnInit {

  @ViewChild('passw',{static:true}) passw:ElementRef

  verPass:boolean = false
  mostrarMensajeSucces:boolean = false
  mostrarMensajeDanger:boolean = false
  Mvacio:boolean = false
  mostrarCargando:boolean = false

  listaCorreosPadres = new Array<any>()
  listaPadresGeneral = new Array<Alumnado>()
  DatosEnvio = new Array<modeloDatosEnvio>()

  crearFormularioMensaje:FormGroup
  fecht = new Date()
  fechaActual:String
  mVacio:boolean = false
  valorBusqueda:String = ''

  constructor(private injet:PeticionService, private formBuil:FormBuilder) {

    this.injet.PeticionGeneral().subscribe((res)=>{
      this.listaPadresGeneral = res
      if(this.listaPadresGeneral.length==0){
        this.Mvacio = true
      }
    })

    this.crearFormularioMensaje = formBuil.group({
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

  PrepararMensajeMasivo(){
    this.listaPadresGeneral.forEach((email)=>{
        this.listaCorreosPadres.push(email.email_apoderado)
    })
    //console.log(this.listaCorreosPadres)
    this.crearFormularioMensaje.setValue({ tipo:'',para:'Apoderados en general',asunto:'',cuerpo:'',pass:'' })
  }

  enviarMensaje(){
    this.injet.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
      this.DatosEnvio = respuesta
      this.DatosEnvio.push(this.crearFormularioMensaje.value)
      this.DatosEnvio.push(this.listaCorreosPadres as any)
      this.mostrarCargando = true
      this.injet.EnvioMensaje(this.DatosEnvio).subscribe((respuesta)=>{
        this.mostrarCargando = false
        if(respuesta==1){
          this.crearFormularioMensaje.reset()
          this.mostrarMensaje('success','Mensaje enviado correctamente')
        }else{
          this.mostrarMensaje('error','Mensaje no enviado, revise su contraseña de gmail')
        }
      })

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

  buscarMensajeDos(){
    if(this.valorBusqueda.length==1){
      this.injet.PeticionGeneral().subscribe((res)=>{
        if(res==""){
          this.mVacio = true
        }else{
          this.listaPadresGeneral = res
        }
    })
    }else{
      this.injet.buscarPadreGeneral(this.valorBusqueda as any).subscribe((res)=>{
        this.listaPadresGeneral = res
      })
    }
  }

}
