import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit {
  ListaAlumnos = Array<Alumnado>();
  data:String
  constructor(private inject:PeticionService) {
    this.data = localStorage.getItem('correoDocente')
    this.inject.ListaAlumnosDocente(this.data).subscribe((res)=>{
      this.ListaAlumnos = res
    })

  }
  ngOnInit(): void {
  }

}
