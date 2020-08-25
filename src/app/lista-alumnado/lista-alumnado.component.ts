import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';

@Component({
  selector: 'app-lista-alumnado',
  templateUrl: './lista-alumnado.component.html',
  styleUrls: ['./lista-alumnado.component.css']
})
export class ListaAlumnadoComponent implements OnInit {
  listaGeneral = new Array<Alumnado>();
  gradoSeccion = new Array<String>();
  listaVacia:boolean = false
  constructor(private inject:PeticionService) {
    this.gradoSeccion.push(localStorage.getItem('seccionAlumno'))
    this.gradoSeccion.push(localStorage.getItem('gradoAlumno'))
    this.inject.listaPorGradoSeccion(this.gradoSeccion).subscribe((res)=>{
      this.listaGeneral = res
    })
    if(this.listaGeneral.length==0){
      this.listaVacia = true
    }
  }

  ngOnInit(): void {
  }

}
