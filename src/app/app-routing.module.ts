import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren: () => import('./pages/supermercado/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'inicio', loadChildren: () => import('./pages/supermercado/inicio/inicio.module').then(m => m.InicioModule) },
   { path: 'login', loadChildren: () => import('./pages/supermercado/auth/login/login.module').then(m => m.LoginModule)},
   { path: 'signin', loadChildren: () => import('./pages/supermercado/auth/signin/signin.module').then(m => m.SigninModule)},
  { path: 'lista-productos', loadChildren: () => import('./pages/supermercado/lista-productos/lista-productos.module').then(m => m.ListaProductosModule) },

   { path: '**', loadChildren: () => import('./pages/supermercado/auth/login/login.module').then(m => m.LoginModule) }];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
