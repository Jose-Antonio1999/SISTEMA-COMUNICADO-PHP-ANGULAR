import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PanelDirectorComponent } from './panel-director/panel-director.component';
import { RegistroPersonalComponent } from './registro-personal/registro-personal.component';

const routes: Routes = [
  { path:"",component:LoginComponent},
  { path:"Panel-Director",component:PanelDirectorComponent},
  { path:"Login",component:LoginComponent},
  { path:"Registro-Personal",component:RegistroPersonalComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
