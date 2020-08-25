import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceMensajeService } from '../Service/service-mensaje.service';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  listaMensajesEntrada = new Array<number>();
  constructor(private snackBar: MatSnackBar, private inject:ServiceMensajeService) {
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
