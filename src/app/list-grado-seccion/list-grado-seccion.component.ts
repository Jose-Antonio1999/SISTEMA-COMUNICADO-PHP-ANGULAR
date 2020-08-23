import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-grado-seccion',
  templateUrl: './list-grado-seccion.component.html',
  styleUrls: ['./list-grado-seccion.component.css']
})
export class ListGradoSeccionComponent implements OnInit {
  listatutores = new Array<number>();
  tipoComunicado = new Array<string>();
  constructor() {
    this.listatutores.push(1)
    this.listatutores.push(1)
    this.listatutores.push(1)
    this.listatutores.push(1)
    this.listatutores.push(1)

    this.tipoComunicado.push("A")
    this.tipoComunicado.push("B")
    this.tipoComunicado.push("C")
    this.tipoComunicado.push("D")
    this.tipoComunicado.push("E")
  }

  ngOnInit(): void {
  }

}
