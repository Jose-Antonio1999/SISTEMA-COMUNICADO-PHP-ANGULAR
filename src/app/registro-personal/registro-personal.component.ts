import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { GradoSeccion } from '../class/grados';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Consulta } from '../class/Consulta';
import { Router } from '@angular/router';
import { ServiceMensajeService } from '../Service/service-mensaje.service';
import { Personal } from '../class/personal';

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

  personal:Personal
  constructor(private inject:PeticionService, private formbuilder:FormBuilder, private ruta:Router, private men:ServiceMensajeService) {
      this.crearFormulario = this.formbuilder.group({
        grado:['',Validators.required],
        seccion:['',Validators.required],
        tipoPersonal:['',Validators.required],
        dni:['',Validators.required],
        nombre:['',Validators.required],
        apellidoP:['',Validators.required],
        apellidoM:['',Validators.required],
        correo:['',Validators.required],
        celular:['',Validators.required]
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
  llenarDatos(){
    if(this.crearFormulario.value.dni.length == 8){
      this.inject.leerUsuarioDni(this.crearFormulario.value.dni).subscribe((res)=>{
        this.datosPersonales.push(res)
        this.crearFormulario = this.formbuilder.group({
          grado:[this.crearFormulario.value.grado,Validators.required],
          seccion:[this.crearFormulario.value.seccion,Validators.required],
          tipoPersonal:[this.crearFormulario.value.tipoPersonal,Validators.required],
          dni:[this.datosPersonales[0].dni,Validators.required],
          nombre:[this.datosPersonales[0].nombres,Validators.required],
          apellidoP:[this.datosPersonales[0].apellidoPaterno,Validators.required],
          apellidoM:[this.datosPersonales[0].apellidoMaterno,Validators.required],
          correo:['',Validators.required],
          celular:['',Validators.required]
        })
      })
    }
  }
  GuardarDatos(){
    this.inject.insertarPersonal(this.crearFormulario.value).subscribe((res)=>{
      console.log(res)
      this.crearFormulario.reset()
    })
  }
}
