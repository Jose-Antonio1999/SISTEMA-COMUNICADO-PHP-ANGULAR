import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DocenteTutorComponent } from './docente-tutor/docente-tutor.component';
import { MenuComponent } from './menu/menu.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { PanelDirectorComponent } from './panel-director/panel-director.component';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
import { AlumnadoComponent } from './alumnado/alumnado.component';
import { ListaAlumnadoComponent } from './lista-alumnado/lista-alumnado.component';
import { ListaPadresComponent } from './lista-padres/lista-padres.component';
import { ListaDocentesComponent } from './lista-docentes/lista-docentes.component';
import { RedactarComunicadoComponent } from './redactar-comunicado/redactar-comunicado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListGradoSeccionComponent } from './list-grado-seccion/list-grado-seccion.component';
import { ValidarDatosComponent } from './validar-datos/validar-datos.component';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';
import { RegistroPersonalComponent } from './registro-personal/registro-personal.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DocenteTutorComponent,
    MenuComponent,
    PanelControlComponent,
    PanelDirectorComponent,
    BandejaEntradaComponent,
    AlumnadoComponent,
    ListaAlumnadoComponent,
    ListaPadresComponent,
    ListaDocentesComponent,
    RedactarComunicadoComponent,
    ListGradoSeccionComponent,
    ValidarDatosComponent,
    RegistroEstudianteComponent,
    RegistroPersonalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
