import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarProductosRoutingModule } from './editar-productos-routing.module';
import { EditarProductosComponent } from './editar-productos.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditarProductosComponent
  ],
  imports: [
    CommonModule,
    EditarProductosRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditarProductosModule { }
