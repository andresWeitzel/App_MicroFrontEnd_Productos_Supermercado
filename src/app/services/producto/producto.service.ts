import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoDto } from 'src/app/models/ProductoDto';


const URL_PRODUCTO_BASE = 'http://localhost:8098/api/v1/productos/';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {



  constructor(
      private httpClient:HttpClient

  ) { }


  //================ METODOS CRUD ====================


  //--- GET ALL ---
  public listado(nroPagina:number , nroElementos:number , orderType:string, orderBy:string):Observable<ProductoDto[]>{
    return this.httpClient.get<any>(`${URL_PRODUCTO_BASE}listado?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- GET ALL FILTER---
  public listadoFilter(nroPagina:number , nroElementos:number , orderType:string, orderBy:string):Observable<ProductoDto[]>{
    return this.httpClient.get<any>(`${URL_PRODUCTO_BASE}listado-filter?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- ADD ---
public add(producto:ProductoDto):Observable<ProductoDto>{
  return this.httpClient.post<any>(`${URL_PRODUCTO_BASE}`,producto);
}

//--- UPDATE ---
  public update(id:number, producto:ProductoDto):Observable<ProductoDto>{
    return this.httpClient.put<any>(`${URL_PRODUCTO_BASE}${id}`,producto);

  }


  //================ METODOS DE BUSQUEDA ====================



}
