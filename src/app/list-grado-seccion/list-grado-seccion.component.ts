import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { GradoSeccion } from '../class/grados';
import { stringify } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-grado-seccion',
  templateUrl: './list-grado-seccion.component.html',
  styleUrls: ['./list-grado-seccion.component.css']
})
export class ListGradoSeccionComponent implements OnInit {
  listaSeccion = new Array<string>();
  listaGrado = new Array<string>();
  GradoSeccion = new Array<GradoSeccion>()
  seccionElejido:String
  listaTablaBgradoSeccion:boolean = true
  constructor(private inject:PeticionService, private snackBar: MatSnackBar) {
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

  ObtenerSeccion(seccion:String){
    this.seccionElejido = seccion
  }

  enviarGradoSeccion(grado:String){
    if(this.seccionElejido!=null){
      localStorage.setItem("gradoAlumno",stringify(grado))
      localStorage.setItem("seccionAlumno",stringify(this.seccionElejido))
      this.listaTablaBgradoSeccion = false
    }else{
      this.snackBar.open("Debe escoger la sección a mostrar", "", {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
    }
  }

}
