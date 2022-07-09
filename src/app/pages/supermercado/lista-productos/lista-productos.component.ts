import { Component, OnInit } from '@angular/core';
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
  roles: string[];
  isAdmin = false;

  constructor(
    private productoService:ProductoService,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {

    this.listarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(
      rol=>{
        if(rol==='ROLE_ADMIN'){
          this.isAdmin=true;
        }
      });


  }


listarProductos():void{
  this.productoService.listado().subscribe(
    data=>{
      this.productos = data;
    },
    err => {
      console.log(err);
    }
  );
}


}
