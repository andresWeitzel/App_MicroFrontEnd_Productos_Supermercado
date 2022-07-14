import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarProductosRoutingModule } from './agregar-productos-routing.module';
import { AgregarProductosComponent } from './agregar-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarProductosComponent
  ],
  imports: [
    CommonModule,
    AgregarProductosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AgregarProductosModule { }
