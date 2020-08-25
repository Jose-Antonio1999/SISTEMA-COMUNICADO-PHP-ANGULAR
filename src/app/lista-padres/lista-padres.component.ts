import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';

@Component({
  selector: 'app-lista-padres',
  templateUrl: './lista-padres.component.html',
  styleUrls: ['./lista-padres.component.css']
})
export class ListaPadresComponent implements OnInit {
  listaPadres = new Array<Alumnado>();
  constructor(private inject:PeticionService) {

    this.inject.PeticionGeneral().subscribe((resp)=>{
      this.listaPadres = resp
    })

  }

  ngOnInit(): void {
  }

}
