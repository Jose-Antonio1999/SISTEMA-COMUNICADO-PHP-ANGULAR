import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GradoSeccion } from '../class/grados';
import { Consulta } from '../class/Consulta';
import { Alumnado } from '../class/Alumnado';
import { Personal } from '../class/personal';

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
  nuevoRegistro:String = "listaDocentes"
  listaGeneral = new Array<Alumnado>();
  listaPersonal = new Array<Personal>();
  anio:number
  titleTutor:String
  esconderTittle:boolean = true
  constructor(private inject:PeticionService,
    private formbuilder:FormBuilder,
    private ruta:Router) {
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
    })
  }
  opNuevoDocente(){
    this.esconderTittle = false
    this.nuevoRegistro = "nuevoDocente"
  }
  opListaDocente(){
    this.esconderTittle = true
    this.titleTutor = ""
    this.nuevoRegistro = "listaDocentes"
  }
  opListaTutor(){
    this.esconderTittle = true
    this.titleTutor = "tutores"
    this.nuevoRegistro = "listaDocentesTutores"
  }

}
