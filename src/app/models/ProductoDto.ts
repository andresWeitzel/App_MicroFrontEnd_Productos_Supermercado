export class ProductoDto {

  id?:number;
  codigo:string;
  imagen:string;
  nombre:string;
  marca:string;
  tipo:string;
  grupo:string;
  peso:number;
  precioUnidad:number;
  stock:number;

  constructor(codigo:string,imagen:string,nombre:string,marca:string,tipo:string,grupo:string,peso:number,precioUnidad:number,stock:number){

      this.codigo=codigo;
      this.imagen=imagen;
      this.nombre=nombre;
      this.marca=marca;
      this.tipo=tipo;
      this.grupo=grupo;
      this.peso=peso;
      this.precioUnidad=precioUnidad;
      this.stock=stock;

  }

}
