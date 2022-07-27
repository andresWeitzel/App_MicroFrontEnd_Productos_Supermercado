# App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL

* Micro Front End Acerca de Productos de Supermercado aplicando Angular, Bootstrap, Highchart, Spring-Boot, Spring Security, Spring MVC, Microservicios, Open-Api, Git, DBeaver, PgAdmin, PostgreSQL y Otras Tecnologías.
* La aplicación esta basada para la gestión de productos, si bien se ha desarrollado también el back para la gestión de usuarios, este recurso aplica solo desde la Api, se implementa el Modelo de Negocios para un MicroFrontEnd, por ende se deberá desarrollar otra app para la gestión de dichos usuarios. 
* Como sistema de seguridad para manejo de recursos de la app se aplica Spring Security y JWT. Las Operaciones Transaccionales fueron modificadas para que solamente los administradores del sistema tengan acceso, los usuarios convencionales solamente podrán visualizar los productos y filtrar búsquedas acerca de los productos requeridos.
* Todos los formularios aplican validaciones de carácteres, longitudes, tamaños, valores numéricos, valores mal formados, email, contraseña, url de imágenes, etc.
* Se implementa Paginación Completa.
* Se aplica un filtro para la búsqueda de productos menos estricto, permitiendo las mismas según coincidencias de carácteres y palabras para todos los campos.
* Para la experiencia de usuario se utiliza Popupts, Loaders, Angular Material, Etc.
* Es posible descargar el Listado de Productos Paginado en formato xlsx(excel).
* Todas las Páginas de la Aplicación poseen modals de Ayuda.
* Entre Otros Recursos Disponibles.

* Aclaración : ESTE MICROFRONTEND NO COMPLETAMENTE RESPONSIVE. El enfoque es la funcionalidad de la aplicación, la maquetación es totalmente aplicable en relación al tiempo de disponibilidad empleado.  

</br>

* Repositorio ApiRest_MicroFrontEnd_ProductosSupermercado : https://github.com/andresWeitzel/ApiRest_MicroFrontEnd_ProductosSupermercado
* Repositorio Microdb_productos_supermercado_PostgreSQL : https://github.com/andresWeitzel/Microdb_productos_supermercado_PostgreSQL


</br>

### Seguidamente se Representa Gráficamente de Forma Sucinta algunos Servicios y Recursos de la Aplicación.

</br>

#### Login 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/login-logout/login-view.png)

#### Signin

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/signin/signinUsers.png)


#### Inicio Post Login 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/inicio/postLogin.png)

</br>


#### Servicios Deshabilitados para Usuarios 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/users/usersService.png)


</br>


#### Listado de Productos Filtrado según Frutas 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/list-products/filterByFrutas.png)


#### Listado de Productos Formato xlsx 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/list-products/listProductsExcel.png)


#### Listado de Productos sección Paginado 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/list-products/paginado.png)


</br>

#### Checks Form Editar Producto 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/edit-products/editSelectCheckDisabled.png)


</br>

#### Checks Form Agregar Producto Insertado

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/add-products/addFormCheckValidated.png)

#### Producto Insertado Filtrado en Lista

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/add-products/viewProductAdd.png)


</br>


#### Check Eliminar Producto

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/delete-product/deleteProductCheck.png)


#### Check Lista Producto Eliminado

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/delete-product/deleteProductCheckList.png)













# -----------------------------------------------
### Angular Popup

* Doc e instalación : https://www.npmjs.com/package/ng-angular-popup



# -----------------------------------------------
### Angular Material

* Doc e instalación : https://material.angular.io/guide/getting-started

#### ngx ui loader

* Instalacion: https://www.npmjs.com/package/ngx-ui-loader
* Implements loader: https://tdev.app/ngx-ui-loader

# ------------------------------------------------


# Angular Bootstrap Validation

* Instalación : https://mdbootstrap.com/docs/b5/angular/getting-started/installation/
* Implementación/ejemplos: https://mdbootstrap.com/docs/b5/angular/forms/validation/
* Validation Forms(tanto bootstrap 4 como 5) : https://mdbootstrap.com/docs/angular/forms/validation/

# --------------------------------------------------

# Excel Sheets

* Ejemplo base : https://www.delftstack.com/howto/angular/angular-export-to-excel/



# -----------------------------------------------


### Documentación Creación de Gráficos con Highchart en Angular 12
* Npm, config, detalles,  etc (RECOMIENDO) : https://hackthestuff.com/article/how-to-use-highcharts-in-angular-12
* Doc Oficial : https://api.highcharts.com/highcharts/
* Doc Oficial Instalación : https://www.highcharts.com/docs/getting-started/install-from-npm

### Doc Tipos de Graficos
* Nuevo sitio Tipos de Graf : https://www.highcharts.com/blog/chartchooser/
* Ejemplo Base 2d : https://stackblitz.com/edit/highcharts-angular-basic-line-ucnkbj?file=src%2Fapp%2Fapp.component.ts
* Modificación Gráfico 2d a 3d : https://www.eduforbetterment.com/3d-pie-and-donut-chart-in-angular-using-highchart/

### Treemap Graphic
* Ej. Base : https://stackblitz.com/edit/highcharts-angular-treemap?file=app%2Fapp.component.ts
* Ej. Base algunas configs : https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/treemap-with-levels

