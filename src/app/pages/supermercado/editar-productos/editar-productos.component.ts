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



//Products
  producto: ProductoDto = null
  productoEditado: ProductoDto = null
  productosForm : FormGroup;

  constructor(
    private router : Router,
    private productoService:ProductoService,
     private tokenService:TokenService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService,
    private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute,

  ) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.producto = navegacionActual?.extras?.state?.['value'];

    this.initproductosForm();

   }

  ngOnInit(): void {
    this.checkRoles();
    this.checkSecurity();
    this.checkProductos();
  }


 //=========== FORMS ==============
  private initproductosForm(): void{

    //Inicializamos el objeto con las propiedades del producto seleccionado.
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
    if(typeof this.producto == 'undefined'){
      this.router.navigate(['lista-productos']);
  }else{
    this.productosForm.patchValue(this.producto)
  }
  }




 //=========== METODOS CRUD ==============

//----------ADD PRODUCTOS ---------------

  updateProducto():void{

    //const id=this.activatedRoute.snapshot.params['id'];

    const id=this.producto.id;

    this.productoEditado = this.productosForm.parent.value;

    this.productoService.update(id,this.productoEditado).subscribe(
      data=>{

        //this.producto.codigo=data.codigo;

        console.log(this.producto);

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
