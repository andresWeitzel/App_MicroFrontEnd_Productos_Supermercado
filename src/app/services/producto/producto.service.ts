import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoDto } from 'src/app/models/ProductoDto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  URL_PRODUCTO_BASE:string = 'http://localhost:8098/api/v1/productos/';

  constructor(
      private httpClient:HttpClient

  ) { }


  public listado():Observable<ProductoDto[]>{
    return this.httpClient.get<ProductoDto[]>(this.URL_PRODUCTO_BASE + 'listado')
  }


}
