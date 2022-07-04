import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren: () => import('./pages/supermercado/login/login.module').then(m => m.LoginModule) },
  { path: 'inicio', loadChildren: () => import('./pages/supermercado/inicio/inicio.module').then(m => m.InicioModule) },
   { path: 'login', loadChildren: () => import('./pages/supermercado/login/login.module').then(m => m.LoginModule) },
   { path: '**', loadChildren: () => import('./pages/supermercado/login/login.module').then(m => m.LoginModule) }];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
