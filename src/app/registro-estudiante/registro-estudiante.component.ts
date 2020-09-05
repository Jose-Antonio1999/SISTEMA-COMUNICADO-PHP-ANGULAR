import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GradoSeccion } from '../class/grados';
import { PeticionService } from '../Service/peticion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {
  crearFormulario:FormGroup
  listaSeccion = new Array<string>();
  listaGrado = new Array<string>();
  GradoSeccion = new Array<GradoSeccion>()

  Mgrado:String
  Mseccion:String
  Mcorrecto:boolean = false
  constructor(private formBuilder:FormBuilder,private inject:PeticionService,private snackBar: MatSnackBar) {
    this.Mgrado = localStorage.getItem('gradoAlumno')
    this.Mseccion = localStorage.getItem('seccionAlumno')
    this.crearFormulario = formBuilder.group({
      grado:[this.Mgrado,Validators.required],
      seccion:[this.Mseccion,Validators.required],
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
  }

  ngOnInit(): void {
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

  registrar(){
    this.inject.insertarEstudiante(this.crearFormulario.value).subscribe((res)=>{

      if(res==1){
        this.mostrarMensaje('success','Estudiante registrado correctamente')
        this.crearFormulario.reset()
        this.crearFormulario.controls['grado'].setValue(this.Mgrado)
        this.crearFormulario.controls['seccion'].setValue(this.Mseccion)
      }else{
        this.mostrarMensaje('error','Ocurrio un error estudiante no registrado')
      }
    })
    this.crearFormulario.controls['grado'].setValue(this.Mgrado)
    this.crearFormulario.controls['seccion'].setValue(this.Mseccion)
  }

  cancelar(){
    this.crearFormulario.reset()
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

/*
        this.crearFormulario.controls['grado'].setValue(this.Mgrado)
        this.crearFormulario.controls['seccion'].setValue(this.Mseccion)
*/
