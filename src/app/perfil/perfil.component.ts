import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  Perfil:Personal
  formulario:FormGroup
  constructor(public inject:PeticionService, private Builder:FormBuilder) {
    this.Perfil = this.inject.Usuario
    this.formulario = Builder.group({
      celular:['',[Validators.required,Validators.maxLength(9)]],
      email:['',[Validators.required,Validators.email]]
    })
  }

  ngOnInit(): void {
  }

}
