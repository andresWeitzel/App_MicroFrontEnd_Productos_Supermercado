import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProductosRoutingModule } from './lista-productos-routing.module';
import { ListaProductosComponent } from './lista-productos.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HighchartsChartModule } from 'highcharts-angular';





@NgModule({
  declarations: [
    ListaProductosComponent
  ],
  imports: [
    CommonModule,
    ListaProductosRoutingModule,
    MatPaginatorModule,
    HighchartsChartModule
  ]
})
export class ListaProductosModule { }
