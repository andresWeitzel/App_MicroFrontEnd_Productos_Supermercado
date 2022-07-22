import { DatePipe, NgStyle } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
peso:number=undefined;
precioUnidad:number=undefined;
stock:number=undefined;


//validaciones
formGroup: FormGroup;



  constructor(

    private router : Router,
    private productoService:ProductoService,
     private tokenService:TokenService,
    private toast: NgToastService,

  ) {

   }

  ngOnInit(): void {

    this.checkRoles();
    this.checkSecurity();
    this.checkInputs();

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


//============= VALIDATORS FORM ==============

//Patrones
  /*PATTERN LETRAS MINUS/MAYUSC, NUMEROS, GUIONES MEDIO Y ESPACIOS [a-zA-Z0-9.-\s]+ */

  /* PATTERN COMPLETO URL ^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$  */

  /* PATTERN  NUMEROS ENTEROS Y DECIMALES  /^[0-9]+\.?[0-9]*$/ VALIDAMOS CIFRAS Y DECIMAL CON step="0.01" */

 /* PATTERN  NUMEROS ENTEROS  [0-9]+ */




checkInputs(){
  this.formGroup=new FormGroup({
   codigo:new FormControl(null,
       [Validators.required
      , Validators.minLength(3)
      , Validators.maxLength(10)
      , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
    ]),
    nombre:new FormControl(null,
      [Validators.required
     , Validators.minLength(3)
     , Validators.maxLength(50)
     , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
   ]),
   imagen:new FormControl(null,
    [Validators.required
   , Validators.minLength(20)
   , Validators.maxLength(500)
   , Validators.pattern(/^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
 ]),
 marca:new FormControl(null,
  [Validators.required
 , Validators.minLength(3)
 , Validators.maxLength(30)
 , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
]),
tipo:new FormControl(null,
  [Validators.required
 , Validators.minLength(3)
 , Validators.maxLength(30)
 , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
]),
grupo:new FormControl(null,
  [Validators.required
 , Validators.minLength(3)
 , Validators.maxLength(30)
 , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
]),
peso:new FormControl(null,
  [Validators.required
 , Validators.minLength(1)
 , Validators.maxLength(4)
 , Validators.min(0.100)
 , Validators.max(100)
 , Validators.pattern(/^[0-9]+\.?[0-9]*$/)
]),
precioUnidad:new FormControl(null,
  [Validators.required
 , Validators.minLength(1)
 , Validators.maxLength(5)
 , Validators.min(1)
 , Validators.max(10000)
 , Validators.pattern(/^[0-9]+\.?[0-9]*$/)
]),
stock:new FormControl(null,
  [Validators.required
 , Validators.minLength(1)
 , Validators.maxLength(4)
 , Validators.min(10)
 , Validators.max(3000)
 , Validators.pattern(/[0-9]+/)
])
}
//,{updateOn:'submit'});
 );
}



get codigoForm(){
  return this.formGroup.get('codigo');
}
get nombreForm(){
  return this.formGroup.get('nombre');
}
get imagenForm(){
  return this.formGroup.get('imagen');
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
      this.errMsj = err.error;

      console.log(this.errMsj);

      this.toast.error({detail:"Error",summary:this.errMsj, duration:2000});
    }
  );
}






}
