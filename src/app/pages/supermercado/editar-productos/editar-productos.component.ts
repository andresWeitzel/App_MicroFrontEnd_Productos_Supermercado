import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductoDto } from 'src/app/models/ProductoDto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.scss']
})
export class EditarProductosComponent implements OnInit {



//Security
  roles: string[]=[];
  isAdmin = false;
  isUser = false;
  errMsj: string;

//Campos Producto
//id:number=null;
codigo:string='';
imagen:string='';
nombre:string='';
marca:string='';
tipo:string='';
grupo:string='';
peso:number=null;
precioUnidad:number=null;
stock:number=null;


//Products
  producto: ProductoDto = null
  formGroup : FormGroup;

  constructor(
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private productoService:ProductoService,
     private tokenService:TokenService,
    private toast: NgToastService,
    private formBuilder:FormBuilder,


  ) {

    this.checkNavigation();
    this.initProductosForm();

   }

  ngOnInit(): void {
    this.checkRoles();
    this.checkSecurity();
    this.checkProducto();
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

  }else if(!(this.isAdmin)){

    this.toast.error({detail:"Operación No Autorizada",summary:'Servicio Habilitado para administradores!!', duration:2000});

      setTimeout(() => {
        this.router.navigate(['lista-productos']);
       }, 3000);


  }

}


 //=========== PRODUCTO ==============
  checkNavigation(){

    const navegacionActual = this.router.getCurrentNavigation();

    this.producto = navegacionActual?.extras?.state?.['value'];

  }



  checkProducto(){
    //Si la data no esta definida redireccionamos, sino
    //cargamos el form
    if(typeof this.producto == 'undefined'){
      this.router.navigate(['lista-productos']);
  }else{
    this.codigo=this.producto.codigo;
    this.imagen=this.producto.imagen;
    this.nombre=this.producto.nombre;
    this.marca=this.producto.marca;
    this.tipo=this.producto.tipo;
    this.grupo=this.producto.grupo;//Deshabilitado
    this.peso=this.producto.peso;
    this.precioUnidad=this.producto.precioUnidad;
    this.stock=this.producto.stock;


  }
  }



 //=========== FORMS ==============
  initProductosForm(): void{

    //Inicializamos el objeto con las propiedades del producto seleccionado.

    this.formGroup=this.formBuilder.group({
      codigo:['',
          [Validators.required
         , Validators.minLength(3)
         , Validators.maxLength(10)
         , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
       ]],
     imagen:['',
     [Validators.required
      , Validators.minLength(20)
      , Validators.maxLength(500)
      , Validators.pattern(/^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
    ]],
       nombre:['',
        [Validators.required
       , Validators.minLength(3)
       , Validators.maxLength(70)
       , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
     ]],
    marca:['',
    [Validators.required
      , Validators.minLength(3)
      , Validators.maxLength(40)
      , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
   ]],
   tipo:['',
   [Validators.required
    , Validators.minLength(3)
    , Validators.maxLength(40)
    , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
  ]],
  grupo:['',
   [Validators.required
    , Validators.minLength(3)
    , Validators.maxLength(40)
    , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
  ]],
  peso:['',
   [Validators.required
    , Validators.minLength(1)
    , Validators.maxLength(4)
    , Validators.min(0.100)
    , Validators.max(100)
    , Validators.pattern(/^[0-9]+\.?[0-9]*$/)
  ]],
  precioUnidad:['',
   [Validators.required
    , Validators.minLength(1)
    , Validators.maxLength(5)
    , Validators.min(1)
    , Validators.max(10000)
    , Validators.pattern(/^[0-9]+\.?[0-9]*$/)
  ]],
  stock:['',
  [Validators.required
      , Validators.minLength(1)
      , Validators.maxLength(4)
      , Validators.min(10)
      , Validators.max(3000)
      , Validators.pattern(/[0-9]+/)
 ]],

    });
  }

get codigoForm(){
  return this.formGroup.get('codigo');
}

get imagenForm(){
  return this.formGroup.get('imagen');
}
get nombreForm(){
  return this.formGroup.get('nombre');
}
get marcaForm(){
  return this.formGroup.get('marca');
}
get tipoForm(){
  return this.formGroup.get('tipo');
}
get grupoForm(){
  return this.formGroup.get('grupo');
}
get pesoForm(){
  return this.formGroup.get('peso');
}
get precioUnidadForm(){
  return this.formGroup.get('precioUnidad');
}
get stockForm(){
  return this.formGroup.get('stock');
}



//=============== UTILS ===============

refresh(){
  window.location.reload();
}


 //=========== METODOS CRUD ==============

//----------ADD PRODUCTOS ---------------

  updateProducto():void{

    //const navegacionActual = this.router.getCurrentNavigation();

    //this.producto = navegacionActual?.extras?.state?.['value'];

    //const id=this.activatedRoute.snapshot.params['id'];
    const id=this.producto.id;

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

    //const id=this.producto.id;


    this.productoService.update(id, nuevoProducto).subscribe(
      data=>{
/*
        this.producto.codigo=data.codigo;
        this.producto.imagen=data.imagen;
        this.producto.nombre=data.nombre;
        this.producto.marca=data.marca;
        this.producto.tipo=data.tipo;
        this.producto.grupo=data.grupo;
        this.producto.peso=data.peso;
        this.producto.precioUnidad=data.precioUnidad;
        this.producto.stock=data.stock;
*/
        console.log(nuevoProducto);

        this.toast.success({detail:"Operación Exitosa",summary:'Se ha Actualizado el Producto!!', duration:2000});

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





}
