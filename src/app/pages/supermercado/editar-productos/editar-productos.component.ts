import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoDto } from 'src/app/models/ProductoDto';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.scss']
})
export class EditarProductosComponent implements OnInit {

  productos: ProductoDto = null

  productosFormulario : FormGroup;

  constructor(
    private router : Router,
     private formBuilder:FormBuilder
  ) {

    const navegacionActual = this.router.getCurrentNavigation();

    this.productos = navegacionActual?.extras?.state?.['value'];

    this.initproductosFormulario();

   }

  ngOnInit(): void { //Colocamos los valores en el form
    //Si la data no esta definida redireccionamos, sino
    //cargamos el form
    if(typeof this.productos == 'undefined'){
        this.router.navigate(['lista-productos']);
    }else{
      this.productosFormulario.patchValue(this.productos)
    }
  }


  //Agregar Producto
  addProducto():void{
    console.log("PRODUCTO AGREGADO CORRECTAMENTE");
  }

  //Inicializar Formulario con los datos del registro seleccionado
  private initproductosFormulario(): void{

    //Inicializamos el objeto con las propiedades de nuestro producto.Aca podemos usar patrones regex, pero ya lo aplicamos en la Vista
    this.productosFormulario = this.formBuilder.group({
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
