import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit {

  listaAlumnos = new Array<number>()
  constructor() {
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
    this.listaAlumnos.push(1)
  }

  ngOnInit(): void {
  }

}