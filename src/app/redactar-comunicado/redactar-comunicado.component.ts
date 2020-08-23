import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-redactar-comunicado',
  templateUrl: './redactar-comunicado.component.html',
  styleUrls: ['./redactar-comunicado.component.css']
})
export class RedactarComunicadoComponent implements OnInit {
  tipoComunicado = new Array<String>();
  selectedValue:string
  disableSelect = new FormControl(false);
  tipo:string
  cuerpo:string
  constructor() {
    this.tipoComunicado.push("Reunion")
    this.tipoComunicado.push("Comunicado")
    this.tipoComunicado.push("Aviso")
  }

  ngOnInit(): void {
  }

}
