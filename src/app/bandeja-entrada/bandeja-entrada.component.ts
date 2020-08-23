import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  listaMensajesEntrada = new Array<number>();
  constructor() {
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
    this.listaMensajesEntrada.push(1)
  }

  ngOnInit(): void {
  }

}
