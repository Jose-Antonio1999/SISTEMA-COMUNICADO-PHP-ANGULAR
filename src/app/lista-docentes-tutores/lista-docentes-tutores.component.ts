import { Component, OnInit } from '@angular/core';
import { Alumnado } from '../class/Alumnado';
import { PeticionService } from '../Service/peticion.service';

@Component({
  selector: 'app-lista-docentes-tutores',
  templateUrl: './lista-docentes-tutores.component.html',
  styleUrls: ['./lista-docentes-tutores.component.css']
})
export class ListaDocentesTutoresComponent implements OnInit {
  listaTutores = new Array<Alumnado>();
  constructor(private inject:PeticionService) {
    this.inject.ListaTutores().subscribe((res)=>{
      this.listaTutores = res
    })
  }

  ngOnInit(): void {
  }

}
