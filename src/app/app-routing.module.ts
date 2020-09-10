import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PanelDirectorComponent } from './panel-director/panel-director.component';
import { RegistroPersonalComponent } from './registro-personal/registro-personal.component';
import { MenuComponent } from './menu/menu.component';
import { RedactarComunicadoComponent } from './redactar-comunicado/redactar-comunicado.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path:"",component:LoginComponent},
  { path:"Panel-Director",component:PanelDirectorComponent},
  { path:"Login",component:LoginComponent},
  { path:"Panel-Docente",component:MenuComponent},
  { path:"Registro-Personal",component:RegistroPersonalComponent},
  { path:"Redactar",component:RedactarComunicadoComponent},
  { path:"password-recovery", component:RecoveryPasswordComponent},
  { path:"**", component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
