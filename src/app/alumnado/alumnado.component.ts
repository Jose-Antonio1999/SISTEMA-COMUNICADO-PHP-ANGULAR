import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumnado',
  templateUrl: './alumnado.component.html',
  styleUrls: ['./alumnado.component.css']
})
export class AlumnadoComponent implements OnInit {

  escogeOption:String = "listaAlumno"
  listatutores = new Array<number>();
  tipoComunicado = new Array<string>();
  vistaAlumnos:boolean = true
  grado:String
  seccion:String
  constructor() {
    this.seccion = localStorage.getItem('seccionAlumno')
    this.grado = localStorage.getItem('gradoAlumno')
  }

  ngOnInit(): void {
  }

  optionPadres(){
    this.escogeOption = "listaPadres"
  }
  optionAlumnos(){
    this.escogeOption = "listaAlumno"
  }
  optionAddAlumno(){
    this.escogeOption = "AddAlumnos"
  }

  volverListaGradoSeccion(){
    this.vistaAlumnos = false
  }


}
