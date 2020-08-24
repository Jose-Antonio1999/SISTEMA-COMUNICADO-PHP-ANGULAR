import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeticionService } from '../Service/peticion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FormularioCreado:FormGroup
  ingreso:boolean
  constructor(formBuilder:FormBuilder, private inject:PeticionService, private ruta:Router) {
    this.FormularioCreado = formBuilder.group({
      tipo:["",Validators.required],
      user:["",Validators.required],
      pass:["", Validators.required]
    })
  }

  Ingresar(){
    this.inject.login(this.FormularioCreado.value).subscribe((res)=>{
      if(res==null){
        console.log("no ingreso")
        this.ingreso = false
      }else{
        console.log("ingreso")
        this.ruta.navigateByUrl('Panel-Director')
        this.ingreso = true
      }
    })
  }

  ngOnInit(): void {
  }

}
