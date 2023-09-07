import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ProductoDto } from "src/app/models/ProductoDto";
import { ProductoService } from "src/app/services/producto/producto.service";
import { TokenService } from "src/app/services/token/token.service";
import { GenerateFilesService } from "src/app/services/utilities/generate-files.service";
import { ToastNotificationService } from "src/app/services/utilities/toast-notification.service";
import { SpinLoaderService } from "src/app/services/utilities/spin-loader.service";
import { GenerateHighchartsService } from "src/app/services/utilities/generate-highcharts.service";

@Component({
  selector: "app-lista-productos",
  templateUrl: "./lista-productos.component.html",
  styleUrls: ["./lista-productos.component.scss"],
})
export class ListaProductosComponent implements OnInit {
  //ImgPaths
  imgHelp = "assets/icons/idea.png";
  imgCsv = "assets/icons/csv.png";
  imgExcel = "assets/icons/excel.png";
  imgPdf = "assets/icons/pdf (3).png";
  imgSearch = "assets/icons/search02.png";
  imgRecycle = "assets/icons/recycle.png";
  //Table list
  imgSortUp = "assets/icons/sortUp.png";
  imgSortDown = "assets/icons/sortDown.png";
  imgEditProduct = "assets/icons/edit.png";
  imgDeleteProduct = "assets/icons/delete.png";
  //Pagination
  imgLastPagePrevious = "assets/icons/lastPagePrevious.png";
  imgPagePrevious = "assets/icons/pagePrevious.png";

  //Product
  products: ProductoDto[] = [];
  productSelected: ProductoDto[] = [];
  idProductSelected: number = 0;
  codeProductSelected: string = "";
  nameProductSelected: string = "";

  //Filters Products
  productsSearchFilter: string = "";
  productsFieldSearch: string = "";

  //Segurity
  isAdmin = false;
  isUser = false;

