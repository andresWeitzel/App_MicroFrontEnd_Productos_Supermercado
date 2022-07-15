import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarProductosRoutingModule } from './agregar-productos-routing.module';
import { AgregarProductosComponent } from './agregar-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AgregarProductosComponent
  ],
  imports: [
    CommonModule,
    AgregarProductosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
    MatDialogModule

  ]
})
export class AgregarProductosModule { }
