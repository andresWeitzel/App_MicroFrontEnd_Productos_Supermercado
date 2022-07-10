import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarProductosRoutingModule } from './editar-productos-routing.module';
import { EditarProductosComponent } from './editar-productos.component';


@NgModule({
  declarations: [
    EditarProductosComponent
  ],
  imports: [
    CommonModule,
    EditarProductosRoutingModule
  ]
})
export class EditarProductosModule { }
