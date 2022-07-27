import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductoDto } from 'src/app/models/ProductoDto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { TokenService } from 'src/app/services/token/token.service';

//Excell
import * as XLSX from 'xlsx';


//Highchart and Treemap chart
import * as  Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import Tree from 'highcharts/modules/treemap';
import Heatmap from 'highcharts/modules/heatmap';
More(Highcharts);
Tree(Highcharts);
Heatmap(Highcharts);




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

  //Cantidad de Productos por Grupos
  nroProdAgua=3;

  //FILTRO BUSQUEDA PRODUCTOS
  filtroProdBusqueda:string='';

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
   nroCurrentElements=0;
   nroTotalElements=0;

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
    if(!(this.isAdmin) && !(this.isUser)){
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
      this.nroCurrentElements = data.numberOfElements;
      this.nroTotalElements = data.totalElements;

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
      this.nroCurrentElements = data.numberOfElements;
      this.nroTotalElements = data.totalElements;


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
if(filtro === '' || filtro === null){

  this.listarProductos();
}else{

  this.filtroProdBusqueda=filtro;

  //console.log(this.filtroProdBusqueda);

  this.listarProductosFilter();


}
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



  //----------ELIMINAR PRODUCTOS ---------------
  eliminarProductoNoAuth(id : number): void{

    //SPIN LOADING
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    //FIN SPIN LOADING



    this.toast.error({detail:"Operación No Autorizada",summary:'Servicio Habilitado para administradores!!', duration:2000});


        setTimeout(() => {
          this.refresh();
         }, 2100)


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

  if(this.filtroProdBusqueda === ''
  || this.filtroProdBusqueda === null){

    this.listarProductos();
  }else{

    this.listarProductosFilter();

}
}


//Pagina Anterior
paginaAnterior():void{

  if(this.filtroProdBusqueda === ''
  || this.filtroProdBusqueda === null){

  if(!this.isFirstPage){
    this.nroPage--;
    this.listarProductos();

  }else{

    this.listarProductosFilter();
  }
  }
}

  //Pagina Anterior
  paginaSiguiente():void{
    if(this.filtroProdBusqueda === ''
    || this.filtroProdBusqueda === null){

    if(!this.isLastPage){
      this.nroPage++;
      this.listarProductos();

    }else{

      this.listarProductosFilter();
    }
    }
  }


  cambiarPagina(pagina:number):void{
    this.nroPage=pagina;

    if(this.filtroProdBusqueda === ''
    || this.filtroProdBusqueda === null){

      this.listarProductos();
    }else{

      this.listarProductosFilter();
    }

  }

  //============= GENERATE EXCEL ====================
  name = 'listaProductos.xlsx';

  generateExcel(): void {
    let element = document.getElementById('table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }



  //=============== PRODUCTOS POR GRUPO =============
  countProdByGroup():void{

    //this.nroProdAgua = this.productos.find.g

  }

  //============== HIGHCHART =================


  Highcharts03: typeof Highcharts = Highcharts;

      chartOptions03: Highcharts.Options = {
        credits: {
          enabled: false

        },

        chart: {
          height: 200,
          width: 800,
          inverted: true
      },

      title: {
          text: ''
      },
      tooltip:{
        pointFormat : '<b><strong>{point.name}</strong></b>'
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
          level: 1,
          layoutAlgorithm: 'stripes',
          dataLabels: {
              enabled: true,

              align: 'left',
              verticalAlign: 'top',
              style: {
                  fontSize: '13px',
                  fontWeight: 'bold'
              }
          }
      }],
      data: [{
        //-----------------BEBIDAS-------------------
        id: 'Beb',
        name: 'BEBIDAS',
        color: "rgb(18, 92, 19)"
      }, {
        name: 'Agua',
        parent: 'Beb',
        value: 1
    }, {
        name: 'Vinos',
        parent: 'Beb',
        value: 1
      }, {
        name: 'Gaseosas',
        parent: 'Beb',
        value: 1
    },
      //-----------------CARNES/PESCADOS-------------------
    {
        id: 'Car/Pes',
        name: 'CARNES Y PESCADOS',
        color: "rgb(35, 112, 20)"
    }, {
      name: 'Carne Vacuna',
      parent: 'Car/Pes',
      value: 1
  }, {
      name: 'Pollo/Granja',
      parent: 'Car/Pes',
      value: 1
  },
      //-----------------CONGELADOS-------------------
    {
      id: 'Cong',
        name: 'CONGELADOS',
        color: "rgb(55, 124, 25)"
    },
    {
      name: 'Nugg/Rebozados',
      parent: 'Cong',
      value: 1
  }, {
      name: 'Hamburguesas',
      parent: 'Cong',
      value: 1
  }, {
      name: 'Helados',
      parent: 'Cong',
      value: 1
  },
     //-----------------LACTEOS/FRESCOS-------------------

    {
      id: 'Lact',
      name: 'LÁCTEOS Y FRESCOS',
      color: "rgb(75, 134, 30)"
  },
   {
        name: 'Leches',
        parent: 'Lact',
        value: 1
    }, {
        name: 'Yogures',
        parent: 'Lact',
        value: 1
    },

  //-----------------FRUTAS/VERDURAS-------------------
    {
      id: 'Frut/Ver',
      name: 'FRUTAS Y VERDURAS',
      color: "rgb(100, 144, 35)"
  },
   {
        name: 'Verduras',
        parent: 'Frut/Ver',
        value: 1
    }, {
        name: 'Frutas',
        parent: 'Frut/Ver',
        value: 1
    }

    ],
  }]

};







}




