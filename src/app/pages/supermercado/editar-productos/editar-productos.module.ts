import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarProductosRoutingModule } from './editar-productos-routing.module';
import { EditarProductosComponent } from './editar-productos.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoDto } from 'src/app/models/ProductoDto';


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
export class EditarProductosModule{}
