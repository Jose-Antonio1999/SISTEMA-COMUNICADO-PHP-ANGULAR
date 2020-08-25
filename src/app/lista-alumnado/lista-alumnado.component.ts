import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';

@Component({
  selector: 'app-lista-alumnado',
  templateUrl: './lista-alumnado.component.html',
  styleUrls: ['./lista-alumnado.component.css']
})
export class ListaAlumnadoComponent implements OnInit {
  listaGeneral = new Array<Alumnado>();
  constructor(private inject:PeticionService) {
    this.inject.PeticionGeneral().subscribe((res)=>{
      this.listaGeneral = res
    })
  }

  ngOnInit(): void {
  }

}
