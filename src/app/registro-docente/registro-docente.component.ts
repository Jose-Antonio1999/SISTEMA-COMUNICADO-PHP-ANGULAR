import { Component, OnInit } from '@angular/core';
import { GradoSeccion } from '../class/grados';
import { Consulta } from '../class/Consulta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alumnado } from '../class/Alumnado';
import { Personal } from '../class/personal';
import { PeticionService } from '../Service/peticion.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.component.html',
  styleUrls: ['./registro-docente.component.css']
})
export class RegistroDocenteComponent implements OnInit {

  listadoDocentes = new Array<number>();
  estutor:boolean = false
  GradoSeccion = new Array<GradoSeccion>()
  newGradoSeccion = new Array<GradoSeccion>()
  listaSeccion = new Array<string>();
  listaGrado = new Array<string>();
  datosPersonales = new Array<Consulta>()
  obtenerDNI:String
  crearFormulario: FormGroup
  primerRegistro:boolean
  nuevoRegistro:String = "listaDocentes"
  listaGeneral = new Array<Alumnado>();
  listaPersonal = new Array<Personal>();
  anio:number
  constructor(private inject:PeticionService,
    private formbuilder:FormBuilder,
    private ruta:Router,
    private snackBar: MatSnackBar) {

      this.listadoDocentes.push(1)
      this.listadoDocentes.push(1)
      this.listadoDocentes.push(1)
      this.listadoDocentes.push(1)
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
      this.inject.PeticionGeneral().subscribe((res)=>{
        this.listaGeneral = res
      })
      this.inject.ListaPersonal().subscribe((res)=>{
        this.listaPersonal = res
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
      console.log(res)
      this.crearFormulario.reset()
      this.snackBar.open("Datos registrados correctamente", "", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "bottom",
      });
    })
  }
  opNuevoDocente(){
    this.nuevoRegistro = "nuevoDocente"
  }
  opListaDocente(){
    this.nuevoRegistro = "listaDocentes"
  }
  opListaTutor(){
    this.nuevoRegistro = "listaDocentesTutores"
  }

}
