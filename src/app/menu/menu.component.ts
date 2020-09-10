import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceMensajeService } from '../Service/service-mensaje.service';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('passw',{static:true}) passw:ElementRef
  verPass:boolean = false
  Perfil:Personal
  NombreUserCurrent:String
  data:String
  editpass:boolean = false
  editdata:boolean = false
  crearFormularioDatos:FormGroup
  crearFormularioPass:FormGroup
  constructor(
    public dialog: MatDialog,
    private ruta:Router,
    private spinner: NgxSpinnerService,
    private me:ServiceMensajeService,
    private inject:PeticionService,
    private formBuilde:FormBuilder) {

      if(localStorage.getItem('userDoc')==null || localStorage.getItem('userDoc')==""){
        this.ruta.navigateByUrl('Login');
      }else{
        this.data = localStorage.getItem('DNIDocente')
        this.inject.DatosUsuarioActual(this.data).subscribe((res)=>{
          this.Perfil= res[0] as Personal
        })
      }

  }
  ngOnInit(): void {
    this.crearFormularioDatos = this.formBuilde.group({
      dni:[this.data],
      celular:['',[Validators.pattern(/^([0-9])*$/),Validators.maxLength(9),Validators.minLength(9)]],
      email:['',Validators.email]
    })
    this.crearFormularioPass = this.formBuilde.group({
      dnis:[this.data],
      primero:['',[Validators.required,Validators.maxLength(20),Validators.minLength(8)]],
      segundo:['',[Validators.required,Validators.maxLength(20),Validators.minLength(8)]]
    })

  }

  salir(){
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        localStorage.removeItem('userDoc');
        this.ruta.navigateByUrl('')
      }, 2000);
  }

  sal(){
    this.me.mensaje("Estamos en matenimiento")
  }
  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }
  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
  }
  editData(){
    this.crearFormularioPass.reset()
    this.editdata = true
    this.editpass = false
  }
  editPass(){
    this.crearFormularioDatos.reset()
    this.editpass = true
    this.editdata = false
  }

  mostrarMensaje(iconMessaje:any, titleMessaje:any){
    Swal.fire({
      icon: iconMessaje,
      title: titleMessaje,
      showConfirmButton: false,
      timer: 2000
    })
  }

  guardarPass(){
    this.inject.cambiarPass(this.crearFormularioPass.value).subscribe((res)=>{
      if(res==1){
        this.mostrarMensaje('success','Contraseña cambiada correctamente')
        this.crearFormularioPass.reset()
        this.editpass = false
      }else{
        this.mostrarMensaje('error','Contraseña no actualizada, revise su contraseña')
      }
    })
  }

  guardarDatos(){
    this.inject.cambiarMiniDatos(this.crearFormularioDatos.value).subscribe((res)=>{
      if(res==1){
        if(this.crearFormularioDatos.value.email!=""  && this.crearFormularioDatos.value.celular!=""){
          this.Perfil.celular_personal=this.crearFormularioDatos.value.celular
          this.Perfil.email_personal=this.crearFormularioDatos.value.email
        }else{
          if(this.crearFormularioDatos.value.email!=""){
            this.Perfil.email_personal= this.crearFormularioDatos.value.email
          }
          if(this.crearFormularioDatos.value.celular!=""){
            this.Perfil.celular_personal = this.crearFormularioDatos.value.celular
          }
        }
        this.mostrarMensaje('success','Datos actualizados correctamente')
        this.crearFormularioDatos.reset()
        this.editdata = false
      }else{
        this.mostrarMensaje('warning','Ocurrió un error, complete los campos')
      }
    })
  }
}
