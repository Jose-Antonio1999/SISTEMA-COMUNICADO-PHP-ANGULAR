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
  contador:number = 1
  verPass:boolean = false
  mfaild:boolean = false
  clickado:boolean = false
  recordarUsuarioLogin:String
  listaImagenes = Array<String>()
  imagen:string = "https://cdn.pixabay.com/photo/2018/03/06/07/28/writing-pad-3202747_960_720.jpg"
  constructor(formBuilder:FormBuilder, private inject:PeticionService, private ruta:Router, private spinner: NgxSpinnerService,) {
    this.inject.verPersonalInicio().subscribe((res)=>{
        if(res==0){
          this.ruta.navigateByUrl('Registro-Personal')
        }
    })

    this.imagen = this.rellenarImagen() as any

    this.FormularioCreado = formBuilder.group({
      chek:[""],
      tipo:["",Validators.required],
      user:["",Validators.required],
      pass:["", Validators.required]
    })
    /*
    if(localStorage.getItem('recordar')!=null || localStorage.getItem('recordar')!=""){
      this.FormularioCreado.controls['user'].setValue(localStorage.getItem('recordar'))
      this.clickado = true
      this.contador = 0
    }else{
      this.clickado = false
    }*/
  }

  rellenarImagen(){
    //this.listaImagenes.push("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80")
    this.listaImagenes.push("https://cdn.pixabay.com/photo/2015/10/30/16/42/balloon-1014411_960_720.jpg")
    this.listaImagenes.push("https://cdn.pixabay.com/photo/2018/03/06/07/28/writing-pad-3202747_960_720.jpg")
    this.listaImagenes.push("https://cdn.pixabay.com/photo/2017/08/28/18/32/autumn-2690771_960_720.jpg")
    this.listaImagenes.push("https://cdn.pixabay.com/photo/2018/04/07/18/06/diary-3299128_960_720.jpg")
    this.listaImagenes.push("https://cdn.pixabay.com/photo/2018/03/06/07/28/writing-pad-3202747_960_720.jpg")
    let posi = Math.round(Math.random()*4)
    return this.listaImagenes[posi]
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
            localStorage.setItem('userDir',this.FormularioCreado.value.usuario);
            localStorage.setItem('DNID',res[0].Correo) //DNI
            this.FormularioCreado.reset()
            this.ruta.navigateByUrl('Panel-Director')
            this.ingreso = true
          }
          if(res[0].Perfil==2){
            localStorage.setItem('userDoc',this.FormularioCreado.value.usuario);
            localStorage.setItem('DNIDocente',res[0].Correo) //DNI
            this.FormularioCreado.reset()
            this.ruta.navigateByUrl('Panel-Docente')
            this.ingreso = true
          }
          if(res[0].Perfil==3){
            localStorage.setItem('userDir',this.FormularioCreado.value.usuario);
            localStorage.setItem('DNID',res[0].Correo) //DNI
            this.FormularioCreado.reset()
            this.ruta.navigateByUrl('Panel-Director')
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
  recordarUsuario(){
    if(this.contador==1){
      console.log("si")
      localStorage.setItem('recordar',this.FormularioCreado.value.user)
      this.contador = 0
    }else{
      localStorage.removeItem('recordar')
      console.log("no")
      this.contador = 1
    }
  }

}
