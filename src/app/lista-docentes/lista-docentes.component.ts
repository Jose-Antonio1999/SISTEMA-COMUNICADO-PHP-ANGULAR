import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GradoSeccion } from '../class/grados';
import { Consulta } from '../class/Consulta';

@Component({
  selector: 'app-lista-docentes',
  templateUrl: './lista-docentes.component.html',
  styleUrls: ['./lista-docentes.component.css']
})
export class ListaDocentesComponent implements OnInit {
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
  nuevoRegistro:boolean = false
  anio:number
  constructor(private inject:PeticionService, private formbuilder:FormBuilder, private ruta:Router) {
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
    })
  }
  opNuevoDocente(){
    this.nuevoRegistro = true
  }
  opListaDocente(){
    this.nuevoRegistro = false
  }

}
