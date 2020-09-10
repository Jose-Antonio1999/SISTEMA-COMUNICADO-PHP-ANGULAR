import { Component, OnInit } from '@angular/core';
import { GradoSeccion } from '../class/grados';
import { Consulta } from '../class/Consulta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alumnado } from '../class/Alumnado';
import { Personal } from '../class/personal';
import { PeticionService } from '../Service/peticion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
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
  data:String
  consultaData:Consulta
  id_tipo_per:any
  Mcorrecto:boolean = false
  constructor(private inject:PeticionService,
    private formbuilder:FormBuilder,
    private ruta:Router,
    private snackBar: MatSnackBar) {
      //obtener el id tipo personal
      this.data = localStorage.getItem('DNID')
      this.inject.DatosUsuarioActual(this.data).subscribe((res)=>{
        this.id_tipo_per = res[0].id_tipo_personal
      })
      this.crearFormularioRegistro()
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
  crearFormularioRegistro(){
    this.crearFormulario = this.formbuilder.group({
      grado:[''],
      seccion:[''],
      tipoPersonal:['',Validators.required],
      dni:['',[Validators.required,Validators.pattern(/^([0-9])*$/)]],
      nombre:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      correo:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.pattern(/^([0-9])*$/)]]
    })
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
      if(res==1){
        this.crearFormularioRegistro()
        this.mostrarMensaje('success','Docente registrado correctamente')
      }
      if(res==-1){
        this.mostrarMensaje('warning','El Docente ya existe en el registro')
      }
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
