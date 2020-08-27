import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.css']
})
export class ListaPersonalComponent implements OnInit {
  listaPersonal = new Array<Personal>();
  listaDatos:Personal

  crearFormularioMensaje:FormGroup
  constructor(private inject:PeticionService, private ruta:Router, private formBuil:FormBuilder) {
    this.inject.ListaPersonal().subscribe((res)=>{
      this.listaPersonal = res
      console.log(this.listaPersonal)
    })

    this.crearFormularioMensaje = formBuil.group({
      tipo:['',Validators.required],
      para:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  enviarMensaje(){
    this.ruta.navigate(['Redactar',{listaDatos:JSON.stringify(this.listaPersonal)}])
  }

}
