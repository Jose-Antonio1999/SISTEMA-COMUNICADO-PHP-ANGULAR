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
import { ListaPersonalComponent } from './lista-personal/lista-personal.component';
import { ListaDocentesTutoresComponent } from './lista-docentes-tutores/lista-docentes-tutores.component';
import { RegistroDocenteComponent } from './registro-docente/registro-docente.component';
import { MostrarListaVaciaComponent } from './mostrar-lista-vacia/mostrar-lista-vacia.component';
import { PadresGeneralComponent } from './padres-general/padres-general.component';
import { ListaBorradoresComponent } from './lista-borradores/lista-borradores.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MensajeDelDocenteComponent } from './mensaje-del-docente/mensaje-del-docente.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { jsPDF } from "jspdf";

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
    RegistroPersonalComponent,
    ListaPersonalComponent,
    ListaDocentesTutoresComponent,
    RegistroDocenteComponent,
    MostrarListaVaciaComponent,
    PadresGeneralComponent,
    ListaBorradoresComponent,
    PerfilComponent,
    MensajeDelDocenteComponent,
    RecoveryPasswordComponent,
    NotFoundComponent
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
