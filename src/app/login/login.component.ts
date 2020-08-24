import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeticionService } from '../Service/peticion.service';
import { Router, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  FormularioCreado:FormGroup
  ingreso:boolean
  data = new Array<Data>()
  constructor(formBuilder:FormBuilder,
    private inject:PeticionService,
    private ruta:Router,
    private spinner: NgxSpinnerService) {

    if(localStorage.getItem('user')!=null){
      this.ruta.navigateByUrl('Panel-Director');
    }

    this.FormularioCreado = formBuilder.group({
      tipo:["",Validators.required],
      user:["",Validators.required],
      pass:["", Validators.required]
    })
  }

  Ingresar(){
    this.inject.login(this.FormularioCreado.value).subscribe((res)=>{
      this.spinner.show();
      setTimeout(() => {
        if(res==0 || res == null || res ==""){
          this.ingreso = false
        }else{
          if(res[0].Perfil==1){
            localStorage.setItem('user',this.FormularioCreado.value.usuario);
            this.ruta.navigateByUrl('Panel-Director')
            this.ingreso = true
          }
          if(res[0].Perfil==2){
            localStorage.setItem('user',this.FormularioCreado.value.usuario);
            console.log(res[0].Correo)
            this.ruta.navigateByUrl('Panel-Docente')
            this.ingreso = true
          }
        }
        this.spinner.hide();
      }, 2000);

    })
  }

  ngOnInit(): void {
  }

}
