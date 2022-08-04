import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoDto } from 'src/app/models/ProductoDto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  productoUrlApi = environment.URL_PRODUCTO_API;

  constructor(
      private httpClient:HttpClient

  ) { }



  //================ METODOS CRUD ====================


  //--- GET ALL ---
  public listado(nroPagina:number , nroElementos:number , orderType:string, orderBy:string):Observable<ProductoDto[]>{
    return this.httpClient.get<any>(`${this.productoUrlApi}listado?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- GET ALL FILTER---
  public listadoFilter(filtro:string, nroPagina:number , nroElementos:number , orderType:string, orderBy:string ):Observable<ProductoDto[]>{
    return this.httpClient.get<any>(`${this.productoUrlApi}listado-filter/${filtro}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }


  //--- GET ALL FILTER AND FIELD---
  //----APLICA TODOS LOS METODOS DE BUSQUEDA-----
  public listadoFilterAndField(filtro:string, campo:string, nroPagina:number , nroElementos:number , orderType:string, orderBy:string ):Observable<ProductoDto[]>{
    return this.httpClient.get<any>(`${this.productoUrlApi}${campo}/${filtro}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- ADD ---
public add(producto:ProductoDto):Observable<ProductoDto>{
  return this.httpClient.post<any>(`${this.productoUrlApi}`,producto);
}

//--- UPDATE ---
  public update(id:number, producto:ProductoDto):Observable<ProductoDto>{
    return this.httpClient.put<any>(`${this.productoUrlApi}${id}`,producto);

  }

  //--- DELETE ---
  public delete(id:number):Observable<ProductoDto>{
    return this.httpClient.delete<any>(`${this.productoUrlApi}${id}`);

  }





}
