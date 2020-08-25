import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../class/personal'
import { GradoSeccion } from '../class/grados'
import { Consulta } from '../class/Consulta'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  URL:string = "http://localhost/SISTEMA-COMUNICADO-ANGULAR-PHP/Backend"
  constructor(private http:HttpClient) { }

  personal = new Array<Personal>();

  listaGradoSeccion = new Array<GradoSeccion>();

  verPersonalInicio():Observable<any>{
    return this.http.get<Personal>(this.URL+'/peticionInicio.php');
  }
  listaGrados():Observable<any>{
    return this.http.get<Personal>(this.URL+'/listaGrados.php');
  }
  leerUsuarioDni(dni:String):Observable<Consulta>{
    return this.http.get<Consulta>("https://dniruc.apisperu.com/api/v1/dni/"+dni+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvc2VjdXNpc3lzdGVtQGdtYWlsLmNvbSJ9.cpVt_iviGDeULLHKkTukzDBl-NRmB0ae7sNeANj6_6Q");
  }

  insertarPersonal(tr:Personal):Observable<any>{
    return this.http.post<Personal>(this.URL+'/insertarPersonal.php',JSON.stringify(tr));
  }
  login(usuario:any):Observable<any>{
    return this.http.post<Personal>(this.URL+'/Login.php',JSON.stringify(usuario));
  }


}
