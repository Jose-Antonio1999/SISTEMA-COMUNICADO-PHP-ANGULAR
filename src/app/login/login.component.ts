import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioP:string = "joseantonio"
  contraseniaP:string = "joseantonio"
  usuario:string
  contrasenia:string
  FormularioCreado:FormGroup
  acceso:boolean = false
  constructor(formBuilder:FormBuilder) {
    this.FormularioCreado = formBuilder.group({
      user:["",Validators.required],
      pass:["", Validators.required]
    })
  }

  Ingresar(){
    if(this.FormularioCreado.value.user == this.usuarioP && this.FormularioCreado.value.pass == this.contraseniaP){
      this.acceso = true
    }
  }

  ngOnInit(): void {
  }

}
