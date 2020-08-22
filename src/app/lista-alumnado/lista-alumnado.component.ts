import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-alumnado',
  templateUrl: './lista-alumnado.component.html',
  styleUrls: ['./lista-alumnado.component.css']
})
export class ListaAlumnadoComponent implements OnInit {
  listadoAlumno = new Array<number>();
  constructor() {
    this.listadoAlumno.push(1)
    this.listadoAlumno.push(1)
    this.listadoAlumno.push(1)
    this.listadoAlumno.push(1)
    this.listadoAlumno.push(1)
    this.listadoAlumno.push(1)
    this.listadoAlumno.push(1)
  }

  ngOnInit(): void {
  }

}
