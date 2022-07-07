import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProductosRoutingModule } from './lista-productos-routing.module';
import { ListaProductosComponent } from './lista-productos.component';


@NgModule({
  declarations: [
    ListaProductosComponent
  ],
  imports: [
    CommonModule,
    ListaProductosRoutingModule
  ]
})
export class ListaProductosModule { }
