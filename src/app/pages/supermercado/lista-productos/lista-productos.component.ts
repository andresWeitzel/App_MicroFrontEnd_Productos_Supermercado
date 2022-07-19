import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductoDto } from 'src/app/models/ProductoDto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  navigationExtras : NavigationExtras = {

    state : {
      value :null
    }
};

  //PRODUCTOS LISTADO
  productos: ProductoDto[] = [];

  //PRODUCTO SELECCIONADO
  productoSelect:ProductoDto[] = [];
  idProdSelect:number=0;
  codProdSelect:string='';
  nombrProdSelect:string='';

  //FILTRO BUSQUEDA PRODUCTOS
  filtroProdBusqueda:string='Gaseosas';

  //SEGURIDAD
  roles: string[]=[];
  isAdmin = false;
  isUser = false;

   //PAGINADO

   //Pages
   nroPage=0;
   isFirstPage=false;
   isLastPage=false;
   totalPages=0;

   //Elements
   nroElements=10;
   currentElements=0;
   totalElements=0;

  //Caracteristicas
   orderBy='id';
   direction='asc';

  //ERRORES
   errMsj: string;




  constructor(
    private router: Router,
    private productoService:ProductoService,
    private tokenService:TokenService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService,

  ) { }

  ngOnInit(){

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
    }else{
      this.listarProductos();
    }
  }


  //=========== METODOS CRUD ==============

//----------LISTADO PRODUCTOS ---------------
listarProductos(){
  this.productoService.listado(this.nroPage,this.nroElements,this.orderBy,this.direction).subscribe(
    (data:any)=>{
      this.productos = data.content;
      this.isFirstPage = data.first;
      this.isLastPage = data.last;
      this.totalPages = data.totalPages;
      this.currentElements = data.numberOfElements;
      this.totalElements = this.nroElements * this.totalPages;


      //console.log(this.productos);
    },
    err => {

      this.errMsj = err.error.message;

         //TOAST ERROR
         setTimeout(() => {
          this.toast.error({detail:"ERROR",summary:this.errMsj , duration:2000});
        }, 600);
        //FIN TOAST ERROR
      console.log(err);

    }
  );
}

//----------LISTADO PRODUCTOS FILTER ---------------
listarProductosFilter(){
  this.productoService.listadoFilter(this.filtroProdBusqueda,this.nroPage,this.nroElements,this.orderBy,this.direction).subscribe(
    (data:any)=>{
      this.productos = data.content;
      this.isFirstPage = data.first;
      this.isLastPage = data.last;
      this.totalPages = data.totalPages;
      this.currentElements = data.numberOfElements;
      this.totalElements = this.nroElements * this.totalPages;


      //console.log(this.productos);
    },
    err => {
      this.errMsj = err.error.message;

      //TOAST ERROR
      setTimeout(() => {
       this.toast.error({detail:"ERROR",summary:this.errMsj , duration:2000});
     }, 600);
     //FIN TOAST ERROR
   console.log(err);

    }
  );
}


setFilter(filtro:string){

  this.filtroProdBusqueda=filtro;

  console.log(this.filtroProdBusqueda);

  this.listarProductosFilter();
}





//----------EDITAR PRODUCTOS ---------------
  editarProducto(producto : any): void{
            //SPIN LOADING
            this.ngxService.start();
            setTimeout(() => {
              this.ngxService.stop();
            }, 100);
            //FIN SPIN LOADING


    this.navigationExtras.state['value'] = producto;
    this.router.navigate(['editar-productos'] , this.navigationExtras);
  }



//----------ELIMINAR PRODUCTOS ---------------
  eliminarProducto(id : number): void{

    //SPIN LOADING
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    //FIN SPIN LOADING


    this.productoService.delete(id).subscribe(
      (data:any)=>{

        this.toast.success({detail:"Operación Exitosa",summary:'Se ha Eliminado el Producto!!', duration:2000});

        console.log("Producto Eliminado");

        setTimeout(() => {
          this.refresh();
         }, 2100)
      },
      err => {
        this.errMsj = err.error.message;

        //TOAST ERROR
        setTimeout(() => {
         this.toast.error({detail:"ERROR",summary:this.errMsj , duration:2000});
       }, 600);
       //FIN TOAST ERROR
     console.log(err);
      }
    );

  }

  //=============== UTILS ===============

refresh(){
  window.location.reload();
}

//-----------  ID PRODUCTO SELECT-------------

setProductoSelect(producto:ProductoDto){

  this.idProdSelect = producto.id;
  this.codProdSelect=producto.codigo;
  this.nombrProdSelect=producto.nombre;

  console.log('Producto Seleccionado: ',producto);
}



//=========== METODOS PAGINACION ==============

//Ordenar los registros por type
orderByDirection(type:string,direct:string):void{
  this.orderBy = type;
  this.direction = direct;
  this.listarProductos();
}


//Pagina Anterior
paginaAnterior():void{
  if(!this.isFirstPage){
this.nroPage--;
this.listarProductos();
  }
}

  //Pagina Anterior
  paginaSiguiente():void{
    if(!this.isLastPage){
      this.nroPage++;
      this.listarProductos();
    }
  }

  cambiarPagina(pagina:number):void{
    this.nroPage=pagina;
    this.listarProductos();
  }





}
