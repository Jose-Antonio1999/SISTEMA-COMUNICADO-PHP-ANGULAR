import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-borradores',
  templateUrl: './lista-borradores.component.html',
  styleUrls: ['./lista-borradores.component.css']
})
export class ListaBorradoresComponent implements OnInit {
  listaBorradores = Array<String>()
  constructor() {
    this.listaBorradores.push("f")
    this.listaBorradores.push("f")
    this.listaBorradores.push("f")
    this.listaBorradores.push("f")
    this.listaBorradores.push("f")
    this.listaBorradores.push("f")
  }

  ngOnInit(): void {
  }

}
