import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Personal } from '../class/personal'
import { GradoSeccion } from '../class/grados'
import { Consulta } from '../class/Consulta'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumnado } from '../class/Alumnado';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  URL:string = "http://localhost/SISTEMA-COMUNICADO-ANGULAR-PHP/Backend"
  token:String = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvc2VjdXNpc3lzdGVtQGdtYWlsLmNvbSJ9.cpVt_iviGDeULLHKkTukzDBl-NRmB0ae7sNeANj6_6Q"
  Usuario:Personal
  UsuarioActual:Personal
  nombreUsuario:String
  constructor(private http:HttpClient) {
    this.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
      this.Usuario = respuesta[0]
    })

  }

  personal = new Array<Personal>();
  listaGradoSeccion = new Array<GradoSeccion>();

  verPersonalInicio():Observable<any>{
    return this.http.get<Personal>(this.URL+'/peticionInicio.php');
  }
  listaGrados():Observable<any>{
    return this.http.get<Personal>(this.URL+'/listaGrados.php');
  }
  leerUsuarioDni(dni:String):Observable<Consulta>{
    return this.http.get<Consulta>("https://dniruc.apisperu.com/api/v1/dni/"+dni+this.token)
  }

  insertarPersonal(tr:Personal):Observable<any>{
    return this.http.post<Personal>(this.URL+'/insertarPersonal.php',JSON.stringify(tr));
  }

  login(usuario:any):Observable<any>{
    return this.http.post<Personal>(this.URL+'/Login.php',JSON.stringify(usuario));
  }
  insertarEstudiante(Alumnado:any):Observable<any>{
    return this.http.post<any>(this.URL+'/RegistroAlumnado.php',JSON.stringify(Alumnado));
  }
  PeticionGeneral():Observable<any>{
    return this.http.get<any>(this.URL+'/listaGeneral.php');
  }
  ListaTutores():Observable<any>{
    return this.http.get<any>(this.URL+'/ListaTutores.php');
  }
  ListaPersonal():Observable<any>{
    return this.http.get<any>(this.URL+'/listaPersonal.php');
  }
  ListaAlumnosDocente(data:any):Observable<any>{
    return this.http.post<any>(this.URL+'/IngresoDocente.php',JSON.stringify(data));
  }
  listaPorGradoSeccion(data:any):Observable<any>{
    return this.http.post<any>(this.URL+'/ListaPorGradoSeccion.php',JSON.stringify(data));
  }
  DatosUsuarioActual(data:any):Observable<any>{
    return this.http.post<any>(this.URL+'/UsuarioActual.php',JSON.stringify(data));
  }
  EnvioMensaje(data:any):Observable<any>{
    return this.http.post<any>(this.URL+'/EnviodeMensaje.php',JSON.stringify(data));
  }
  ListaComunicados():Observable<any>{
    return this.http.get<any>(this.URL+'/listaMensajesEnviados.php');
  }
  ListaComunicadosDelDocente(dni:String):Observable<any>{
    return this.http.put<any>(this.URL+'/listaComunicadosDelDocente.php',dni);
  }
  ListaComunicadosBorradores(idDocente:String):Observable<any>{
    return this.http.put<any>(this.URL+'/listaDeMensajesBorradores.php',idDocente);
  }
  GuardarBorrador(mensaje:String):Observable<any>{
    return this.http.put<any>(this.URL+'/GuardarBorrador.php',mensaje);
  }
  //Actualizar Datos
  ActualizarPersonal(data:any):Observable<any>{
    return this.http.put<any>(this.URL+'/actualizarPersonal.php',JSON.stringify(data));
  }
  ActualizarEstudiante(data:any){
    return this.http.put<any>(this.URL+'/updateEstudiante.php',JSON.stringify(data));
  }
  ActualizarComunicado(data:any){
    return this.http.put<any>(this.URL+'/updateComunicado.php',JSON.stringify(data));
  }
  cambiarPass(data:any){
    return this.http.put<any>(this.URL+'/cambiarPassword.php',JSON.stringify(data));
  }
  cambiarMiniDatos(data:any){
    return this.http.put<any>(this.URL+'/cambiarMinidatos.php',JSON.stringify(data));
  }
  //Eliminar Datos
  EliminarMensaje(code:string):Observable<any>{
    return this.http.delete(this.URL+'/EliminarComunicado.php?idComunicado='+code)
  }
  EliminarPersonal(code:string):Observable<any>{
    return this.http.delete(this.URL+'/EliminarPersonal.php?idPersonal='+code)
  }
  EliminarEstudiante(code:string):Observable<any>{
    return this.http.delete(this.URL+'/EliminarEstudiante.php?idApoderado='+code)
  }
  //metodo buscar
  buscarComunicado(tipo:string):Observable<any>{
    return this.http.post(this.URL+'/BuscarComunicado.php',tipo)
  }
  buscarComunicadoBorrador(tipo:string):Observable<any>{
    return this.http.post(this.URL+'/BuscarComunicadoBorrador.php',tipo)
  }
  buscarEstudiante(data:string):Observable<any>{
    return this.http.post(this.URL+'/BuscarEstudiante.php',data)
  }
  buscarPadreGeneral(tipo:string):Observable<any>{
    return this.http.post(this.URL+'/BuscarPadreGeneral.php',tipo)
  }
  buscarPersonal(nombre:string):Observable<any>{
    return this.http.post(this.URL+'/BuscarPersonal.php',nombre)
  }
  manerjarERROR(err:HttpErrorResponse){
    return status;
  }



}
