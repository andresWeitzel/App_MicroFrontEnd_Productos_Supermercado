import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoDto } from 'src/app/models/ProductoDto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  productos: ProductoDto[] = [];
  roles: string[]=[];
  isAdmin = false;

   //Paginado
   nroPagina=0;
   nroElementos=10;
   ordenacion='id';
   ascendente=true;

   primeraPagina=false;
   ultimaPagina=false;

  constructor(
    private router: Router,
    private productoService:ProductoService,
    private tokenService:TokenService
  ) { }

  ngOnInit(){

    this.listarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(
      rol=>{
        if(rol=='ROLE_ADMIN'){
          this.isAdmin=true;
        }
      });


  }


listarProductos(){
  this.productoService.listado(this.nroPagina,this.nroElementos,this.ordenacion,this.ascendente).subscribe(
    (data:any)=>{
      this.productos = data.content;
      this.primeraPagina = data.first;
      this.ultimaPagina = data.last;

      console.log(this.productos);
    },
    err => {
      console.log(err);
    }
  );
}


}
