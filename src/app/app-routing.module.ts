import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './services/guards/auth/login.guard';
import { ProductosGuard } from './services/guards/productos/productos.guard';

const routes: Routes = [


  {path:'', loadChildren: () => import('./pages/supermercado/auth/login/login.module').then(m => m.LoginModule) },


  { path: 'inicio', loadChildren: () => import('./pages/supermercado/inicio/inicio.module').then(m => m.InicioModule), canActivate : [ProductosGuard] },


  { path: 'login', loadChildren: () => import('./pages/supermercado/auth/login/login.module').then(m => m.LoginModule) , canActivate : [LoginGuard]},


  { path: 'signin', loadChildren: () => import('./pages/supermercado/auth/signin/signin.module').then(m => m.SigninModule) , canActivate : [LoginGuard]},

  { path: 'lista-productos', loadChildren: () => import('./pages/supermercado/lista-productos/lista-productos.module').then(m => m.ListaProductosModule) , canActivate : [ProductosGuard] ,  data: { expectedRol: ['admin', 'user'] } },

  { path: 'editar-productos', loadChildren: () => import('./pages/supermercado/editar-productos/editar-productos.module').then(m => m.EditarProductosModule) , canActivate : [ProductosGuard] , data: { expectedRol: ['admin'] }},

  { path: 'agregar-productos', loadChildren: () => import('./pages/supermercado/agregar-productos/agregar-productos.module').then(m => m.AgregarProductosModule) , canActivate : [ProductosGuard] , data: { expectedRol: ['admin'] } },

  { path: '**', loadChildren: () => import('./pages/supermercado/auth/login/login.module').then(m => m.LoginModule) }];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
