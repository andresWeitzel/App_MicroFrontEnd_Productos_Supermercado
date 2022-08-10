# App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL

* Micro Front End Acerca de Productos de Supermercado aplicando Angular, Bootstrap, SCSS, HTML5, Highchart, Spring-Boot, Spring Security, Spring MVC, Microservicios, SpringFox, Swagger UI, Git, DBeaver, PgAdmin, PostgreSQL y Otras Tecnologías.
* La aplicación esta basada para la gestión de productos, si bien se ha desarrollado también el back para la gestión de usuarios, este recurso aplica solo desde la Api, con postman o desde swagger ui, se implementa el Modelo de Negocios para un MicroFrontEnd, por ende se deberá desarrollar otra app para la gestión de dichos usuarios. 
* Como sistema de seguridad para manejo de recursos de la app se usa Spring Security y JWT. Las Operaciones Transaccionales fueron modificadas para que solamente los administradores del sistema tengan acceso, los usuarios convencionales solamente podrán visualizar los productos y filtrar búsquedas acerca de estos según el requerimiento deseado.
* Todos los formularios aplican validaciones de carácteres, longitudes, tamaños, valores numéricos, valores mal formados, email, contraseña, url de imágenes, etc.
* Se implementa Paginación Completa.
* Se aplican dos filtros de búsqueda, uno para productos de forma genérica y otro según el campo deseado, permitiendo coincidencias de carácteres y palabras.
* Para la experiencia de usuario se utiliza Popupts, Loaders, Angular Material, Etc.
* Es posible descargar el Listado de Productos Paginado en formato xlsx(excel), csv y pdf.
* Todas las Páginas de la Aplicación poseen modals de Ayuda.
* Entre Otros Recursos Disponibles.
* Aclaración : ESTE MICROFRONTEND NO ES COMPLETAMENTE RESPONSIVE. El enfoque es la funcionalidad de la aplicación, la maquetación es totalmente aplicable en relación al tiempo de disponibilidad que se emplee.  

</br>

* Repositorio ApiRest_MicroFrontEnd_ProductosSupermercado(último release) : https://github.com/andresWeitzel/ApiRest_MicroFrontEnd_ProductosSupermercado
* Repositorio Microdb_productos_supermercado_PostgreSQL(último release) : https://github.com/andresWeitzel/Microdb_productos_supermercado_PostgreSQL
* PlayList pruebas de funcionalidad de la aplicación : https://www.youtube.com/playlist?list=PLCl11UFjHurBcKBhduZ4suiDSMbyyBqCO


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


#### Listado de Productos 

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/list-products/listProducts.png)


#### Listado de Productos Formato csv

