import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Alumnado } from '../class/Alumnado';

@Component({
  selector: 'app-padres-general',
  templateUrl: './padres-general.component.html',
  styleUrls: ['./padres-general.component.css']
})
export class PadresGeneralComponent implements OnInit {

  listaPadresGeneral = new Array<Alumnado>()
  Mvacio:boolean = false
  constructor(private injet:PeticionService) {
    this.injet.PeticionGeneral().subscribe((res)=>{
      this.listaPadresGeneral = res
      if(this.listaPadresGeneral.length==0){
        this.Mvacio = true
      }
    })
  }

  ngOnInit(): void {
  }

}
