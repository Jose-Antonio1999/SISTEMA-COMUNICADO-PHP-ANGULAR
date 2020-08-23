import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumnado',
  templateUrl: './alumnado.component.html',
  styleUrls: ['./alumnado.component.css']
})
export class AlumnadoComponent implements OnInit {

  escogeOption:boolean = true
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

  optionPadres(){
    this.escogeOption = false
  }
  optionAlumnos(){
    this.escogeOption = true
  }



}
