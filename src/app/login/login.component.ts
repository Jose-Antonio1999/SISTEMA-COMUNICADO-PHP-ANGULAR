import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeticionService } from '../Service/peticion.service';
import { Router, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('passw',{static:true}) passw:ElementRef

  FormularioCreado:FormGroup
  ingreso:boolean
  existeUsuario:boolean
  data = new Array<Data>()

  verPass:boolean = false
  mfaild:boolean = false
  constructor(formBuilder:FormBuilder,
    private inject:PeticionService,
    private ruta:Router,
    private spinner: NgxSpinnerService,) {

    this.inject.verPersonalInicio().subscribe((res)=>{
        if(res == ""){
          this.ruta.navigateByUrl('Registro-Personal')
        }
        if(localStorage.getItem('user')!=null){
          this.ruta.navigateByUrl('Panel-Director');
        }

    })


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
          this.mfaild = true
          setTimeout(() => {
            this.mfaild = false
          }, 2000);
        }else{
          if(res[0].Perfil==1){
            localStorage.setItem('user',this.FormularioCreado.value.usuario);
            localStorage.setItem('DNID',res[0].Correo) //DNI
            this.ruta.navigateByUrl('Panel-Director')
            this.ingreso = true
          }
          if(res[0].Perfil==2){
            localStorage.setItem('user',this.FormularioCreado.value.usuario);
            localStorage.setItem('DNIDocente',res[0].Correo) //DNI
            console.log(localStorage.getItem('DNIDocente'))
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
  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }
  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
  }

}
