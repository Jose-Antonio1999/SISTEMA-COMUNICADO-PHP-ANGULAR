import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.css']
})
export class ListaPersonalComponent implements OnInit {
  listaPersonal = new Array<Personal>();
  constructor(private inject:PeticionService) {
    this.inject.ListaPersonal().subscribe((res)=>{
      this.listaPersonal = res
    })
  }

  ngOnInit(): void {
  }

}
