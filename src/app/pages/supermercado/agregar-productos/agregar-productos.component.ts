import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductoDto } from 'src/app/models/ProductoDto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.scss']
})
export class AgregarProductosComponent implements OnInit {



//Security
roles: string[]=[];
isAdmin = false;
isUser = false;
errMsj: string;

//Campos Producto
codigo:string='';
imagen:string='';
nombre:string='';
marca:string='';
tipo:string='';
grupo:string='';
peso:number;
precioUnidad:number;
stock:number;



  constructor(

    private router : Router,
    private productoService:ProductoService,
     private tokenService:TokenService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService,
    private formBuilder:FormBuilder,
  ) {


   }

  ngOnInit(): void {

    this.checkRoles();
    this.checkSecurity();
  }




    //=========== SEGURIDAD ==============

 checkRoles(){
  this.roles = this.tokenService.getAuthorities();
  this.roles.forEach(
    rol=>{
      if(rol=='ROLE_ADMIN'){
        this.isAdmin=true;
        //console.log(this.isAdmin);
      }

      if(rol=='ROLE_USER'){
        this.isUser=true;
        //console.log(this.isUser);
      }

    });
}

checkSecurity(){
  if(!(this.isAdmin) || !(this.isUser)){
    this.router.navigate(['login']);
  }

}



 //=========== METODOS CRUD ==============

//----------ADD PRODUCTOS ---------------

addProducto():void{


  const nuevoProducto=new ProductoDto(
    this.codigo,
    this.imagen,
    this.nombre,
    this.marca,
    this.tipo,
    this.grupo,
    this.peso,
    this.precioUnidad,
    this.stock
    );

    this.productoService.add(nuevoProducto).subscribe(
    data=>{

      console.log(nuevoProducto);

      this.toast.success({detail:"Operación Exitosa",summary:'Se ha Agregado el Producto!!', duration:2000});

      setTimeout(() => {
        this.router.navigate(['lista-productos']);
       }, 2200);
    },
    err => {
      this.errMsj = err.error.message;

      console.log(this.errMsj);

      this.toast.error({detail:"Error",summary:this.errMsj, duration:2000});
    }
  );
}


//=============== UTILS ===============

refresh(){
  window.location.reload();
}



}
