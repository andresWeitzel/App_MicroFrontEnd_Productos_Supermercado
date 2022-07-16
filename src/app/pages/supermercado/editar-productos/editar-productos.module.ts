import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarProductosRoutingModule } from './editar-productos-routing.module';
import { EditarProductosComponent } from './editar-productos.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoDto } from 'src/app/models/ProductoDto';
import { MatDialogModule } from '@angular/material/dialog';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    EditarProductosComponent
  ],
  imports: [
    CommonModule,
    EditarProductosRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
    MatDialogModule
  ]
})
export class EditarProductosModule{}
