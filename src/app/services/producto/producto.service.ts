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


  public listado(nroPagina:number , nroElementos:number , ordenacion:string, ascendente:boolean):Observable<ProductoDto[]>{
    return this.httpClient.get<any>(`${URL_PRODUCTO_BASE}listado?page=${nroPagina}&size=${nroElementos}&sort=${ordenacion}&asc=${ascendente}`);
  }


}
