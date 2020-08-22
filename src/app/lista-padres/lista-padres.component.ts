import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-padres',
  templateUrl: './lista-padres.component.html',
  styleUrls: ['./lista-padres.component.css']
})
export class ListaPadresComponent implements OnInit {
  listadoPadres = new Array<number>();
  constructor() {
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
    this.listadoPadres.push(1)
  }

  ngOnInit(): void {
  }

}