  //List & Paginated
  typeListTable = true;
  nroPage = 0;
  isFirstPage = false;
  isLastPage = false;
  totalPages = 0;
  nroElements = 10;
  nroCurrentElements = 0;
  nroTotalElements = 0;
  orderBy = "id";
  direction = "asc";
  //Errors
  errMsj: string;
  //Highcharts
  Highchart = this.generateHighcharts.getHeatmap();
  HighchartOptions = this.generateHighcharts.getHeatmapOptions();


  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private tokenService: TokenService,
    private generateFileService: GenerateFilesService,
    private toastService: ToastNotificationService,
    private spinLoaderService: SpinLoaderService,
    private generateHighcharts : GenerateHighchartsService
  ) {}

  ngOnInit() {
    this.listarProductos();
    this.checkEliminarProducto();
  }

  // ======================
  // ===== PRODUCT LIST ===
  // ======================
  listarProductos() {
    this.productoService
      .listado(this.nroPage, this.nroElements, this.orderBy, this.direction)
      .subscribe(
        (data: any) => {
          this.products = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (err) => {

          this.errMsj = err.error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ==================================
  // ===== PRODUCT LIST WITH FILTERS ===
  // ===================================
  listarProductosFilterAndField() {
    this.productoService
      .listadoFilterAndField(
        this.productsFieldSearch,
        this.productsSearchFilter,
        this.nroPage,
        this.nroElements,
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.products = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (err) => {
          this.errMsj = err.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ==================================
  // ===== SET FILTERS FOR PRODUCTS ===
  // ===================================
  setFilter(campo: string, filtro: string) {
    this.productsFieldSearch = '';
    this.productsSearchFilter = '';

    if (filtro === ('' || null) || campo === ('' || null)) {
      this.listarProductos();
    } else {
      this.productsFieldSearch = campo;
      this.productsSearchFilter = filtro;

      this.listarProductosFilterAndField();
    }
  }

  // =======================
  // ===== EDIT PRODUCTS ===
  // =======================
  editarProducto(producto: any): void {

    this.spinLoaderService.load(100);

    this.navigationExtras.state["value"] = producto;
    this.router.navigate(["editar-productos"], this.navigationExtras);
  }

  // =============================
  // ==== CHECK DELETE PRODUCTS ===
  // ==============================
  checkEliminarProducto() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  // =======================
  // ===== DELETE PRODUCTS ===
  // =======================
  eliminarProducto(id: number): void {

    this.spinLoaderService.load(100);


    this.productoService.delete(id).subscribe(
      (data: any) => {
        this.toastService.successfulOperation("Se ha eliminado el Producto");

        setTimeout(() => {
          this.refresh();
        }, 2100);
      },
      (err) => {
        this.errMsj = err.error.message;
        console.log(this.errMsj);
        this.toastService.error(this.errMsj);
      }
    );
  }

  // ====================================
  // ===== DELETE PRODUCT ERROR AUTH===
  // =====================================
  eliminarProductoNoAuth(id: number): void {

    this.spinLoaderService.load(100);


    this.toastService.unauthorizedOperation(
      "Servicio Habilitado para administradores!!"
    );

    setTimeout(() => {
      this.refresh();
    }, 2100);
  }

  // =========================
  // ===== RECARGAR-REFRESH===
  // =========================
  refresh() {
    window.location.reload();
  }

  // ====================
  // ===== SET PRODUCT===
  // ====================
  setProductSelected(producto: ProductoDto) {
    this.idProductSelected = producto.id;
    this.codeProductSelected = producto.codigo;
    this.nameProductSelected = producto.nombre;
  }

  // ====================
  // ===== SET TYPE LIST===
  // ====================
  setTypeListTable(set: boolean) {
    this.typeListTable = set;
  }

  // =====================
  // ===== PAGINATION ===
  // =====================

  // =====================
  // ===== ORDER BY ===
  // =====================
  orderByDirection(type: string, direct: string): void {
    try {
      this.orderBy = type;
      this.direction = direct;

      if (this.productsSearchFilter == ("" || null)) {
        this.listarProductos();
      } else {
        this.listarProductosFilterAndField();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== LAST PAGE===
  // =====================
  paginaAnterior(): void {
    try {
      if (this.productsSearchFilter == ("" || null)) {
        if (this.nroPage != 0 && this.nroPage > 0) {
          this.nroPage--;
          this.listarProductos();
        } else {
          this.toastService.error("No es posible disminuir una página!!");
        }
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
  // =====================
  // ===== NEXT PAGE===
  // =====================
  paginaSiguiente(): void {
    try {
      if (this.productsSearchFilter === ("" || null)) {
        if (!this.isLastPage && this.nroPage >= 0) {
          this.nroPage++;
          this.listarProductos();
        } else {
          this.toastService.error("No es posible aumentar una página!!");
        }
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
  // =====================
  // ===== CHANGE PAGE===
  // =====================
  cambiarPagina(pagina: number): void {
    try {
      this.nroPage = pagina;

      if (this.productsSearchFilter === "" || this.productsSearchFilter === null) {
        this.listarProductos();
      } else {
        this.listarProductosFilterAndField();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  getPaginate() {
    try {
      var paginate = {
        nroPage: this.nroPage,
        totalPages: this.totalPages,
        nroCurrentElements: this.nroCurrentElements,
        nroTotalElements: this.nroTotalElements,
      };
      return paginate;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== GENERATE EXCEL===
  // =========================

  generateExcel(): void {
    try {
      let nameExcel = "listaProductos.xlsx";

      let data = document.getElementById("table");

      let paginate = this.getPaginate();

      this.generateFileService.generateExcel(nameExcel, data, paginate);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== GENERATE CSV===
  // =====================

  generateCsv(): void {
    try {
      let nameCsv = "listaProductos.csv";

      let data = document.getElementById("table");

      this.generateFileService.generateCsv(nameCsv, data);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== GENERATE PDF===
  // =====================
  generatePdf(): void {
    try {
      let namePdf = "listaComponentes.pdf";
      let data: any = document.getElementById("table");

      this.generateFileService.generatePdf(namePdf, data);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

}
