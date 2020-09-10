import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { GradoSeccion } from '../class/grados';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Consulta } from '../class/Consulta';
import { Router } from '@angular/router';
import { ServiceMensajeService } from '../Service/service-mensaje.service';
import { Personal } from '../class/personal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro-personal',
  templateUrl: './registro-personal.component.html',
  styleUrls: ['./registro-personal.component.css']
})
export class RegistroPersonalComponent implements OnInit {
  GradoSeccion = new Array<GradoSeccion>()
  newGradoSeccion = new Array<GradoSeccion>()
  listaSeccion = new Array<string>();
  listaGrado = new Array<string>();
  datosPersonales = new Array<Consulta>()
  obtenerDNI:String
  crearFormulario: FormGroup
  primerRegistro:boolean
  estutor:boolean = false
  consultaData:Consulta
  personal:Personal
  mMensaje:boolean = false
  constructor(private inject:PeticionService,
    private formbuilder:FormBuilder,
    private ruta:Router,
    private men:ServiceMensajeService,
    private spinner: NgxSpinnerService) {
      this.crearFormulario = this.formbuilder.group({
        grado:[''],
        seccion:[''],
        tipoPersonal:['',Validators.required],
        dni:['',[Validators.required,Validators.maxLength(8),Validators.pattern(/^([0-9])*$/)]],
        nombre:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
        apellidoP:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
        apellidoM:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
        correo:['',[Validators.required,Validators.email]],
        celular:['',[Validators.required,Validators.pattern(/^([0-9])*$/)]]
      })
      this.inject.listaGrados().subscribe((res)=>{
        this.GradoSeccion = res
      })
  }

  ngOnInit(): void {
  }
  Tutor(){
    this.estutor = true
    this.filtrarSeccion()
    this.filtrarGrado()
  }
  NoTutor(){
    this.estutor = false
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
  GuardarDatos(){
    this.inject.insertarPersonal(this.crearFormulario.value).subscribe((res)=>{
      this.spinner.show();
      setTimeout(() => {
        if(res==1){
          this.crearFormulario.reset()
          this.ruta.navigateByUrl('Login');
        }else{
          this.mMensaje = true
        }
        this.spinner.hide();
      }, 2000);
    })
  }
  cancelar(){
    this.crearFormulario.reset()
  }
  llenarDatos(){
    if(this.crearFormulario.value.dni.length==8){
      this.inject.APIdni(this.crearFormulario.value.dni).subscribe((res)=>{
        this.consultaData = res
        this.crearFormulario.controls['nombre'].setValue(this.consultaData.name);
        this.crearFormulario.controls['apellidoP'].setValue(this.consultaData.first_name);
        this.crearFormulario.controls['apellidoM'].setValue(this.consultaData.last_name);
      })
    }
  }
}
