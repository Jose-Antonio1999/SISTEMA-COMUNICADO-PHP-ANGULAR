import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GradoSeccion } from '../class/grados';
import { PeticionService } from '../Service/peticion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private formBuilder:FormBuilder,private inject:PeticionService,private snackBar: MatSnackBar) {
    this.crearFormulario = formBuilder.group({
      grado:['',Validators.required],
      seccion:['',Validators.required],
      dni_apoderado:['',Validators.required],
      nombre_apoderado:['',Validators.required],
      apellidoP_apoderado:['',Validators.required],
      apellidoM_apoderado:['',Validators.required],
      correo_apoderado:['',Validators.required],
      celular_apoderado:['',Validators.required],

      dni_estudiante:['',Validators.required],
      nombre_estudiante:['',Validators.required],
      apellidoP_estudiante:['',Validators.required],
      apellidoM_estudiante:['',Validators.required],
      correo_estudiante:[''],
      celular_estudiante:['']
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
      console.log(res)
      this.crearFormulario.reset()
      this.snackBar.open("Registro guardado con éxito", "", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "bottom",
      });
    })
  }

}
