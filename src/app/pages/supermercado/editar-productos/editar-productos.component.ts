import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


//Products
  productos: ProductoDto = null
  productosForm : FormGroup;

  constructor(
    private router : Router,
    private productoService:ProductoService,
     private tokenService:TokenService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService,
    private formBuilder:FormBuilder,

  ) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.productos = navegacionActual?.extras?.state?.['value'];

    this.initproductosForm();

   }

  ngOnInit(): void {
    this.checkRoles();
    this.checkSecurity();
    this.checkProductos();
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

  checkProductos(){
    //Si la data no esta definida redireccionamos, sino
    //cargamos el form
    if(typeof this.productos == 'undefined'){
      this.router.navigate(['lista-productos']);
  }else{
    this.productosForm.patchValue(this.productos)
  }
  }




 //=========== METODOS CRUD ==============

//----------ADD PRODUCTOS ---------------
  addProducto():void{
    console.log("PRODUCTO AGREGADO CORRECTAMENTE");
  }

  //Inicializar Formulario con los datos del registro seleccionado
  private initproductosForm(): void{

    //Inicializamos el objeto con las propiedades de nuestro producto.Aca podemos usar patrones regex, pero ya lo aplicamos en la Vista
    this.productosForm = this.formBuilder.group({
        codigo : ['' , [Validators.required]],
        imagen : ['' , [Validators.required]],
        nombre : ['' , [Validators.required]],
        marca : ['' , [Validators.required]],
        tipo : ['' , [Validators.required]],
        grupo : ['' , [Validators.required]],
        peso : ['' , [Validators.required]],
        precioUnidad : ['' , [Validators.required]],
        stock : ['' , [Validators.required]],

    });
  }

}
