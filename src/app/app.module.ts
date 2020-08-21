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
import { RegistroEstudianteApoderadoComponent } from './registro-estudiante-apoderado/registro-estudiante-apoderado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DocenteTutorComponent,
    MenuComponent,
    PanelControlComponent,
    RegistroEstudianteApoderadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
