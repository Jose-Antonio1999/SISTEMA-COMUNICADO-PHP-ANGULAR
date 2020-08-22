import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-docentes',
  templateUrl: './lista-docentes.component.html',
  styleUrls: ['./lista-docentes.component.css']
})
export class ListaDocentesComponent implements OnInit {
  listadoDocentes = new Array<number>();
  constructor() {
    this.listadoDocentes.push(1)
    this.listadoDocentes.push(1)
    this.listadoDocentes.push(1)
    this.listadoDocentes.push(1)
    this.listadoDocentes.push(1)
    this.listadoDocentes.push(1)
    this.listadoDocentes.push(1)
    this.listadoDocentes.push(1)
  }

  ngOnInit(): void {
  }

}
