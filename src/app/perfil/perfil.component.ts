import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  Perfil:Personal
  formulario:FormGroup
  data:String
  editpass:boolean = false
  editdata:boolean = false
  crearFormularioDatos:FormGroup
  crearFormularioPass:FormGroup
  constructor(public inject:PeticionService, private Builder:FormBuilder) {
    this.data = localStorage.getItem('DNID')
    this.Perfil = this.inject.Usuario
    this.formulario = Builder.group({
      celular:['',[Validators.required,Validators.maxLength(9)]],
      email:['',[Validators.required,Validators.email]]
    })

    this.crearFormularioDatos = this.Builder.group({
      dni:[this.data],
      celular:['',Validators.pattern(/^([0-9])*$/)],
      email:['',Validators.email]
    })
    this.crearFormularioPass = this.Builder.group({
      dnis:[this.data],
      primero:['',[Validators.required,Validators.maxLength(20),Validators.minLength(8)]],
      segundo:['',[Validators.required,Validators.maxLength(20),Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
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
        this.mostrarMensaje('success','Datos actualizados correctamente')
        this.crearFormularioDatos.reset()
        this.editdata = false
      }else{
        this.mostrarMensaje('error','Ocurrió un error, datos no actualizados')
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