![Index app](https://github.com/andresWeitzel/App_MicroFrontEnd_Productos_SpringBoot_SpringSecurity_PostgreSQL/blob/master/doc/list-products/listProductsCsv.png)


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

</br>

#### Documentación Gráfica Acotada por razones de simplificación de documentación. Visualizar los videos anexados acerca de las Pruebas de Funcionalidad de la aplicación.

</br>

</br>

| Área | Stack |
| ------------- | ------------- |
| Front End | HTML5, CSS3, SCSS, Bootstrap5, Angular13, Angular Material, Highchart y Otros | 
| Back End | Spring Boot, Spring Security, JWT, Lombok, Maven, Swagger UI, Open-API y Otros | 
| Database | pgAdmin, PostgreSQL, DBeaver , CMD y Otros | 

<hr>

</br>

| Tecnologías FRONTEND | Versión | Finalidad
| ------------- | ------------- | ------------- |
| Angular |   13.3.0 | FrameWork Web Desarrollo de Apps con TypeScript | 
| Angular CLI | 13.3.0 | Herramienta de Angular para depurar, crear, publicar, etc Apps |
| Angular Material | 13.3.9 | UI librería de componentes | 
| ng-angular-popup | 0.1.2 |  Mensajes emergentes personalizados |
| ngx-ui-loader | 13.0.0 | Animaciones de carga | 
| jspdf/html2canvas | - | Pdf Export| 
| xlsx | - | Excell/Csv Export| 
| Highcharts | - | Excell/Csv Export| 
| Bootstrap | 5.1  | FrameWork Web Diseño y Desarrollo de Apps |
| Visual Studio Code | 1.51.1  | Entorno de Desarrollo |
| Otros | - | - |



</br>



| Tecnologías BACKEND | Versión | Finalidad
| ------------- | ------------- | ------------- |
| Java |   12.0.2 | JDK |
| Spring Tool Suite 4 | 4.9.0  | IDE |
| Spring Boot |   2.6.4  | Framework |
| Spring Boot Data JPA  | 2.6.3 | Mapeo de objetos y persistencia en la db |
| Spring Security | 2.6.7 | Servicios de Seguridad |
| JSON Web Token | 0.9.1 | Creación de tokens de acceso | 
| Maven |  4.0.0 | Gestor de Proyectos |
| PostMan | 9.4.1 | Test de Apis |
| Lombok | 1.18.22 | Automatización de Código | 
| Open-Api | 1.6.4 | Documentación de la Api | 
| UI Swagger | 1.6.4 | Visualización y Gestión de la Api | 
| Maven |  4.0.0 | Gestor de Proyectos |
| GNU bash / Terminal | 4.4.23  | Bash / Terminal para el manejo e implementación de Git integrado al Spring Tool Suite |
| Git | 2.29.1  | Control de Versiones |
| Otros | - | - |



</br>


</br>

| Tecnologías DATABASE | Versión | Finalidad
| ------------- | ------------- | ------------- |
| PostgreSQL | 14 | SGDB |
| pgAdmin	| 4.0 |	Gestor SGDB |
| CMD | 10 | Símbolo del Sistema para linea de comandos | 
| Otros | - | - |



</br>

### Documentación Oficial Tecnologías

* Java-JDK 12 :       https://www.oracle.com/java/technologies/javase/jdk12-archive-downloads.html
* Spring Security:  https://spring.io/projects/spring-security  
* JSON Web Security:  https://jwt.io/introduction/ 
* Boostrap:         https://getbootstrap.com/
* Angular CLI:      https://github.com/angular/angular-cli
* XAMPP :       https://www.apachefriends.org/download.html 
* Maven Repository: https://mvnrepository.com/ 
* PostMan:        https://www.postman.com/downloads/ 
* Bootstrap:   https://getbootstrap.com/
* Angular:     https://angular.io/tutorial/toh-pt0
* Visual Studio Code:         https://code.visualstudio.com/download
* Spring Tool Suite 4 : https://spring.io/tools 
* Git:         https://git-scm.com/docs
* Otros

</br>

### Documentación Oficial/No Oficial Librerías Frontend

* Angular Popup : https://www.npmjs.com/package/ng-angular-popup

* Angular Material : https://material.angular.io/guide/getting-started

* Angular Bootstrap Validation 
    * Instalación : https://mdbootstrap.com/docs/b5/angular/getting-started/installation/
    * Implementación/ejemplos : https://mdbootstrap.com/docs/b5/angular/getting-started/installation/
    * Validation Forms(tanto bootstrap 4 como 5) : https://mdbootstrap.com/docs/angular/forms/validation/

* ngx ui loader 
    * Instalación :  https://www.npmjs.com/package/ngx-ui-loader
    * Implementación : https://tdev.app/ngx-ui-loader

* Excel Sheets
    * Instalación y Doc : https://www.npmjs.com/package/xlsx
    * Ejemplo Base : https://www.delftstack.com/howto/angular/angular-export-to-excel/
    
* JSPDF
    * Ejemplo Base : https://www.positronx.io/angular-pdf-tutorial-export-pdf-in-angular-with-jspdf/
    * Otro ej. : https://howtojs.io/how-to-generate-pdf-file-in-angular-13-application-in-multiple-ways/

* Gráficos con Highchart
    * Npm, config, detalles, etc : https://hackthestuff.com/article/how-to-use-highcharts-in-angular-12
    * Doc Oficial : https://api.highcharts.com/highcharts/
    * Doc Oficial Instalación : https://www.highcharts.com/docs/getting-started/install-from-npm
    
* Tipos de Gráficos Highchart
    * Nuevo sitio Tipos de Graf : https://www.highcharts.com/blog/chartchooser/
    * Ejemplo Base 2d : https://stackblitz.com/edit/highcharts-angular-basic-line-ucnkbj?file=src%2Fapp%2Fapp.component.ts
    * Modificación Gráfico 2d a 3d : https://www.eduforbetterment.com/3d-pie-and-donut-chart-in-angular-using-highchart/

* Treemap Graphic
    * Ej. Base : https://stackblitz.com/edit/highcharts-angular-treemap?file=app%2Fapp.component.ts
    * Ej. Base algunas configs : https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/treemap-with-levels

* Cifrado Token JWT
    * Instalación y uso : https://www.npmjs.com/package/@auth0/angular-jwt


<hr>

### Documentación en Proceso de Desarrollo
