import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';

@Component({
  selector: 'app-lista-padres',
  templateUrl: './lista-padres.component.html',
  styleUrls: ['./lista-padres.component.css']
})
export class ListaPadresComponent implements OnInit {
  listaPadres = new Array<Alumnado>();
  listaGeneral = new Array<Alumnado>();
  gradoSeccion = new Array<String>();

  listaVacia:boolean = false
  constructor(private inject:PeticionService) {
    this.gradoSeccion.push(localStorage.getItem('seccionAlumno'))
    this.gradoSeccion.push(localStorage.getItem('gradoAlumno'))
    this.inject.listaPorGradoSeccion(this.gradoSeccion).subscribe((resp)=>{
      this.listaPadres = resp
      if(this.listaPadres.length==0){
        this.listaVacia = true
      }
    })

  }

  ngOnInit(): void {
  }

}
